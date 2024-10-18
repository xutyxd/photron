import { inject, injectable } from "inversify";
import { HTTPRequest, IHTTPContextData, IHTTPIntermediateAction } from "server-over-express";
import { UnauthorizedResponse } from "../../crosscutting/common/responses/unauthorized.response.class";
import { AuthService } from "../services/auth.service";
import { authPaths } from "../consts/auth-path.const";

@injectable()
export class SetAuthAction implements IHTTPIntermediateAction {

    public paths = authPaths;

    constructor(@inject(AuthService) private readonly authService: AuthService) { }

    public async execute(request: HTTPRequest, context: IHTTPContextData): Promise<Error | void>{
        // Get the cookies and headers from the context
        const { cookies, headers } = context;
        
        // Get authorization from headers
        let authorization = headers.find(({ key }) => key.toLowerCase() === 'authorization')?.value;

        if (authorization) {
            authorization = authorization.replace('Bearer ', '');
        }
        // Check if empty to get from cookies
        if (!authorization) {
            authorization = cookies.get('access_token');
        }
        // Throw an error if authorization header is not found
        if (!authorization) {
            // Throw an error with message "Authorization header not found"
            throw new UnauthorizedResponse('Authorization header not found', context);
        }
        // Get user information from the authorization
        const userinfo = await this.authService.status(authorization);
        // Set on context
        context.user = userinfo;
        return;
    }
}