import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Form from 'react-bootstrap/Form';

import { AlertComponent } from '../../components/alert/alert';
import { ItemsHeaderComponent } from '../../components/itemsHeader/itemsHeader';
import { ConfigManager } from '../../configurations/configManager';
import { globalContext } from '../../contexts/global';
import { hasValue } from '../../helpers/util';
import { ConfigModel } from '../../models/config';
import { ExpenseService } from '../../services/expense';
import { LoadingComponent } from '../../components/loading/loading';
import { format } from 'date-fns';

export type ExportProps = {};

const defaultSeparator = ';';

export const ExportPage: React.FC<ExportProps> = React.memo((props: ExportProps) => {
    const [t] = useTranslation();
    const { group: groupGlobal, groups, labels, isLoading: isLoadingGlobal } = useContext(globalContext);
    const [config] = React.useState<ConfigModel>(ConfigManager.get());

    const [isLoading, setLoading] = React.useState(false);
    const [group, setGroup] = React.useState(groupGlobal);
    const [separator, setSeparator] = React.useState<string>(defaultSeparator);
    const [error, setError] = React.useState('');
    const [data, setData] = React.useState('');
    const [empty, setEmpty] = React.useState('');

    const groupsOptions = React.useMemo(
        () =>
            groups.map(x => (
                <option key={'GROUP_' + x.id} value={x.id}>
                    {x.name}
                </option>
            )),
        [groups]
    );

    const disabledAction = React.useMemo(() => {
        if (!hasValue(separator) || isLoading || isLoadingGlobal) {
            return true;
        }
        return false;
    }, [separator, isLoading, isLoadingGlobal]);

    const handleOnAction = React.useCallback(async () => {
        setLoading(true);
        setEmpty('');
        setError('');
        setData('');
        try {
            // get all expenses
            const values = await new ExpenseService(config).getAll(group);

            if (values.length === 0) {
                // does not exist any expenses
                setEmpty(t('EXPORT.EMPTY'));
            } else {
                // process all expenses
                setData(
                    values
                        .map(value => {
                            const formatDate = format(new Date(value.date), t('EXPENSE.DATE_FORMAT'));
                            const labelName = labels.find(l => l.id === value.labelId)?.name.trim() ?? value.labelId;
                            const line = [value.type, value.name.trim(), value.value, formatDate, labelName].join(
                                separator
                            );
                            if (hasValue(value.comments)) {
                                return `${line}${separator}${value.comments.trim()}`;
                            }
                            return line;
                        })
                        .join('\n')
                );
            }
        } catch {
            setError(t('EXPORT.ERROR'));
        } finally {
            setLoading(false);
        }
    }, [separator, group, config, labels, t]);

    const handleOnChangeGroup = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setGroup(+event.target.value);
    }, []);

    const handleOnChangeSeparator = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSeparator(event.target.value);
    }, []);

    React.useEffect(() => {
        setGroup(groupGlobal);
    }, [groupGlobal]);

    return (
        <>
            <ItemsHeaderComponent
                title={t('EXPORT.TITLE')}
                action={t('EXPORT.ACTION')}
                onAction={handleOnAction}
                disableAction={disabledAction}
            />
            <AlertComponent
                message={!isLoadingGlobal && groups.length === 0 ? t('EXPORT.EMPTY_GROUP') : ''}
                type="warning"
            />
            <AlertComponent message={empty} type="warning" />
            <AlertComponent message={error} type="danger" />
            <LoadingComponent isLoading={isLoading} text={t('EXPORT.EXPORTING')}>
                <Form>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <Form.Group>
                                <Form.Label>{t('EXPORT.GROUP')}</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={group}
                                    onChange={handleOnChangeGroup}
                                    data-testid="export-group-field"
                                >
                                    {groupsOptions}
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <Form.Group>
                                <Form.Label>{t('EXPORT.SEPARATOR')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={separator}
                                    onChange={handleOnChangeSeparator}
                                    data-testid="export-separator-field"
                                />
                            </Form.Group>
                        </div>
                        <div className="col-sm-12">
                            <Form.Group controlId="formExportData">
                                <Form.Label>{t('EXPORT.DATA')}</Form.Label>
                                <Form.Text className="text-muted">{t('EXPORT.DATA_TEXT')}</Form.Text>
                                <Form.Control
                                    className="text-dark"
                                    as="textarea"
                                    aria-label="data-input"
                                    rows={10}
                                    placeholder={t('EXPORT.DATA_PLACEHOLDER')}
                                    value={data}
                                    readOnly
                                    data-testid="export-data-field"
                                />
                            </Form.Group>
                        </div>
                    </div>
                </Form>
            </LoadingComponent>
        </>
    );
});
