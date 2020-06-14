import { AppConfig } from './appConfig';
import config, { Options } from 'react-global-configuration';

export class ConfigurationManager {
    static set = (configurationSettings: AppConfig) => {
        config.set({ ApplicationConfiguration: configurationSettings }, { freeze: false } as Options);
    };

    static get(): AppConfig {
        const configurationObject = config.get('ApplicationConfiguration');

        const configurationSettings = new AppConfig();
        Object.assign(configurationSettings, configurationObject);

        return configurationSettings;
    }
}

export const setConfiguration = (overrides: Partial<AppConfig> = {}) => {
    let configDefault: AppConfig = new AppConfig();
    try {
        // read from the config json file
        configDefault = require('../config.json');
    } catch {
        // use default configuration
        configDefault = new AppConfig();
    }

    ConfigurationManager.set({ ...configDefault, ...overrides });
};
