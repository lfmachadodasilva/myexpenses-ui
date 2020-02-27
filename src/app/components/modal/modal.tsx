import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { hasValue } from '../../helpers/util-helper';

export interface ModalButtonProps {
    label: string;
    variant?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'dark'
        | 'light'
        | 'link'
        | 'outline-primary'
        | 'outline-secondary'
        | 'outline-success'
        | 'outline-danger'
        | 'outline-warning'
        | 'outline-info'
        | 'outline-dark'
        | 'outline-light';
    onClick: () => void;
}

export interface ModalComponentProps {
    show: boolean;
    title?: string;
    body?: string;
    onClose?: () => void;
    buttons?: ModalButtonProps[];
}

const ModalComponent: React.FC<ModalComponentProps> = (props: ModalComponentProps) => {
    return (
        <Modal show={props.show} onHide={props.onClose} centered>
            {hasValue(props.title) && (
                <Modal.Header closeButton={hasValue(props.onClose)}>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
            )}
            {hasValue(props.body) && <Modal.Body>{props.body}</Modal.Body>}
            {hasValue(props.buttons) && (
                <Modal.Footer>
                    {props.buttons.map(button => (
                        <Button variant={button.variant} onClick={button.onClick}>
                            {button.label}
                        </Button>
                    ))}
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default ModalComponent;
