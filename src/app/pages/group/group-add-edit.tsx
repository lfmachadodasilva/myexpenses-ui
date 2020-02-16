import React, { useContext, useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Spinner, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router';
import Select from 'react-select';

import { globalContext } from '../../contexts/global-context';
import { userContext } from '../../contexts/user-context';
import { UserService } from '../../services/user/user.service';
import { GroupService } from '../../services/group/group-service';
import { Group } from '../../models/group';
import { MyRoute } from '../../route';
import { User } from '../../models/user';
import { FetchStatus } from '../../services/fetch-status';

const GroupAddEditPage: React.FC = () => {
    const { t } = useTranslation();
    const { initialising, user } = useContext(userContext);
    const { loadingBase, groupReducer } = useContext(globalContext);
    const { resetGroupsWithDetails } = groupReducer;
    const { groupsWithDetails } = groupReducer.state;
    const history = useHistory();

    const { group } = useParams();
    const isAdd = useRef(group === undefined);

    const [options, setOptions] = useState<any[]>([]);
    const [selected, setSelected] = useState<any[]>([]);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [willRedirect, SetWillRedirect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingGroup, setLoadingGroup] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);

    const disabledButton = useMemo(() => {
        return name === '' || loadingUsers || loadingGroup || selected.length === 0;
    }, [name, loadingUsers, loadingGroup, selected]);

    const cbMapUserToOptions = useCallback((users: User[], userId: string) => {
        return users.map(x => {
            return {
                value: x.id,
                label: x.id === userId ? 'You' : x.displayName && x.displayName.length > 0 ? x.displayName : x.email,
                isFixed: x.id === userId
            };
        });
    }, []);

    const cbLoadUsersAsync = useCallback(async () => {
        setLoadingUsers(true);
        return new UserService().getAll().then(users => {
            const ops = cbMapUserToOptions(users, user.uid);
            setOptions(ops);
            const you = ops.find(x => x.value === user.uid);
            setSelected([you]);
            setLoadingUsers(false);
        });
    }, [cbMapUserToOptions, user.uid]);

    const cbLoadGroupsFromReducer = useCallback(async () => {
        const value = groupsWithDetails.data.find(x => x.id === group);
        setName(value.name);
        setSelected(cbMapUserToOptions(value.users as User[], user.uid));
        setLoadingGroup(false);
    }, [cbMapUserToOptions, group, groupsWithDetails.data, user.uid]);

    const cbLoadGroupAsync = useCallback(
        async (groupId: string) => {
            await new GroupService(user)
                .getWithDetails(group)
                .then(value => {
                    setName(value.name);
                    setSelected(cbMapUserToOptions(value.users as User[], user.uid));
                })
                .catch(e => {
                    setError(e.toString());
                })
                .finally(() => {
                    setLoadingGroup(false);
                    setLoading(false);
                });
        },
        [cbMapUserToOptions, group, user]
    );

    useEffect(() => {
        if (initialising || willRedirect) {
            return;
        }

        // load users to populate
        // TODO load from reducer
        cbLoadUsersAsync().finally(() => {
            if (!isAdd.current) {
                setLoadingUsers(false);
                setLoadingGroup(true);

                if (groupsWithDetails.status === FetchStatus.Loaded) {
                    cbLoadGroupsFromReducer();
                } else {
                    cbLoadGroupAsync(group);
                }
            } else {
                setLoading(false);
            }
        });
    }, [
        willRedirect,
        groupsWithDetails.status,
        isAdd,
        initialising,
        group,
        cbLoadGroupsFromReducer,
        cbLoadGroupAsync,
        cbLoadUsersAsync
    ]);

    const styles = {
        multiValue: (base: any, state: any) => {
            return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
        },
        multiValueLabel: (base: any, state: any) => {
            return state.data.isFixed ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 } : base;
        },
        multiValueRemove: (base: any, state: any) => {
            return state.data.isFixed ? { ...base, display: 'none' } : base;
        }
    };

    const handleAdd = useCallback(() => {
        setLoading(true);
        let doIt = false;
        new GroupService(user)
            .add({ name: name, users: selected.map(x => x.value) } as Group)
            .then(() => {
                doIt = true;
                SetWillRedirect(true);
            })
            .catch(e => {
                setError(e.toString());
            })
            .finally(() => {
                setLoading(false);
                if (doIt) {
                    resetGroupsWithDetails();
                    history.push(MyRoute.GROUP);
                }
            });
    }, [history, user, name, selected, resetGroupsWithDetails]);

    const handleEdit = useCallback(() => {
        setLoading(true);
        let doIt = false;
        new GroupService(user)
            .update({ id: group, name: name, users: selected.map(x => x.value) } as Group)
            .then(() => {
                doIt = true;
                SetWillRedirect(true);
            })
            .catch(e => {
                setError(e.toString());
            })
            .finally(() => {
                setLoading(false);
                if (doIt) {
                    resetGroupsWithDetails();
                    history.push(MyRoute.GROUP);
                }
            });
    }, [selected, history, group, name, user, resetGroupsWithDetails]);

    return (
        <div className='mt-4'>
            {loadingBase && (
                <Row className='m-4'>
                    <Col style={{ textAlign: 'center' }}>
                        <Spinner animation='border' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            )}
            {!loadingBase && (
                <Row>
                    <Col sm={12} md={6}>
                        <h4>{t(isAdd.current ? 'GROUP.ADD_EDIT.ADD_TITLE' : 'GROUP.ADD_EDIT.EDIT_TITLE')}</h4>

                        <hr></hr>
                        <Form>
                            <Form.Group controlId='formLabelName'>
                                <Form.Label>{t('GROUP.ADD_EDIT.NAME')}</Form.Label>
                                {!isAdd.current && loadingGroup && (
                                    <>
                                        &nbsp;
                                        <Spinner
                                            as='span'
                                            animation='border'
                                            size='sm'
                                            role='status'
                                            aria-hidden='true'
                                        />
                                        &nbsp;
                                    </>
                                )}
                                <Form.Control
                                    type='text'
                                    placeholder={t('GROUP.ADD_EDIT.NAME_PLACEHOLDER')}
                                    value={name}
                                    onChange={(value: any) => {
                                        setName(value.target.value);
                                    }}
                                    size='sm'
                                    disabled={loading || loadingGroup}
                                />
                            </Form.Group>

                            <Form.Group controlId='formLabelName'>
                                <Form.Label>{t('GROUP.ADD_EDIT.USERS')}</Form.Label>
                                <Select
                                    value={selected}
                                    onChange={(selectedOptions: any) => setSelected(selectedOptions)}
                                    options={options}
                                    isMulti={true}
                                    placeholder={t('GROUP.ADD_EDIT.USERS_PLACEHOLDER')}
                                    styles={styles}
                                    isClearable={false}
                                    isLoading={loadingUsers || loadingGroup}
                                    isDisabled={loadingUsers || loadingGroup}
                                />
                            </Form.Group>

                            <Button
                                variant='primary'
                                disabled={disabledButton}
                                onClick={isAdd.current ? handleAdd : handleEdit}
                                size='sm'
                            >
                                {loading && (
                                    <>
                                        <Spinner
                                            as='span'
                                            animation='border'
                                            role='status'
                                            aria-hidden='true'
                                            size='sm'
                                        />
                                        &nbsp;
                                    </>
                                )}
                                {t(isAdd.current ? 'GROUP.ADD_EDIT.ADD' : 'GROUP.ADD_EDIT.EDIT')}
                            </Button>
                        </Form>

                        {error !== '' && (
                            <Alert key='addError' variant='danger' className='mt-2'>
                                {error}
                            </Alert>
                        )}
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default GroupAddEditPage;
