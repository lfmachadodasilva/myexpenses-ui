import { Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import React, { useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { FaPlus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';
import queryString from 'query-string';

import { globalContext } from '../../contexts/global-context';
import { LocalStorageHelper } from '../../helpers/localStorage-helper';
import { LabelService } from '../../services/label/label-service';
import { userContext } from '../../contexts/user-context';
import { FetchStatus } from '../../services/fetch-status';
import { MyRoute } from '../../route';
import { hasValue } from '../../helpers/util-helper';

import SearchComponent from '../../components/search/search';
import ListComponent from '../../components/list/list';
import RadioButtonComponent from '../../components/radio-button/radio-button';

enum LabelValueType {
    CURRENT_VALUE = 0,
    LAST_VALUE,
    AVERAGE_VALUE,
}

const LabelAllPage: React.FC = () => {
    const global = useContext(globalContext);
    const { user } = useContext(userContext);
    const { t } = useTranslation();
    const history = useHistory();

    const {
        labelReducer: { state: labelState, getLabelsWithDetails, resetLabelsWithDetails },
        groupReducer: {
            state: { groups },
        },
        expenseReducer: {
            state: { years },
        },
        loadingBase,
    } = global;

    const [group, setGroup] = useState(global.group);
    const [month, setMonth] = useState(global.month);
    const [year, setYear] = useState(global.year);

    const [labelValueType, setLabelValueType] = useState(LabelValueType.CURRENT_VALUE);

    useEffect(() => {
        setGroup(global.group);
        setMonth(global.month);
        setYear(global.year);
    }, [global.group, global.month, global.year]);

    const { labelsWithDetails: labels } = labelState;
    useEffect(() => {
        if (loadingBase || labels.status !== FetchStatus.Ready || !hasValue(group) || !hasValue(month)) {
            return;
        }

        getLabelsWithDetails(group, month, year);
    }, [labels, getLabelsWithDetails, loadingBase, group, month, year]);

    const handleDelete = useCallback(
        (id: string) => {
            let doIt = false;
            return new LabelService(user)
                .delete(id)
                .then(() => {
                    doIt = true;
                })
                .catch(() => {})
                .finally(() => {
                    if (doIt) {
                        getLabelsWithDetails(group, month, year);
                    }
                });
        },
        [user, getLabelsWithDetails, group, month, year]
    );

    const handleOnSearch = (group: string, month: number, year: number) => {
        LocalStorageHelper.setGroup(group);

        setGroup(group);
        setMonth(month);
        setYear(year);

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify({
                group: group,
                month: month,
                year: year,
            }),
        });

        resetLabelsWithDetails();
    };

    const data = useMemo(() => {
        if (labels.status === FetchStatus.Loaded && labels.data && labels.data.length > 0) {
            const labelsData = labels.data.filter(x =>
                labelValueType === LabelValueType.CURRENT_VALUE
                    ? x.currentValue > 0
                    : labelValueType === LabelValueType.LAST_VALUE
                    ? x.lastMonthValue > 0
                    : x.averageValue > 0
            );
            return {
                datasets: [
                    {
                        data: labelsData.map(x =>
                            labelValueType === LabelValueType.CURRENT_VALUE
                                ? x.currentValue
                                : labelValueType === LabelValueType.LAST_VALUE
                                ? x.lastMonthValue
                                : x.averageValue
                        ),
                    },
                ],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: labelsData.map(x => ' ' + x.name),
            };
        }

        return {
            datasets: [],
            labels: [],
        };
    }, [labels.status, labels.data, labelValueType]);

    const options = {
        plugins: {
            colorschemes: {
                scheme: 'tableau.Tableau20',
            },
        },
    };

    // console.log(history);
    return (
        <div key='label-all'>
            <SearchComponent
                group={group}
                groups={groups}
                month={month}
                year={year}
                years={years}
                onSearch={handleOnSearch}
            />

            <hr></hr>

            <Button
                variant='primary'
                size='sm'
                disabled={labels.status !== FetchStatus.Loaded}
                onClick={() => {
                    history.push(MyRoute.LABEL_ADD + history.location.search);
                }}
            >
                <FaPlus size={16} />
                &nbsp;
                {t('ADD')}
            </Button>

            {labels.status === FetchStatus.Ready && (
                <Alert key='NotLoaded' variant='info' className='mt-4'>
                    {t('NOT_LOADED')}
                </Alert>
            )}
            {labels.status === FetchStatus.Loading && (
                <Row className='m-4'>
                    <Col style={{ textAlign: 'center' }}>
                        <Spinner animation='border' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            )}
            {labels.status === FetchStatus.Loaded && labels.data.length === 0 && (
                <Alert key='EmptyLabel' variant='warning' className='mt-4'>
                    {t('NO_DATA')}
                </Alert>
            )}
            {labels.status === FetchStatus.Loaded && labels.data && labels.data.length > 0 && (
                <div className='mt-3'>
                    <ListComponent
                        items={labels.data.map(label => {
                            return {
                                id: label.id,
                                title: label.name,
                                onEdit: (id: string) =>
                                    Promise.resolve(
                                        history.push({
                                            pathname: MyRoute.LABEL + `/${id}`,
                                            search: history.location.search,
                                        })
                                    ),
                                onDelete: handleDelete,
                                badges: [
                                    {
                                        title: t('LABEL.CURRENT_VALUE'),
                                        value: t('CURRENCY') + ' ' + label.currentValue.toFixed(2),
                                    },
                                    {
                                        title: t('LABEL.LAST_VALUE'),
                                        variant: label.currentValue > label.lastMonthValue ? 'danger' : 'success',
                                        value: t('CURRENCY') + ' ' + label.lastMonthValue.toFixed(2),
                                    },
                                    {
                                        title: t('LABEL.AVERAGE_VALUE'),
                                        variant: label.currentValue > label.averageValue ? 'danger' : 'success',
                                        value: t('CURRENCY') + ' ' + label.averageValue.toFixed(2),
                                    },
                                ],
                            };
                        })}
                    />

                    <hr></hr>

                    <div className='mb-4'>
                        <div className='d-flex justify-content-around'>
                            <RadioButtonComponent
                                value={labelValueType}
                                onChange={(value: any) => setLabelValueType(value as LabelValueType)}
                                buttons={[
                                    {
                                        id: LabelValueType.CURRENT_VALUE,
                                        label: t('LABEL.CURRENT_VALUE'),
                                    },
                                    {
                                        id: LabelValueType.LAST_VALUE,
                                        label: t('LABEL.LAST_VALUE'),
                                    },
                                    {
                                        id: LabelValueType.AVERAGE_VALUE,
                                        label: t('LABEL.AVERAGE_VALUE'),
                                    },
                                ]}
                            />
                        </div>
                        {data.datasets[0].data.length > 0 && <Pie data={data} options={options} />}
                        {data.datasets[0].data.length === 0 && (
                            <div className='d-flex justify-content-center'>
                                <Alert key='NotLoaded' variant='info' className='mt-4 col-4 justify-content-center'>
                                    {t('NO_DATA')}
                                </Alert>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LabelAllPage;
