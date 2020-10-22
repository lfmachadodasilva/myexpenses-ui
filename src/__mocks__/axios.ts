// easier to merge objects
import { assignIn } from 'lodash';

// cannot require axios, otherwise it recursively mocks
import axios from 'axios';

jest.unmock('axios');

import MockAdapter from 'axios-mock-adapter';
export const mockAxios = new MockAdapter(axios);

// nothing important seems to be overwritten
module.exports = assignIn(axios, mockAxios);

export default {
    get: jest.fn().mockResolvedValue({ data: {} }),
    post: jest.fn().mockResolvedValue({ data: {} }),
    delete: jest.fn().mockResolvedValue({ data: {} }),
    put: jest.fn().mockResolvedValue({ data: {} })
};
