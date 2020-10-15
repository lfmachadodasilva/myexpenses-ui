import axios from 'axios';

const axiosMock = (axios as any) as {
    get: jest.Mock;
    post: jest.Mock;
    delete: jest.Mock;
    put: jest.Mock;
};

type AxiosMockParams = { url: string; returnValue: any; isError?: boolean };

export class AxiosMock {
    private mockedGetEndpoints: AxiosMockParams[] = [];
    private mockedPostEndpoints: AxiosMockParams[] = [];
    private mockedDeleteEndpoints: AxiosMockParams[] = [];
    private mockedPutEndpoints: AxiosMockParams[] = [];

    constructor() {
        axiosMock.post.mockImplementation((...args) => this.mockThisImplementation(this.mockedPostEndpoints, args[0]));

        axiosMock.get.mockImplementation((...args) => this.mockThisImplementation(this.mockedGetEndpoints, args[0]));

        axiosMock.delete.mockImplementation((...args) =>
            this.mockThisImplementation(this.mockedDeleteEndpoints, args[0])
        );

        axiosMock.put.mockImplementation((...args) => this.mockThisImplementation(this.mockedPutEndpoints, args[0]));
    }

    public addPost(url: string, returnValue: any = {}, isError?: boolean) {
        const filtered = this.mockedPostEndpoints.filter(endpoint => {
            return endpoint.url !== url;
        });

        this.mockedPostEndpoints = [...filtered, { url, returnValue, isError }];
    }

    public addGet(url: string, returnValue: any = {}, isError?: boolean) {
        const filtered = this.mockedGetEndpoints.filter(endpoint => {
            return endpoint.url !== url;
        });

        this.mockedGetEndpoints = [...filtered, { url, returnValue, isError }];
    }

    public addDelete(url: string, returnValue: any = {}, isError?: boolean) {
        const filtered = this.mockedDeleteEndpoints.filter(endpoint => {
            return endpoint.url !== url;
        });

        this.mockedDeleteEndpoints = [...filtered, { url, returnValue, isError }];
    }

    public addPut(url: string, returnValue: any = {}, isError?: boolean) {
        const filtered = this.mockedPutEndpoints.filter(endpoint => {
            return endpoint.url !== url;
        });

        this.mockedPutEndpoints = [...filtered, { url, returnValue, isError }];
    }

    public getPostMock(): jest.Mock {
        return axiosMock.post;
    }

    public getGetMock(): jest.Mock {
        return axiosMock.get;
    }

    public getDeleteMock(): jest.Mock {
        return axiosMock.delete;
    }

    public getPutMock(): jest.Mock {
        return axiosMock.put;
    }

    public clearMocks() {
        this.getPostMock().mockClear();
        this.getGetMock().mockClear();
        this.getDeleteMock().mockClear();
        this.getPutMock().mockClear();
    }

    public resetMocks() {
        this.clearMocks();
        this.mockedPostEndpoints = [];
        this.mockedGetEndpoints = [];
        this.mockedDeleteEndpoints = [];
        this.mockedPutEndpoints = [];
    }

    private mockThisImplementation = (mockedEndPoints: AxiosMockParams[], url: string): Promise<any> => {
        const match = mockedEndPoints.find(endpoint => {
            return endpoint.url === url;
        });

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (match) {
                    if (match.isError) {
                        return reject(match.returnValue);
                    }
                    return resolve({
                        data: match.returnValue
                    });
                }
                return reject(`axios mock did not find url ${url}`);
            });
        });
    };
}
