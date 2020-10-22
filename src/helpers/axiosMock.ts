import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export class AxiosMock extends MockAdapter {
    getSpy = jest.spyOn(axios, 'get');
    postSpy = jest.spyOn(axios, 'post');
    putSpy = jest.spyOn(axios, 'put');
    deleteSpy = jest.spyOn(axios, 'delete');

    constructor() {
        super(axios);
    }

    mockClearSpy() {
        this.getSpy.mockClear();
        this.postSpy.mockClear();
        this.putSpy.mockClear();
        this.deleteSpy.mockClear();
    }
}
