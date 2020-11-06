import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import { ItemComponent } from '../../components/item/item';
import { ExpenseFullModel } from '../../models/expense';

export type ExpenseItemsProps = {
    items: ExpenseFullModel[];
    onEdit: (id: number) => void;
    onDuplicate: (id: number) => void;
    onDelete: (id: number) => void;
};

export const ExpenseItemsPage: React.FC<ExpenseItemsProps> = React.memo((props: ExpenseItemsProps) => {
    const [t] = useTranslation();

    return (
        <>
            {props.items.map(item => (
                <ItemComponent
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    onEdit={() => props.onEdit(item.id)}
                    onDuplicate={() => props.onDuplicate(item.id)}
                    onDelete={() => props.onDelete(item.id)}
                >
                    <div className="d-flex justify-content-between">
                        <h6 className="no-margin">
                            {/* <small>{t('EXPENSE.VALUE')}</small> */}
                            {/* <br></br> */ ' '}
                            <small>{item.value.toFixed(2)}</small>
                        </h6>
                        <h6 className="no-margin">
                            {/* <small>{t('EXPENSE.DATE')}</small> */}
                            {/* <br></br> */ ' '}
                            <small>{format(new Date(item.date), t('EXPENSE.DATE_FORMAT'))}</small>
                        </h6>
                        <h6 className="no-margin">
                            {/* <small>{t('EXPENSE.LABEL')}</small> */}
                            {/* <br></br> */ ' '}
                            <small>{item.label.name}</small>
                        </h6>
                    </div>
                </ItemComponent>
            ))}
        </>
    );
});
