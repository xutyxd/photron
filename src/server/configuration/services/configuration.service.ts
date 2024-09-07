
import { injectable } from 'inversify';

import cookies from '../cookies.keys.json';
import oauth from '../oauth2.keys.json';

@injectable()
export class ConfigurationService {

    constructor() { }

    public keys = {
        get cookies() {
            return cookies;
        },
        get oauth() {
            return oauth;
        }
    }
}