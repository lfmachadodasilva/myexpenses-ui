import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import { IoIosCalendar } from 'react-icons/io';
import { BiLabel } from 'react-icons/bi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

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
                            <span className="mr-1">
                                <FaRegMoneyBillAlt />
                            </span>
                            <small>{item.value.toFixed(2)}</small>
                        </h6>
                        <h6 className="no-margin">
                            <span className="mr-1">
                                <IoIosCalendar />
                            </span>
                            <small>{format(new Date(item.date), t('EXPENSE.DATE_FORMAT'))}</small>
                        </h6>
                        <h6 className="no-margin">
                            <span className="mr-1">
                                <BiLabel />
                            </span>
                            <small>{item.label.name}</small>
                        </h6>
                    </div>
                </ItemComponent>
            ))}
        </>
    );
});
