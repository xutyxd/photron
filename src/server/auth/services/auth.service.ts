import { inject, injectable } from "inversify";
import { ConfigurationService } from "../../configuration/services/configuration.service";
import { Credentials, OAuth2Client } from "google-auth-library";

@injectable()
export class AuthService {

    constructor(@inject(ConfigurationService) private readonly configurationService: ConfigurationService) { }

    private getClient() {
        const keys = this.configurationService.keys.oauth;
        const oAuth2Client = new OAuth2Client(
            keys.web.client_id,
            keys.web.client_secret,
            keys.web.redirect_uris[0]
        );

        return oAuth2Client;
    }

    public authenticate() {

        let url: string;
        
        try {
            const client = this.getClient();
            url = client.generateAuthUrl({
                access_type: 'offline',
                scope: ['openid', 'email', 'profile'],
            });
        } catch (error) {
            console.log('Error: ', error);
            throw new Error('Error trying to authenticate with Google');
        }

        return url;
    }

    public async callback(code: string) {

        let result: Credentials;

        try {
            // Get the code from the request
            const client = this.getClient();
            // Get the token
            const response = await client.getToken(code);

            client.setCredentials(response.tokens);

            result = response.tokens;
        } catch (error) {
            console.log('Error: ', error);
            throw new Error('Error trying to authenticate with Google');
        }

        return result;
    }

    public async status(access_token: string) {
        
        let result;

        try {
            const client = this.getClient();

            client.setCredentials({ access_token });
            const userinfo = await client.request({
                url: 'https://www.googleapis.com/oauth2/v3/userinfo'
            });
    
            result = userinfo.data;
        } catch (error) {
            console.log('Error: ', error);
            throw new Error('Error trying to authenticate with Google');
        }
        
        return result;
    }
}