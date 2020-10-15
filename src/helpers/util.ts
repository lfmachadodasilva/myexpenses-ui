export const hasValue = (value: any): boolean => {
    if (value === null || value === undefined) {
        return false;
    }

    if (typeof value === 'string' || Array.isArray(value)) {
        return value.length > 0;
    }

    return true;
};

// export const getValueOrDefault = (value?: string, defaultValue?: string) => {
//     return hasValue(value) ? value : defaultValue;
// };

export const getValueOrDefault = (...values: any[]) => {
    return values.find(x => hasValue(x));
};
