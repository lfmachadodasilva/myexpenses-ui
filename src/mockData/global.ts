import { GlobalContext } from '../contexts/global';
import { yearsMockData } from './expense';
import { groupsMockData } from './group';

export const globalMockData: GlobalContext = {
    isLoading: false,

    groups: groupsMockData,
    years: yearsMockData,

    group: groupsMockData[0].id,
    month: 1,
    year: 2020
};
