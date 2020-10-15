import { wait } from '@testing-library/react';
import { setConfiguration } from '../../configurations/configManager';
import { ExpenseProps } from './expense';
import { ExpenseTestObject } from './expense.testObject';

async function defaultInitialise(props: Partial<ExpenseProps> = {}) {
    const obj = new ExpenseTestObject();
    await obj.initialiseObject(props);

    return obj;
}

describe('<ExpensePage />', () => {
    beforeEach(() => {
        setConfiguration();
    });

    test('should render', async () => {
        const obj = await defaultInitialise();

        expect(obj).toBeDefined();
    });
});
