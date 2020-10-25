import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { SearchComponent } from '../../components/search/search';
import { ConfigManager } from '../../configurations/configManager';
import { globalContext } from '../../contexts/global';
import { ConfigModel } from '../../models/config';
import { LabelFullModel } from '../../models/label';
import { LabelService } from '../../services/label';
import { hasValue } from '../../helpers/util';
import { ItemComponent } from '../../components/item/item';
import { LabelModalPage } from './labelModal';

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
    .red-text {
        color: #dc3545;
    }
`;

export const LabelPage: React.FC<LabelProps> = React.memo((_props: LabelProps) => {
    const [t] = useTranslation();
    const global = useContext(globalContext);

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
        if (global.isLoading) {
            return;
        }

        const runAsync = async () => {
            setLoading(true);
            try {
                const data = await new LabelService(config).getAllFull(global.group, global.month, global.year);
                setLabels(data);
            } catch {
                setLabels([]);
                setError(t('LABEL.ERROR'));
            } finally {
                setLoading(false);
            }
        };
        runAsync();
    }, [global, config, t, refresh]);
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
            try {
                await new LabelService(config).remove(id);
                setTimeout(() => {
                    setRefresh(!refresh);
                }, config.requestDelay);
            } catch {
                setError(t('LABEL.ERROR'));
            }
        },
        [config, t, refresh]
    );

    const handleOnHide = React.useCallback(() => {
        setShowModal(false);
    }, []);

    const handleOnAction = React.useCallback(() => {
        setShowModal(false);
        setTimeout(() => {
            setRefresh(!refresh);
        }, config.requestDelay);
    }, [config, refresh]);

    const handleOnGraphType = React.useCallback((value: number) => {
        setGrahType(value);
    }, []);
    // #endregion

    // #region loading
    const loadingElement = React.useMemo(() => {
        return (
            <div className="m-2 text-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }, []);
    // #endregion

    // #region items
    const itemsElements = React.useMemo(
        () =>
            isLoading
                ? loadingElement
                : labels.map(label => {
                      const currValueClass =
                          label.currValue > label.lastValue || label.currValue > label.avgValue ? 'red-text' : '';
                      const lastValueClass = label.lastValue > label.avgValue ? 'red-text' : '';

                      return (
                          <ItemComponent
                              key={label.id}
                              id={label.id}
                              name={label.name}
                              onEdit={handleOnEdit}
                              onDelete={handleOnDelete}
                          >
                              <div className="d-flex justify-content-between">
                                  <p className={`no-margin ${currValueClass}`}>
                                      <small>{t('LABEL.CURRENT_MONTH')}</small>
                                      <br></br>
                                      {label.currValue.toFixed(2)}
                                  </p>
                                  <p className={`no-margin ${lastValueClass}`}>
                                      <small>{t('LABEL.LAST_MONTH')}</small>
                                      <br></br>
                                      {label.lastValue.toFixed(2)}
                                  </p>
                                  <p className="no-margin">
                                      <small>{t('LABEL.AVERAGE')}</small>
                                      <br></br>
                                      {label.avgValue.toFixed(2)}
                                  </p>
                              </div>
                          </ItemComponent>
                      );
                  }),
        [isLoading, loadingElement, labels, handleOnEdit, handleOnDelete, t]
    );
    // #endregion

    // #region graph
    const graphElement = React.useMemo(() => {
        if (isLoading) {
            return loadingElement;
        }

        let dataChart =
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
                  };

        return (
            <>
                <Pie
                    key={graphType}
                    data={dataChart}
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
            </>
        );
    }, [loadingElement, isLoading, labels, graphType]);
    // #endregion

    return (
        <>
            <LabelStyle />
            <SearchComponent />
            <div className="d-flex justify-content-between mb-2">
                <h4>{t('LABEL.TITLE')}</h4>
                <Button onClick={handleOnAdd}>{t('LABEL.ADD')}</Button>
            </div>
            {hasValue(error) && (
                <Alert key="LABEL.ERROR" variant="danger">
                    {error}
                </Alert>
            )}

            <Tabs defaultActiveKey="items">
                <Tab eventKey="items" title={t('LABEL.TAB_ITEMS')}>
                    {itemsElements}
                </Tab>
                <Tab eventKey="graph" title={t('LABEL.TAB_GRAPH')}>
                    <div className="m-2 d-flex justify-content-center">
                        <ToggleButtonGroup type="radio" name="options" value={graphType} onChange={handleOnGraphType}>
                            <ToggleButton value={LabelGrapyType.CURRENT_MONTH}>{t('LABEL.CURRENT_MONTH')}</ToggleButton>
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
            <LabelModalPage show={showModal} label={label} onHide={handleOnHide} onAction={handleOnAction} />
        </>
    );
});
