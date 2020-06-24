import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const GroupsPage: React.FC = memo(() => {
    const [t] = useTranslation();
    return <>{t('EXPENSE.LIST.TITLE')}</>;
});
