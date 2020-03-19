import React from 'react';

export interface SearchContext {
    group: string;
    month: number;
    year: number;
}

export const initalSearchContext: SearchContext = {
    group: null,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
};

export const searchContext = React.createContext<SearchContext>(initalSearchContext);
