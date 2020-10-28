import config, { Options } from 'react-global-configuration';

import { getValueOrDefault } from '../helpers/util';
import { ConfigModel } from '../models/config';

export class ConfigManager {
    static set = (configurationSettings: ConfigModel) => {
        config.set({ ApplicationConfiguration: configurationSettings }, { freeze: false } as Options);
    };

    static get(): ConfigModel {
        const configurationObject = config.get('ApplicationConfiguration');

        const configurationSettings = new ConfigModel();
        Object.assign(configurationSettings, configurationObject);

        return configurationSettings;
    }
}

export const setConfiguration = (overrides: Partial<ConfigModel> = {}): ConfigModel => {
    let configDefault: ConfigModel = new ConfigModel();

    configDefault = {
        ...configDefault,
        buildVersion: getValueOrDefault(
            process.env.REACT_APP_BUILD_VERSION,
            overrides.buildVersion,
            configDefault.buildVersion
        ),
        apiUrl: getValueOrDefault(process.env.REACT_APP_API_URL, overrides.apiUrl, configDefault.apiUrl),
        useHashRouter:
            getValueOrDefault(
                process.env.REACT_APP_USE_HASH_ROUTER,
                overrides?.useHashRouter?.toString(),
                configDefault.useHashRouter.toString()
            ) === 'true'
    };

    ConfigManager.set({ ...configDefault, ...overrides });

    return ConfigManager.get();
};
