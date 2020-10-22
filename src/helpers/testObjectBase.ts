import {
    render,
    act,
    RenderResult,
    waitForDomChange,
    cleanup,
    Matcher,
    SelectorMatcherOptions,
    fireEvent
} from '@testing-library/react';

export abstract class BaseTestTool {
    protected wrapper!: RenderResult;
    getByText(text: Matcher, options?: SelectorMatcherOptions) {
        return this.wrapper.getByText(text, options);
    }
    clickByText(text: Matcher, options?: SelectorMatcherOptions) {
        const item = this.getByText(text, options);
        fireEvent.click(item as Element);
        return item;
    }
    getAllByText(text: Matcher, options?: SelectorMatcherOptions) {
        return this.wrapper.getAllByText(text, options);
    }
    queryByText(text: Matcher, options?: SelectorMatcherOptions) {
        return this.wrapper.queryByText(text, options);
    }
    querySelector(selector: string) {
        return this.wrapper.baseElement.querySelector(selector);
    }
    queryAllSelector(selector: string) {
        return this.wrapper.baseElement.querySelectorAll(selector);
    }
    getByTestId(text: Matcher, options?: SelectorMatcherOptions) {
        return this.wrapper.getByTestId(text, options);
    }
    queryByTestId(text: Matcher, options?: SelectorMatcherOptions) {
        return this.wrapper.queryByTestId(text, options);
    }
    queryByLabelText(text: Matcher, options?: SelectorMatcherOptions) {
        return this.wrapper.queryByLabelText(text, options);
    }
}

export abstract class TestObjectBase<T> extends BaseTestTool {
    protected wrapper!: RenderResult;

    abstract defaultParams: Partial<T>;

    async initialiseObject(props: Partial<T> = {}) {
        const fullProps = this.setupParams(props);
        this.wrapper = await this.renderObject(fullProps);
        this.initialiseSubObjects();
    }

    initialiseWithParentObject(wrapper: RenderResult) {
        this.wrapper = wrapper;
    }

    debug() {
        this.wrapper.debug();
    }

    async rerender(props: Partial<T> = {}) {
        await act(async () => {
            this.wrapper.rerender(this.render(props));
        });
    }

    async waitForDomChange() {
        await waitForDomChange(this.wrapper);
    }

    private async renderObject(props: Partial<T>) {
        cleanup(); // Ensures the document body is clean before a render
        let object!: RenderResult;

        // Because the configContextProvider makes use of the useEffect hook
        // the render isnt finished until the effect has completed. As a result
        // we must wait the render

        // eslint-disable-next-line @typescript-eslint/require-await
        await act(async () => {
            object = render(this.render(props));
        });

        return object;
    }

    private setupParams(paramOverrides: Partial<T> = {}) {
        const params: Partial<T> = { ...this.defaultParams, ...paramOverrides };

        return params;
    }

    protected abstract render(props: Partial<T>): React.ReactElement;
    protected abstract initialiseSubObjects(): void;
}
