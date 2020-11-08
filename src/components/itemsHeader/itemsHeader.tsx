import React from 'react';
import { ButtonComponent } from '../button/button';

export interface ItemsHeaderProps {
    title: string;
    action: string;
    onAction: () => void;
    disableAction?: boolean;
}

export const ItemsHeaderComponent: React.FC<ItemsHeaderProps> = React.memo((props: ItemsHeaderProps) => {
    return (
        <div className="d-flex justify-content-between mb-2">
            <h4>{props.title}</h4>
            <ButtonComponent
                className="mb-2"
                type="primary"
                text={props.action}
                onClick={props.onAction}
                disabled={props.disableAction ?? false}
            />
        </div>
    );
});
