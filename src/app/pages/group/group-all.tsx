import React, { useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { FetchStatus } from '../../services/fetch-status';
import { Alert, Row, Col, Spinner, Button, Popover, Image } from 'react-bootstrap';
import { FaPlus, FaUserAlt } from 'react-icons/fa';

import { userContext } from '../../contexts/user-context';
import { MyRoute } from '../../route';
import { GroupService } from '../../services/group/group-service';
import { User } from '../../models/user';
import { globalContext } from '../../contexts/global-context';
import ListComponent from '../../components/list/list';
import { hasValue } from '../../helpers/util-helper';

const GroupAllPage: React.FC = () => {
    const { user } = useContext(userContext);
    const { groupReducer, loadingBase } = useContext(globalContext);
    const { getGroupsWithDetails } = groupReducer;

    const { t } = useTranslation();
    const history = useHistory();

    const groups = groupReducer.state.groupsWithDetails;

    const handleDelete = useCallback(
        (id: string) => {
            let doIt = false;

            return new GroupService(user)
                .delete(id)
                .then(() => {
                    doIt = true;
                })
                .catch(() => {})
                .finally(() => {
                    if (doIt) {
                        getGroupsWithDetails();
                    }
                });
        },
        [user, getGroupsWithDetails]
    );

    const getToolTip = (u: User) => {
        const displayName = u.displayName && u.displayName.length > 0 ? u.displayName : u.email.split('@')[0];
        const photo =
            u.photoURL && u.photoURL.length > 0 ? (
                <Image className='mr-1 justify-content-center' src={u.photoURL} height={32} width={32} roundedCircle />
            ) : (
                <FaUserAlt className='mr-1 justify-content-center' height={32} width={32} />
            );

        return (
            <Popover id='popover-basic'>
                <Popover.Title as='h6'>{displayName}</Popover.Title>
                <Popover.Content>
                    <div className='d-flex justify-content-around align-items-center'>
                        {photo}
                        <h6 className='m-0'>{u.email}</h6>
                    </div>
                </Popover.Content>
            </Popover>
        );
    };

    useEffect(() => {
        if (loadingBase || groups.status !== FetchStatus.Ready) {
            return;
        }

        getGroupsWithDetails();
    }, [groups, getGroupsWithDetails, loadingBase]);

    return (
        <div key='GroupAllPage'>
            <hr />

            <Button
                variant='primary'
                size='sm'
                disabled={groups.status !== FetchStatus.Loaded}
                onClick={() => {
                    history.push(MyRoute.GROUP_ADD);
                }}
            >
                <FaPlus size={16} />
                &nbsp;
                {t('ADD')}
            </Button>

            {groups.status === FetchStatus.Ready && (
                <Alert key='NotLoaded' variant='info' className='mt-4'>
                    {t('NOT_LOADED')}
                </Alert>
            )}
            {groups.status === FetchStatus.Loading && (
                <Row className='m-4'>
                    <Col style={{ textAlign: 'center' }}>
                        <Spinner animation='border' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            )}
            {groups.status === FetchStatus.Loaded && groups.data.length === 0 && (
                <Alert key='EmptyLabel' variant='warning' className='mt-4'>
                    {t('NO_DATA')}
                </Alert>
            )}

            {groups.status === FetchStatus.Loaded && hasValue(groups.data) && (
                <div className='mt-3'>
                    <ListComponent
                        items={groups.data.map(group => {
                            return {
                                id: group.id,
                                title: group.name,
                                onEdit: (id: string) => Promise.resolve(history.push(MyRoute.GROUP + `/${id}`)),
                                onDelete: handleDelete,
                                badges: (group.users as User[]).map(x => {
                                    return {
                                        value:
                                            x.id === user.uid
                                                ? 'You'
                                                : x.displayName && x.displayName.length > 0
                                                ? x.displayName.split(' ')[0]
                                                : x.email.split('@')[0],
                                        showToolTip: () => getToolTip(x)
                                    };
                                })
                            };
                        })}
                    />
                </div>
            )}
        </div>
    );
};

export default GroupAllPage;
