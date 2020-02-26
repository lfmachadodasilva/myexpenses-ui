export const hasValue = (value: any): boolean => {
    if (value === null || value === undefined) {
        return false;
    }

    if (typeof value === 'string') {
        return (value as string).length > 0;
    }

    return true;
};

export const getValueOrDefault = (value: string, defaultValue: string) => {
    return hasValue(value) ? value : defaultValue;
};
