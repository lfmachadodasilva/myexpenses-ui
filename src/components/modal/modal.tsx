import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export type ModalProps = {
    show: boolean;
    title: string;
    size?: 'lg' | 'sm' | 'xl' | undefined;
    actionText: string;
    actionVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'light' | 'link';
    actionDisable?: boolean;
    onHide: () => void;
    onAction: () => void;
};

export const ModalComponent: React.FC<React.PropsWithChildren<ModalProps>> = React.memo(
    (props: React.PropsWithChildren<ModalProps>) => {
        const {
            show,
            title,
            size = 'xl',
            actionText,
            actionVariant = 'primary',
            actionDisable = false,
            onAction,
            onHide
        } = props;

        return (
            <>
                <Modal show={show} onHide={onHide} size={size} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{props.children}</Modal.Body>
                    <Modal.Footer>
                        <Button
                            data-testid="action-button"
                            variant={actionVariant}
                            onClick={onAction}
                            disabled={actionDisable}
                        >
                            {actionText}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
);
