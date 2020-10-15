import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { SearchComponent, SearchProps } from './search';

export class SearchTestObject extends TestObjectBase<SearchProps> {
    defaultParams: Partial<SearchProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: SearchProps) {
        return <SearchComponent {...props} />;
    }

    getText(text: string) {
        return this.queryByText(text);
    }
}
