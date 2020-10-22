import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { ConfigModel } from '../../models/config';
import { ConfigManager } from '../../configurations/configManager';
import { userContext } from '../../contexts/user';
import { UserService } from '../../services/user';
import { UserModel } from '../../models/user';
import { hasValue } from '../../helpers/util';
import { GroupFullModel } from '../../models/group';
import { GroupService } from '../../services/group';

export type GroupModalProps = {
    show: boolean;
    group?: GroupFullModel;
    onHide: () => void;
    onAction: () => void;
};

export const GroupModalPage: React.FC<GroupModalProps> = React.memo((props: GroupModalProps) => {
    const [t] = useTranslation();

    const { user } = useContext(userContext);

    const [error, setError] = React.useState('');
    const [config] = React.useState<ConfigModel>(ConfigManager.get());
    const [name, setName] = React.useState<string>('');
    const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
    const [users, setUsers] = React.useState<UserModel[]>([]);
    const [isLoadingUsers, setLoadingUsers] = React.useState(false);
    const [isLoadingAction, setLoadingAction] = React.useState(false);

    const handleOnChangeName = React.useCallback(event => {
        setName(event.target.value);
    }, []);

    const handleOnChangeUsers = React.useCallback(event => {
        setSelectedUsers(Array.from(event.target.selectedOptions, (option: any) => option.value));
    }, []);

    const handleOnAction = React.useCallback(async () => {
        setLoadingAction(true);

        if (hasValue(props.group)) {
            try {
                await new GroupService(config).update({
                    id: props.group?.id as number,
                    name: name,
                    users: selectedUsers
                });
                props.onAction();
            } catch {
                setError(t('GROUP.ERROR'));
            } finally {
                setLoadingAction(false);
            }
        } else {
            setLoadingAction(true);
            try {
                await new GroupService(config).add({ name: name, users: selectedUsers });
                props.onAction();
            } catch {
                setError(t('GROUP.ERROR'));
            } finally {
                setLoadingAction(false);
            }
        }
    }, [name, selectedUsers, t, config, props]);

    React.useEffect(() => {
        if (!props.show) {
            return;
        }

        if (props.group) {
            setName(props.group?.name);
            setSelectedUsers(props.group?.users.map(x => x.id));
        } else {
            setName('');
            setSelectedUsers([]);
        }
    }, [props]);

    React.useEffect(() => {
        const runAsync = async () => {
            setLoadingUsers(true);
            setError('');
            try {
                const data = await new UserService(config).getAll();
                setUsers(data);
            } catch {
                setError(t('GROUP.ERROR'));
            } finally {
                setLoadingUsers(false);
            }
        };
        runAsync();
    }, [t, config]);

    const disabledAction = React.useMemo(() => {
        if (isLoadingAction) {
            return true;
        }

        if (hasValue(error)) {
            return true;
        }

        if (!hasValue(name) || !hasValue(selectedUsers)) {
            return true;
        }

        return false;
    }, [error, name, selectedUsers, isLoadingAction]);

    const usersOption = React.useMemo(
        () =>
            users.map(u =>
                user?.uid === u.id ? (
                    <option key={u.id} value={u.id}>
                        {t('GROUP.YOU')}
                    </option>
                ) : (
                    <option key={u.id} value={u.id}>{`${u.displayName} (${u.email})`}</option>
                )
            ),
        [users, user, t]
    );

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {hasValue(props.group) ? t('GROUP.MODAL.EDIT_TITLE') : t('GROUP.MODAL.ADD_TITLE')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {hasValue(error) && (
                        <Alert key="GROUP.MODAL.ERROR" variant="danger">
                            {error}
                        </Alert>
                    )}
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>{t('GROUP.MODAL.NAME')}</Form.Label>
                            <Form.Control
                                data-testid="group-name-field"
                                type="text"
                                value={name}
                                placeholder={t('GROUP.MODAL.NAME_PLACEHOLDER')}
                                onChange={handleOnChangeName}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>{t('GROUP.MODAL.USERS')}</Form.Label>
                            <Form.Control
                                data-testid="group-users-field"
                                as="select"
                                multiple
                                value={selectedUsers}
                                readOnly={isLoadingUsers && hasValue(error)}
                                onChange={handleOnChangeUsers}
                            >
                                {usersOption}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleOnAction} disabled={disabledAction}>
                        {hasValue(props.group) ? t('GROUP.MODAL.EDIT_ACTION') : t('GROUP.MODAL.ADD_ACTION')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});
