import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const ManageExpensesPage: React.FC = memo(() => {
    const [t] = useTranslation();
    return <>{t('EXPENSES.MANAGE_PAGE.TITLE')}</>;
});
