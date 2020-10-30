import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { createGlobalStyle } from 'styled-components';

import { ConfigManager } from '../../configurations/configManager';
import { userContext } from '../../contexts/user';
import { ConfigModel } from '../../models/config';
import { GroupFullModel } from '../../models/group';
import { GroupService } from '../../services/group';
import { getUserDisplayName } from '../../helpers/user';
import { GroupModalPage } from '../groupModal/groupModal';
import { ItemComponent } from '../../components/item/item';
import { LoadingComponent } from '../../components/loading/loading';
import { ItemsHeaderComponent } from '../../components/itemsHeader/itemsHeader';
import { ErrorComponent } from '../../components/error/error';

const GroupStyle = createGlobalStyle``;

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

    const handleOnEdit = React.useCallback(
        (id: number) => {
            setGroup(groups.find(g => g.id === id));
            setShowModal(true);
        },
        [groups]
    );

    const handleOnDelete = React.useCallback(
        async (id: number) => {
            try {
                await new GroupService(config).remove(id);
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
                <ItemComponent
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    onEdit={handleOnEdit}
                    onDelete={handleOnDelete}
                >
                    <div key={`GROUP_USERS_${index}`} className="d-flex flex-wrap justify-content-start">
                        {group.users.map((user, indexUser) => (
                            <small key={`GROUP_SMALL_${index}_${indexUser}`} className="mr-2">
                                {getUserDisplayName(user)}
                            </small>
                        ))}
                    </div>
                </ItemComponent>
            )),
        [groups, handleOnEdit, handleOnDelete]
    );

    return (
        <>
            <GroupStyle />
            <ItemsHeaderComponent
                title={t('GROUP.TITLE')}
                action={t('GROUP.ADD')}
                onAction={handleOnAdd}
                disableAction={isLoading}
            />
            <ErrorComponent message={error} />
            <LoadingComponent isLoading={isLoading}>{groupElements}</LoadingComponent>
            <GroupModalPage show={showModal} group={group} onHide={handleOnHide} onAction={handleOnAction} />
        </>
    );
});
