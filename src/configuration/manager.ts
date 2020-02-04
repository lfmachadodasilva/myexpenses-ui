import { AppConfig } from './app-config';
import config, { Options } from 'react-global-configuration';

/**
 * Loads and saves application configuration.
 */
export class ConfigurationManager {
    /**
     * Update the application configuration shared across all component.
     */
    public static set = (configurationSettings: AppConfig) => {
        config.set({ ApplicationConfiguration: configurationSettings }, { freeze: false } as Options);
    };

    /**
     * Gets the application configuration shared across all component.
     */
    public static get(): AppConfig {
        const configurationObject = config.get('ApplicationConfiguration');

        // The object we get back is just a JSON object, we use Object.assign here to make it an
        // actual AppConfig object rather than just using duck typing.  If we don't do this any properties
        // that are only part of the typescript version (For example ones that are calculated based
        // on other simple properties) will not be set.
        const configurationSettings = new AppConfig();
        Object.assign(configurationSettings, configurationObject);

        return configurationSettings;
    }
}
