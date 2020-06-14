import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const ListExpensesPage: React.FC = memo(() => {
    const [t] = useTranslation();
    return <>{t('EXPENSES.LIST_PAGE.TITLE')}</>;
});
