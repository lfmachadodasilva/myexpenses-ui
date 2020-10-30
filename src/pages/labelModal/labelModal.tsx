import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ConfigModel } from '../../models/config';
import { ConfigManager } from '../../configurations/configManager';
import { hasValue } from '../../helpers/util';
import { LabelFullModel } from '../../models/label';
import { LabelService } from '../../services/label';
import { globalContext } from '../../contexts/global';
import { ErrorComponent } from '../../components/error/error';

export type LabelModalProps = {
    show: boolean;
    label?: LabelFullModel;
    onHide: () => void;
    onAction: () => void;
};

export const LabelModalPage: React.FC<LabelModalProps> = React.memo((props: LabelModalProps) => {
    const [t] = useTranslation();

    const { show, label } = props;

    const { group } = useContext(globalContext);

    const [error, setError] = React.useState('');
    const [config] = React.useState<ConfigModel>(ConfigManager.get());
    const [name, setName] = React.useState<string>('');
    const [isLoadingAction, setLoadingAction] = React.useState(false);

    const handleOnChangeName = React.useCallback(event => {
        setName(event.target.value);
    }, []);

    const handleOnAction = React.useCallback(async () => {
        setLoadingAction(true);

        if (hasValue(props.label)) {
            try {
                await new LabelService(config).update({
                    ...(props.label as LabelFullModel),
                    name: name
                });
                props.onAction();
            } catch {
                setError(t('LABEL.ERROR'));
            } finally {
                setLoadingAction(false);
            }
        } else {
            setLoadingAction(true);
            try {
                await new LabelService(config).add({ name: name, groupId: group });
                props.onAction();
            } catch {
                setError(t('LABEL.ERROR'));
            } finally {
                setLoadingAction(false);
            }
        }
    }, [name, t, config, props, group]);

    React.useEffect(() => {
        if (!show) {
            return;
        }

        if (label) {
            setName(label?.name ?? '');
        } else {
            setName('');
        }
    }, [show, label]);

    const disabledAction = React.useMemo(() => {
        if (isLoadingAction || hasValue(error) || !hasValue(name)) {
            return true;
        }

        return false;
    }, [error, name, isLoadingAction]);

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {hasValue(props.label) ? t('LABEL.MODAL.EDIT_TITLE') : t('LABEL.MODAL.ADD_TITLE')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ErrorComponent message={error} />
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>{t('LABEL.MODAL.NAME')}</Form.Label>
                            <Form.Control
                                data-testid="label-name-field"
                                type="text"
                                value={name}
                                placeholder={t('LABEL.MODAL.NAME_PLACEHOLDER')}
                                onChange={handleOnChangeName}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleOnAction} disabled={disabledAction}>
                        {hasValue(props.label) ? t('LABEL.MODAL.EDIT_ACTION') : t('LABEL.MODAL.ADD_ACTION')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});