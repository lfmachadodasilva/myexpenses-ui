import React from 'react';

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
            <button
                type="button"
                className="btn btn-primary"
                onClick={props.onAction}
                disabled={props.disableAction ?? false}
            >
                {props.action}
            </button>
        </div>
    );
});
