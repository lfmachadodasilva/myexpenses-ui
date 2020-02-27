import {
    ListGroup,
    Button,
    Row,
    Col,
    Spinner,
    Badge,
    Alert,
    Modal,
    ToggleButtonGroup,
    ToggleButton
} from 'react-bootstrap';
import React, { useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { FaPlus, FaEdit, FaRegWindowClose, FaRegSquare, FaCheckSquare } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';

import { globalContext } from '../../contexts/global-context';
import SearchComponent from '../../components/search/search';
import { LocalStorageHelper } from '../../helpers/localStorage-helper';
import { LabelService } from '../../services/label/label-service';
import { userContext } from '../../contexts/user-context';
import { FetchStatus } from '../../services/fetch-status';
import { MyRoute } from '../../route';
import { hasValue } from '../../helpers/util-helper';

enum LabelValueType {
    CURRENT_VALUE = 0,
    LAST_VALUE,
    AVERAGE_VALUE
}

const LabelAllPage: React.FC = () => {
    const global = useContext(globalContext);
    const { user } = useContext(userContext);
    const { t } = useTranslation();
    const history = useHistory();

    const { labelReducer, groupReducer, expenseReducer, loadingBase } = global;

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState('');
    const [labelValueType, setLabelValueType] = useState(LabelValueType.CURRENT_VALUE);

    const { state: labelState, getLabelsWithDetails } = labelReducer;
    const { labelsWithDetails: labels } = labelState;
    useEffect(() => {
        if (
            loadingBase ||
            (labels && labels.status !== FetchStatus.Ready) ||
            !hasValue(global.group) ||
            !hasValue(global.month)
        ) {
            return;
        }

        getLabelsWithDetails(global.group, global.month, global.year);
    }, [labels, getLabelsWithDetails, loadingBase, global.group, global.month, global.year]);

    const handleDelete = useCallback(
        (id: string) => {
            let doIt = false;
            setLoadingDelete(id);
            setShowDeleteModal(false);
            new LabelService(user)
                .delete(id)
                .then(() => {
                    doIt = true;
                })
                .catch(() => {})
                .finally(() => {
                    setLoadingDelete('');
                    if (doIt) {
                        getLabelsWithDetails(global.group, global.month, global.year);
                    }
                });
        },
        [user, getLabelsWithDetails, global.group, global.month, global.year]
    );

    const handleOnCloseDeleteModel = useCallback(() => {
        setShowDeleteModal(false);
        setLoadingDelete('');
    }, []);

    const handleOnSearch = (group: string, month: number, year: number) => {
        LocalStorageHelper.setGroup(group);

        // update global context
        global.group = group;
        global.month = month;
        global.year = year;

        getLabelsWithDetails(group, month, year);
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
                        )
                    }
                ],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: labelsData.map(x => ' ' + x.name)
            };
        }

        return {
            datasets: [],
            labels: []
        };
    }, [labels.status, labels.data, labelValueType]);

    const options = {
        plugins: {
            colorschemes: {
                scheme: 'tableau.Tableau20'
            }
        }
    };

    return (
        <div key='LabelAllPage'>
            <SearchComponent
                group={global.group}
                groups={groupReducer.state.groups}
                month={global.month}
                year={global.year}
                years={expenseReducer.state.years}
                onSearch={handleOnSearch}
            />

            <hr></hr>

            <Button
                variant='primary'
                size='sm'
                disabled={labels.status !== FetchStatus.Loaded}
                onClick={() => {
                    history.push(MyRoute.LABEL_ADD);
                }}
            >
                <FaPlus size={16} />
                &nbsp;
                {t('LABEL.ADD')}
            </Button>

            {labels.status === FetchStatus.Ready && (
                <Alert key='NotLoaded' variant='info' className='mt-4'>
                    {t('LABEL.NOT_LOADED')}
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
                    {t('LABEL.EMPTY')}
                </Alert>
            )}
            {labels.status === FetchStatus.Loaded && labels.data && labels.data.length > 0 && (
                <>
                    <ListGroup className='mt-3 mb-3'>
                        {labels.data.map(label => (
                            <ListGroup.Item key={JSON.stringify(label)} className='p-2'>
                                <div className='d-flex justify-content-between'>
                                    <h6 className='m-0'>{label.name}</h6>
                                    <div className='d-flex justify-content-end'>
                                        <FaEdit
                                            className='mr-3'
                                            size={16}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => history.push(MyRoute.LABEL + `/${label.id}`)}
                                        />
                                        {loadingDelete === label.id && (
                                            <>
                                                <Spinner
                                                    as='span'
                                                    animation='border'
                                                    size='sm'
                                                    role='status'
                                                    aria-hidden='true'
                                                />
                                            </>
                                        )}
                                        {loadingDelete !== label.id && (
                                            <FaRegWindowClose
                                                size={16}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    setLoadingDelete(label.id);
                                                    setShowDeleteModal(true);
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>

                                <hr className='m-1'></hr>

                                <div className='d-flex justify-content-around'>
                                    <p className='d-flex flex-column justify-content-center text-wrap mb-0'>
                                        <small className='text-center'>{t('LABEL.CURRENT_VALUE')}</small>
                                        <Badge variant='info'>
                                            {t('CURRENCY') + ' ' + label.currentValue.toFixed(2)}
                                        </Badge>
                                    </p>
                                    <p className='d-flex flex-column justify-content-center text-wrap mb-0'>
                                        <small className='text-center'>{t('LABEL.LAST_VALUE')}</small>
                                        <Badge
                                            variant={label.currentValue > label.lastMonthValue ? 'danger' : 'success'}
                                        >
                                            {t('CURRENCY') + ' ' + label.lastMonthValue.toFixed(2)}
                                        </Badge>
                                    </p>
                                    <p className='d-flex flex-column justify-content-center text-wrap mb-0'>
                                        <small className='text-center'>{t('LABEL.AVERAGE_VALUE')}</small>
                                        <Badge variant={label.currentValue > label.averageValue ? 'danger' : 'success'}>
                                            {t('CURRENCY') + ' ' + label.averageValue.toFixed(2)}
                                        </Badge>
                                    </p>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <hr></hr>

                    <div className='mb-4'>
                        <div className='d-flex justify-content-around'>
                            <ToggleButtonGroup
                                size='sm'
                                onChange={(value: any) => setLabelValueType(value)}
                                type='radio'
                                name='radio'
                            >
                                <ToggleButton
                                    type='radio'
                                    name='radio'
                                    value={LabelValueType.CURRENT_VALUE}
                                    variant='light'
                                    defaultChecked
                                >
                                    {labelValueType === LabelValueType.CURRENT_VALUE ? (
                                        <FaCheckSquare className='mr-1' size={16} />
                                    ) : (
                                        <FaRegSquare className='mr-1' size={16} />
                                    )}
                                    {t('LABEL.LAST_VALUE')}
                                </ToggleButton>
                                <ToggleButton
                                    type='radio'
                                    name='radio'
                                    value={LabelValueType.LAST_VALUE}
                                    variant='light'
                                >
                                    {labelValueType === LabelValueType.LAST_VALUE ? (
                                        <FaCheckSquare className='mr-1' size={16} />
                                    ) : (
                                        <FaRegSquare className='mr-1' size={16} />
                                    )}
                                    {t('LABEL.LAST_VALUE')}
                                </ToggleButton>
                                <ToggleButton
                                    type='radio'
                                    name='radio'
                                    value={LabelValueType.AVERAGE_VALUE}
                                    variant='light'
                                >
                                    {labelValueType === LabelValueType.AVERAGE_VALUE ? (
                                        <FaCheckSquare className='mr-1' size={16} />
                                    ) : (
                                        <FaRegSquare className='mr-1' size={16} />
                                    )}
                                    {t('LABEL.AVERAGE_VALUE')}
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        {data.datasets[0].data.length > 0 && <Pie data={data} options={options} />}
                        {data.datasets[0].data.length === 0 && (
                            <div className='d-flex justify-content-center'>
                                <Alert key='NotLoaded' variant='info' className='mt-4 col-4 justify-content-center'>
                                    {t('ALL.NO_DATA')}
                                </Alert>
                            </div>
                        )}
                    </div>
                </>
            )}

            <Modal show={showDeleteModal} onHide={handleOnCloseDeleteModel} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('ADD_EDIT.DELETE_TITLE')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('ADD_EDIT.DELETE_BODY')}</Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => handleDelete(loadingDelete)}>
                        {t('ADD_EDIT.DELETE')}
                    </Button>
                    <Button variant='secondary' onClick={handleOnCloseDeleteModel}>
                        {t('ADD_EDIT.CANCEL')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default LabelAllPage;
