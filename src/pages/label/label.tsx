import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { SearchComponent } from '../../components/search/search';
import { ConfigManager } from '../../configurations/configManager';
import { defaultGlobalContext, globalContext } from '../../contexts/global';
import { ConfigModel } from '../../models/config';
import { LabelFullModel } from '../../models/label';
import { LabelService } from '../../services/label';
import { ItemComponent } from '../../components/item/item';
import { LabelModalPage } from '../labelModal/labelModal';
import { LoadingComponent } from '../../components/loading/loading';
import { AlertComponent } from '../../components/alert/alert';
import { ItemsHeaderComponent } from '../../components/itemsHeader/itemsHeader';
import { hasValue } from '../../helpers/util';

export type LabelProps = {};

enum LabelGrapyType {
    CURRENT_MONTH = 1,
    LAST_MONTH,
    AVERAGE
}

const LabelStyle = createGlobalStyle`
    .no-margin {
        margin: 0px;
    };
    canvas {
        max-width: 500px;
    };
`;

export const LabelPage: React.FC<LabelProps> = React.memo((_props: LabelProps) => {
    const [t] = useTranslation();

    const { isLoading: isLoadingGlobal, group, groups, month, year, reloadLabels } = useContext(globalContext);

    const [config] = React.useState<ConfigModel>(ConfigManager.get());
    const [error, setError] = React.useState<string>('');
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [labels, setLabels] = React.useState<LabelFullModel[]>([]);
    const [label, setLabel] = React.useState<LabelFullModel>();
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [refresh, setRefresh] = React.useState<boolean>(false);
    const [graphType, setGrahType] = React.useState(LabelGrapyType.CURRENT_MONTH);

    // #region main
    React.useEffect(() => {
        if (isLoadingGlobal) {
            return;
        }

        const runAsync = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await new LabelService(config).getAllFull(group, month, year);
                setLabels(data);
            } catch {
                setLabels([]);
                setError(t('LABEL.ERROR'));
            } finally {
                setLoading(false);
            }
        };
        runAsync();
    }, [isLoadingGlobal, group, month, year, config, t, refresh]);
    // #endregion

    // #region handles
    const handleOnAdd = React.useCallback(() => {
        setLabel(undefined);
        setShowModal(true);
    }, []);

    const handleOnEdit = React.useCallback(
        (id: number) => {
            setLabel(labels.find(g => g.id === id));
            setShowModal(true);
        },
        [labels]
    );

    const handleOnDelete = React.useCallback(
        async (id: number) => {
            setError('');
            try {
                await new LabelService(config).remove(id);
                setTimeout(() => {
                    reloadLabels();
                    setRefresh(!refresh);
                }, config.requestDelay);
            } catch {
                setError(t('LABEL.ERROR'));
            }
        },
        [config, t, refresh, reloadLabels]
    );

    const handleOnHide = React.useCallback(() => {
        setShowModal(false);
    }, []);

    const handleOnAction = React.useCallback(() => {
        setShowModal(false);
        setTimeout(() => {
            reloadLabels();
            setRefresh(!refresh);
        }, config.requestDelay);
    }, [config, refresh, reloadLabels]);

    const handleOnGraphType = React.useCallback((value: number) => {
        setGrahType(value);
    }, []);
    // #endregion

    // #region items
    const itemsElements = React.useMemo(() => {
        return labels.map(label => {
            const currValueClass =
                label.currValue > label.lastValue || label.currValue > label.avgValue ? 'text-danger' : '';
            const lastValueClass = label.lastValue > label.avgValue ? 'text-danger' : '';

            return (
                <ItemComponent
                    key={label.id}
                    id={label.id}
                    name={label.name}
                    onEdit={handleOnEdit}
                    onDelete={handleOnDelete}
                >
                    <div className="d-flex justify-content-between">
                        <h6 className={`no-margin ${currValueClass}`}>
                            <small>
                                <small>{t('LABEL.CURRENT_MONTH')}</small>
                            </small>
                            <br></br>
                            <small>{label.currValue.toFixed(2)}</small>
                        </h6>
                        <h6 className={`no-margin ${lastValueClass}`}>
                            <small>
                                <small>{t('LABEL.LAST_MONTH')}</small>
                            </small>
                            <br></br>
                            <small>{label.lastValue.toFixed(2)}</small>
                        </h6>
                        <h6 className="no-margin">
                            <small>
                                <small>{t('LABEL.AVERAGE')}</small>
                            </small>
                            <br></br>
                            <small>{label.avgValue.toFixed(2)}</small>
                        </h6>
                    </div>
                </ItemComponent>
            );
        });
    }, [labels, handleOnEdit, handleOnDelete, t]);
    // #endregion

    // #region graph
    const graphElement = React.useMemo(() => {
        return (
            <Pie
                key={graphType}
                data={
                    labels.length > 0
                        ? {
                              labels: labels.map(label => label.name),
                              datasets: [
                                  {
                                      data: labels.map(label =>
                                          graphType === LabelGrapyType.CURRENT_MONTH
                                              ? label.currValue
                                              : graphType === LabelGrapyType.LAST_MONTH
                                              ? label.lastValue
                                              : label.avgValue
                                      ),
                                      borderWidth: 0
                                  }
                              ]
                          }
                        : {
                              labels: ['Empty'],
                              datasets: [
                                  {
                                      data: [1],
                                      borderWidth: 0
                                  }
                              ]
                          }
                }
                options={{
                    plugins: {
                        colorschemes: {
                            scheme: 'office.Excel16'
                        }
                    }
                }}
                width={100}
                height={100}
            />
        );
    }, [labels, graphType]);
    // #endregion

    const alertElements = React.useMemo(() => {
        if (group === defaultGlobalContext.group) {
            return <AlertComponent message={t('LABEL.EMPTY_GROUP')} type="warning" />;
        }
        if (!isLoading && !isLoadingGlobal && labels.length === 0 && !hasValue(error)) {
            return <AlertComponent message={t('LABEL.EMPTY')} type="warning" />;
        }
        return <AlertComponent message={error} type="danger" />;
    }, [error, group, isLoading, isLoadingGlobal, labels, t]);

    return (
        <>
            <LabelStyle />
            <SearchComponent />
            <ItemsHeaderComponent
                title={t('LABEL.TITLE')}
                action={t('LABEL.ADD')}
                onAction={handleOnAdd}
                disableAction={isLoading || isLoadingGlobal || !hasValue(groups)}
            />
            {alertElements}
            <LoadingComponent isLoading={isLoading || isLoadingGlobal}>
                <Tabs defaultActiveKey="items">
                    <Tab eventKey="items" title={t('LABEL.TAB_ITEMS')}>
                        {itemsElements}
                    </Tab>
                    <Tab eventKey="graph" title={t('LABEL.TAB_GRAPH')}>
                        <div className="m-2 d-flex justify-content-center">
                            <ToggleButtonGroup
                                type="radio"
                                name="options"
                                value={graphType}
                                onChange={handleOnGraphType}
                            >
                                <ToggleButton value={LabelGrapyType.CURRENT_MONTH}>
                                    {t('LABEL.CURRENT_MONTH')}
                                </ToggleButton>
                                <ToggleButton value={LabelGrapyType.LAST_MONTH}>{t('LABEL.LAST_MONTH')}</ToggleButton>
                                <ToggleButton value={LabelGrapyType.AVERAGE}>{t('LABEL.AVERAGE')}</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div className="d-flex justify-content-center">
                            {/* ignore chart.js on testing */}
                            {process.env.NODE_ENV !== 'test' && graphElement}
                        </div>
                    </Tab>
                </Tabs>
            </LoadingComponent>
            <LabelModalPage show={showModal} label={label} onHide={handleOnHide} onAction={handleOnAction} />
        </>
    );
});
