import React, { useContext, useState, useCallback, useEffect } from 'react';
import { userContext } from '../../contexts/user-context';
import { useTranslation } from 'react-i18next';
import { FetchStatus } from '../../services/fetch-status';
import {
    Alert,
    Row,
    Col,
    Spinner,
    Button,
    ListGroup,
    Badge,
    OverlayTrigger,
    Popover,
    Image,
    Modal
} from 'react-bootstrap';
import { FaPlus, FaEdit, FaRegWindowClose, FaUserAlt } from 'react-icons/fa';

import { MyRoute } from '../../route';
import { GroupService } from '../../services/group/group-service';
import { useHistory } from 'react-router';
import { User } from '../../models/user';
import { globalContext } from '../../contexts/global-context';

const GroupAllPage: React.FC = () => {
    const { user } = useContext(userContext);
    const { groupReducer, loadingBase } = useContext(globalContext);
    const { getGroupsWithDetails } = groupReducer;

    const { t } = useTranslation();
    const history = useHistory();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState('');
    const groups = groupReducer.state.groupsWithDetails;

    const handleDelete = useCallback(
        (id: string) => {
            let doIt = false;
            setShowDeleteModal(false);
            setLoadingDelete(id);
            new GroupService(user)
                .delete(id)
                .then(() => {
                    doIt = true;
                })
                .catch(() => {})
                .finally(() => {
                    setLoadingDelete('');
                    if (doIt) {
                        getGroupsWithDetails();
                    }
                });
        },
        [user, getGroupsWithDetails]
    );

    const handleOnCloseDeleteModel = useCallback(() => {
        setShowDeleteModal(false);
        setLoadingDelete('');
    }, []);

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
                {t('GROUP.ADD')}
            </Button>

            {groups.status === FetchStatus.Ready && (
                <Alert key='NotLoaded' variant='info' className='mt-4'>
                    {t('GROUP.NOT_LOADED')}
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
                    {t('GROUP.EMPTY')}
                </Alert>
            )}

            {groups.status === FetchStatus.Loaded && groups.data && groups.data.length > 0 && (
                <>
                    <ListGroup className='mt-3 mb-3'>
                        {groups.data.map(group => {
                            return (
                                <ListGroup.Item key={JSON.stringify(group)}>
                                    <div className='d-flex justify-content-between'>
                                        <h4>{group.name}</h4>
                                        <div className='d-flex justify-content-end'>
                                            <FaEdit
                                                className='mr-3'
                                                size={16}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => history.push(MyRoute.GROUP + `/${group.id}`)}
                                            />
                                            {loadingDelete === group.id && (
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
                                            {loadingDelete !== group.id && (
                                                <FaRegWindowClose
                                                    size={16}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        //handleDelete(group.id);
                                                        setLoadingDelete(group.id);
                                                        setShowDeleteModal(true);
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <hr className='m-1' />

                                    <h6 className='mt-2 mb-0'>
                                        {t('GROUP.ADD_EDIT.USERS')}
                                        {(group.users as User[]).map(x => {
                                            return (
                                                <OverlayTrigger
                                                    key={'overlaytrigger-' + x.id}
                                                    placement='top'
                                                    overlay={getToolTip(x)}
                                                >
                                                    <Badge key={x.id} className='ml-1 mr-1' variant='info'>
                                                        {x.id === user.uid
                                                            ? 'You'
                                                            : x.displayName && x.displayName.length > 0
                                                            ? x.displayName.split(' ')[0]
                                                            : x.email.split('@')[0]}
                                                    </Badge>
                                                </OverlayTrigger>
                                            );
                                        })}
                                    </h6>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
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

export default GroupAllPage;
