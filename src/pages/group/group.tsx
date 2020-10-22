import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { createGlobalStyle } from 'styled-components';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';

import { ConfigManager } from '../../configurations/configManager';
import { userContext } from '../../contexts/user';
import { ConfigModel } from '../../models/config';
import { GroupFullModel } from '../../models/group';
import { GroupService } from '../../services/group';
import { getUserDisplayName } from '../../helpers/user';
import { hasValue } from '../../helpers/util';
import { GroupModalPage } from './groupModal';

const GroupStyle = createGlobalStyle`
    .card-body {
        padding: 10px;
    };
    `;

export type GroupProps = {};

export const GroupPage: React.FC<GroupProps> = React.memo((props: GroupProps) => {
    const [t] = useTranslation();
    const { user } = useContext(userContext);

    const [config] = React.useState<ConfigModel>(ConfigManager.get());
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [group, setGroup] = React.useState<GroupFullModel>();
    const [groups, setGroups] = React.useState<GroupFullModel[]>([]);
    const [error, setError] = React.useState<string>('');
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [refresh, setRefresh] = React.useState<boolean>(false);

    const handleOnAdd = React.useCallback(() => {
        setGroup(undefined);
        setShowModal(true);
    }, []);

    const handleOnEdit = React.useCallback((group: GroupFullModel) => {
        setGroup(group);
        setShowModal(true);
    }, []);

    const handleOnDelete = React.useCallback(
        async (group: GroupFullModel) => {
            try {
                await new GroupService(config).remove(group?.id as number);
                setTimeout(() => {
                    setRefresh(!refresh);
                }, config.requestDelay);
            } catch {
                setError(t('GROUP.ERROR'));
            }
        },
        [config, refresh, t]
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

    React.useEffect(() => {
        const setup = async () => {
            setLoading(true);
            try {
                const data = await new GroupService(config).getAllFull(user?.uid ?? '');
                setGroups(data);
            } catch {
                setGroups([]);
                setError(t('GROUP.ERROR'));
            } finally {
                setLoading(false);
            }
        };
        setup();
    }, [config, user, refresh, t]);

    const groupElements = React.useMemo(
        () =>
            groups.map((group, index) => (
                <Card key={`GROUP_${index}`} className="mb-1">
                    <Card.Body>
                        <Card.Title>
                            <div className="d-flex justify-content-between">
                                {group.name}
                                <DropdownButton size="sm" variant="secondary" title="" id={`group-menu-${group.id}`}>
                                    <Dropdown.Item eventKey="1" onClick={() => handleOnEdit(group)}>
                                        {t('GROUP.EDIT')}
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="2" onClick={() => handleOnDelete(group)}>
                                        {t('GROUP.DELETE')}
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </Card.Title>
                        <Card.Body>
                            <div key={`GROUP_USERS_${index}`} className="d-flex flex-wrap justify-content-start">
                                {group.users.map((user, indexUser) => (
                                    <small key={`GROUP_SMALL_${index}_${indexUser}`} className="mr-2">
                                        {getUserDisplayName(user)}
                                    </small>
                                ))}
                            </div>
                        </Card.Body>
                    </Card.Body>
                </Card>
            )),
        [groups, handleOnEdit, handleOnDelete, t]
    );

    return (
        <>
            <GroupStyle />
            <div className="d-flex justify-content-between mb-2">
                <h4>{t('GROUP.TITLE')}</h4>
                <Button onClick={handleOnAdd}>{t('GROUP.ADD')}</Button>
            </div>
            {hasValue(error) && (
                <Alert key="GROUP.ERROR" variant="danger">
                    {error}
                </Alert>
            )}
            {isLoading && (
                <div className="d-flex justify-content-center m-4">
                    <Spinner className="group-loading" animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )}
            {!isLoading && groupElements}
            <GroupModalPage show={showModal} group={group} onHide={handleOnHide} onAction={handleOnAction} />
        </>
    );
});
