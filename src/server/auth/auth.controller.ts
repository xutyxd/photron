import { OAuth2Client } from "google-auth-library";
import { inject, injectable } from "inversify";
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from "server-over-express";
import { ConfigurationService } from "../configuration/services/configuration.service";
import { RedirectResponse } from "../crosscutting/responses/redirect-response.class";

@injectable()
export class AuthController implements IHTTPController {
    public path = 'auth';
    public handlers: IHTTPControllerHandler<unknown>[];

    constructor(@inject(ConfigurationService) private readonly configurationService: ConfigurationService) {
        this.handlers = [
            {
                path: { method: HttpMethodEnum.GET, relative: 'google' },
                action: this.authenticate.bind(this)
            },
            {
                path: { method: HttpMethodEnum.GET, relative: 'google/callback' },
                action: this.callback.bind(this)
            },
            {
                path: { method: HttpMethodEnum.GET, relative: 'status' },
                action: this.status.bind(this)
            }
        ]
    }

    private getClient() {
        const keys = this.configurationService.keys.oauth;
        const oAuth2Client = new OAuth2Client(
            keys.web.client_id,
            keys.web.client_secret,
            keys.web.redirect_uris[0]
        );

        return oAuth2Client;
    }

    public authenticate(request: HTTPRequest, context: IHTTPContextData) {

        let result: RedirectResponse;
        
        try {
            const client = this.getClient();
            const url = client.generateAuthUrl({
                access_type: 'offline',
                scope: ['openid', 'email', 'profile'],
            });

            result = new RedirectResponse(url, context);
        } catch (error) {
            console.log('Error: ', error);
            throw new Error('Error trying to authenticate with Google');
        }

        return result;
    }

    public async callback(request: HTTPRequest, context: IHTTPContextData) {

        let result: RedirectResponse;

        try {
            // Get the code from the request
            const code = request.query.code as string;
            const client = this.getClient();
            // Get the token
            const response = await client.getToken(code);

            client.setCredentials(response.tokens);
            const userinfo = await client.request({
                url: 'https://www.googleapis.com/oauth2/v3/userinfo',
                params: {
                    access_token: response.tokens.access_token,
                },
            });

            context.cookies.set('access_token', response.tokens.access_token, { signed: true, maxAge: 3600 * 24 * 7, httpOnly: true });
            result = new RedirectResponse('http://localhost:4200', context);
        } catch (error) {
            console.log('Error: ', error);
            throw new Error('Error trying to authenticate with Google');
        }

        return result;
    }

    public async status(request: HTTPRequest, context: IHTTPContextData) {
        
        let result;

        try {
            const client = this.getClient();
            const access_token = context.cookies.get('access_token');

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