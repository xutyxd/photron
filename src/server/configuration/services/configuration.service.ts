
import { injectable } from 'inversify';

@injectable()
export class ConfigurationService {

    private KEYS: { [K in 'oauth' | 'cookies' ]?: object };

    public keys = {
        cookies: () => {
            return structuredClone(this.KEYS.cookies || []);
        },
        oauth: () => {
            return structuredClone(this.KEYS.oauth || { });
        }
    }

    constructor() {
        this.KEYS = {
            oauth: this.load('OAUTH2_KEYS'),
            cookies: this.load('COOKIES_KEYS')
        };
    }

    private load(keys: string): object | undefined {
        let result: object | undefined;

        try {

            const env = process.env[keys];

            if (env) {
                result = JSON.parse(env);
            }
        } catch {
            result = undefined;
        }

        return result;
    }
}