import { hasValue, getValueOrDefault } from './utilHelper';
import { AppConfig } from '../configurations/appConfig';

describe('utilHelper', () => {
    describe('hasValue', () => {
        test('valid value', () => {
            let value = hasValue('test');
            expect(value).toBe(true);

            value = hasValue(1);
            expect(value).toBe(true);

            value = hasValue(['test']);
            expect(value).toBe(true);

            value = hasValue(new AppConfig());
            expect(value).toBe(true);
        });

        test('invalid value', () => {
            let value = hasValue(null);
            expect(value).toBe(false);

            value = hasValue(undefined);
            expect(value).toBe(false);

            value = hasValue([]);
            expect(value).toBe(false);
        });
    });

    describe('getValueOrDefault', () => {
        test('valid single value', () => {
            const value = getValueOrDefault('test');
            expect(value).toBe('test');
        });

        test('valid second value', () => {
            let value = getValueOrDefault(null, 'test');
            expect(value).toBe('test');

            value = getValueOrDefault(null, 'test1', 'test2');
            expect(value).toBe('test1');
        });
    });
});
