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
import { AlertComponent } from '../../components/alert/alert';
import { globalContext } from '../../contexts/global';
import { hasValue } from '../../helpers/util';

const GroupStyle = createGlobalStyle``;

export type GroupProps = {};

export const GroupPage: React.FC<GroupProps> = React.memo((props: GroupProps) => {
    const [t] = useTranslation();
    const { user, isReady } = useContext(userContext);
    const { reloadGroups } = useContext(globalContext);

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
            setError('');
            try {
                await new GroupService(config).remove(id);
                setTimeout(() => {
                    reloadGroups();
                    setRefresh(!refresh);
                }, config.requestDelay);
            } catch {
                setError(t('GROUP.ERROR'));
            }
        },
        [config, refresh, t, reloadGroups]
    );

    const handleOnHide = React.useCallback(() => {
        setShowModal(false);
    }, []);

    const handleOnAction = React.useCallback(() => {
        setShowModal(false);

        setTimeout(() => {
            reloadGroups();
            setRefresh(!refresh);
        }, config.requestDelay);
    }, [config, refresh, reloadGroups]);

    React.useEffect(() => {
        if (!isReady) {
            return;
        }

        setError('');
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
    }, [isReady, config, user, refresh, t]);

    const groupElements = React.useMemo(() => {
        if (!isLoading && groups.length === 0 && !hasValue(error)) {
            return <AlertComponent message={t('GROUP.EMPTY')} type="warning" />;
        }
        if (hasValue(error)) {
            return <AlertComponent message={error} type="danger" />;
        }

        return groups.map((group, index) => (
            <ItemComponent
                key={group.id}
                id={group.id}
                name={group.name}
                onEdit={handleOnEdit}
                onDelete={handleOnDelete}
            >
                <div key={`GROUP_USERS_${index}`} className="d-flex flex-wrap justify-content-start">
                    {group.users.map((u, indexUser) => (
                        <small key={`GROUP_SMALL_${index}_${indexUser}`} className="mr-2">
                            {user && user.uid === u.id ? t('GROUP.YOU') : getUserDisplayName(u)}
                        </small>
                    ))}
                </div>
            </ItemComponent>
        ));
    }, [user, isLoading, error, groups, handleOnEdit, handleOnDelete, t]);

    return (
        <>
            <GroupStyle />
            <ItemsHeaderComponent
                title={t('GROUP.TITLE')}
                action={t('GROUP.ADD')}
                onAction={handleOnAdd}
                disableAction={isLoading}
            />
            <LoadingComponent isLoading={isLoading}>{groupElements}</LoadingComponent>
            <GroupModalPage show={showModal} group={group} onHide={handleOnHide} onAction={handleOnAction} />
        </>
    );
});
