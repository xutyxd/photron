import { inject, injectable } from "inversify";
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from "server-over-express";
import { RedirectResponse } from "../crosscutting/common/responses/redirect-response.class";
import { AuthService } from "./services/auth.service";

@injectable()
export class AuthController implements IHTTPController {
    public path = 'auth';
    public handlers: IHTTPControllerHandler<unknown>[];

    constructor(@inject(AuthService) private readonly authService: AuthService) {
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

    public authenticate(request: HTTPRequest, context: IHTTPContextData) {

        let result: RedirectResponse;
        
        try {
            const url = this.authService.authenticate();

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
            const credentials = await this.authService.callback(code);

            context.cookies.set('access_token', credentials.access_token, { signed: true, maxAge: 3600 * 24 * 7, httpOnly: true });
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
            result = context.user;
        } catch (error) {
            console.log('Error: ', error);
            throw new Error('Error trying to authenticate with Google');
        }
        
        return result;
    }
}