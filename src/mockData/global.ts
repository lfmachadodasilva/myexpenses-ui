import { defaultGlobalContext, GlobalContext } from '../contexts/global';
import { yearsMockData } from './expense';
import { groupsMockData } from './group';
import { labelsMockData } from './label';

export const globalMockData: GlobalContext = {
    ...defaultGlobalContext,

    labels: labelsMockData,

    isLoading: false,

    groups: groupsMockData,
    years: yearsMockData,

    group: groupsMockData[0].id,
    month: 1,
    year: 2020
};
