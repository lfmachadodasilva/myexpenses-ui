import { AppConfig } from './appConfig';
import config, { Options } from 'react-global-configuration';

import { getValueOrDefault } from '../helpers/utilHelper';

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
    // try {
    //     // read from the config json file
    //     configDefault = require('../config.json');
    // } catch {
    //     // use default configuration
    //     configDefault = new AppConfig();
    // }

    configDefault = {
        ...configDefault,
        buildVersion: getValueOrDefault(
            process.env.REACT_APP_BUILD_VERSION,
            overrides.buildVersion,
            configDefault.buildVersion
        ),
        apiUrl: getValueOrDefault(process.env.REACT_APP_API_URL, overrides.apiUrl, configDefault.apiUrl)
    };

    ConfigurationManager.set({ ...configDefault, ...overrides });
};
