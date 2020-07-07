import {
    render,
    act,
    RenderResult,
    waitForDomChange,
    cleanup,
    Matcher,
    SelectorMatcherOptions
} from '@testing-library/react';

export abstract class BaseTestTool {
    protected wrapper!: RenderResult;
    protected getByText(text: Matcher, options?: SelectorMatcherOptions) {
        return this.wrapper.getByText(text, options);
    }
    protected getAllByText(text: Matcher, options?: SelectorMatcherOptions) {
        return this.wrapper.getAllByText(text, options);
    }
    protected queryByText(text: Matcher, options?: SelectorMatcherOptions) {
        return this.wrapper.queryByText(text, options);
    }
    protected querySelector(selector: string) {
        return this.wrapper.baseElement.querySelector(selector);
    }
    protected queryAllSelector(selector: string) {
        return this.wrapper.baseElement.querySelectorAll(selector);
    }
    protected getByTestId(text: Matcher, options?: SelectorMatcherOptions) {
        return this.wrapper.getByTestId(text, options);
    }
    protected queryByTestId(text: Matcher, options?: SelectorMatcherOptions) {
        return this.wrapper.queryByTestId(text, options);
    }
    protected queryByLabelText(text: Matcher, options?: SelectorMatcherOptions) {
        return this.wrapper.queryByLabelText(text, options);
    }
}

export abstract class BasePage<T> extends BaseTestTool {
    protected wrapper!: RenderResult;

    abstract defaultParams: Partial<T>;

    async initialiseComponent(props: Partial<T> = {}) {
        const fullProps = this.setupParams(props);
        this.wrapper = await this.renderComponent(fullProps);
        this.initialiseSubComponents();
    }

    initialiseWithParentComponent(wrapper: RenderResult) {
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

    private async renderComponent(props: Partial<T>) {
        cleanup(); // Ensures the document body is clean before a render
        let component!: RenderResult;

        // Because the configContextProvider makes use of the useEffect hook
        // the render isnt finished until the effect has completed. As a result
        // we must wait the render

        // eslint-disable-next-line @typescript-eslint/require-await
        await act(async () => {
            component = render(this.render(props));
        });

        return component;
    }

    private setupParams(paramOverrides: Partial<T> = {}) {
        const params: Partial<T> = { ...this.defaultParams, ...paramOverrides };

        return params;
    }

    protected abstract render(props: Partial<T>): React.ReactElement;
    protected abstract initialiseSubComponents(): void;
}
