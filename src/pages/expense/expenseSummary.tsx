import React from 'react';
import { useTranslation } from 'react-i18next';

import { ExpenseFullModel } from '../../models/expense';

export type ExpenseSummaryProps = {
    incoming: ExpenseFullModel[];
    outcoming: ExpenseFullModel[];
};

export const ExpenseSummaryPage: React.FC<ExpenseSummaryProps> = React.memo((props: ExpenseSummaryProps) => {
    const [t] = useTranslation();

    const { incoming, outcoming } = props;

    const [totalIncoming, setTotalIncoming] = React.useState<number>(0);
    const [totalOutcoming, setTotalOutcoming] = React.useState<number>(0);
    const [totalLeft, setTotalLeft] = React.useState<number>(0);
    const [totalLeftPer, setTotalLeftPer] = React.useState<number>(0);

    React.useEffect(() => {
        const tmpTotalIncoming = incoming.reduce((sum, current) => sum + current.value, 0);
        const tmpTotalOutcoming = outcoming.reduce((sum, current) => sum + current.value, 0);

        setTotalIncoming(tmpTotalIncoming);
        setTotalOutcoming(tmpTotalOutcoming);

        const tmpTotalLeft = tmpTotalIncoming - tmpTotalOutcoming;

        setTotalLeft(tmpTotalLeft);
        setTotalLeftPer((tmpTotalLeft / tmpTotalIncoming) * 100);
    }, [incoming, outcoming]);

    return (
        <>
            <div className="mt-2 row">
                <div className="col">
                    <p>{t('EXPENSE.TOTAL_INCOMING')}</p>
                </div>
                <div className="col">{totalIncoming.toFixed(2)}</div>
            </div>
            <div className="row">
                <div className="col">
                    <p>{t('EXPENSE.TOTAL_OUTCOMING')}</p>
                </div>
                <div className="col">{totalOutcoming.toFixed(2)}</div>
            </div>
            <div className="row">
                <div className="col">
                    <p>{t('EXPENSE.TOTAL_LEFT')}</p>
                </div>
                <div className="col">{`${totalLeft.toFixed(2)} - ${totalLeftPer.toFixed(2)}%`}</div>
            </div>
        </>
    );
});
