import "reflect-metadata";

import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";

import { IHTTPContextData } from "server-over-express";

import { SetAuthAction } from "../../../../src/server/auth/actions/set-auth.action";
import { AuthService } from "../../../../src/server/auth/services/auth.service";
import { ConfigurationService } from "../../../../src/server/configuration/services/configuration.service";
import { Response } from "../../../../src/server/crosscutting/common/responses/response.class";

describe('SetAuthAction', () => {

    describe('SetAuthAction constructor', () => {
        it('it should instance', () => {
            let instance: SetAuthAction | Error;

            try {
                instance = new SetAuthAction(new AuthService(new ConfigurationService()));
            } catch (e) {
                instance = e as Error;
            }

            assert.equal(instance instanceof SetAuthAction, true);
        });
    });

    describe('SetAuthAction execute', () => {
        let setAuthAction: SetAuthAction;
        let context: IHTTPContextData;

        beforeEach(() => {
            const configurationService = new ConfigurationService();
            const authService = new AuthService(configurationService);
            setAuthAction = new SetAuthAction(authService);

            context = {
                code: 200,
                headers: [],
                cookies: {
                    get: () => {
                        return 'access_token';
                    }
                }
            } as unknown as IHTTPContextData;
        });

        it('should throw an unauthorized error', async () => {
            context.headers = [];

            let response: Response = new Response(undefined, context);
            try {
                context.cookies.get = () => {
                    return undefined;
                }

                await setAuthAction.execute({} as any, context);
            } catch (e) {
                response = e as Response;
            }

            const replied = response.reply() as { code: number, response: string };

            assert.equal(response instanceof Response, true);
            assert.equal(replied.code, 401);
            assert.equal(replied.response, 'Unauthorized: Authorization header not found');
        });

        it('should get user from authorization header', async () => {
            context.headers = [
                {
                    key: 'Authorization',
                    value: 'Bearer access_token'
                }
            ];

            let response: Response = new Response(undefined, context);
            try {
                setAuthAction['authService'].status = async (token: string) => {
                    return {
                        uuid: 'access_token',
                        name: token,
                        picture: '',
                        email: ''
                    };
                }

                await setAuthAction.execute({} as any, context);
            } catch (e) {
                response = e as Response;
            }

            const replied = response.reply() as { code: number, response: string };

            assert.equal(response instanceof Response, true);
            assert.equal(replied.code, 200);
            assert.equal(context.user.name, 'access_token');
        });

        it('should get user from cookies', async () => {
            context.headers = [];
            context.cookies.get = () => {
                return 'access_token';
            }

            let response: Response = new Response(undefined, context);
            try {
                setAuthAction['authService'].status = async (token: string) => {
                    return {
                        uuid: 'access_token',
                        name: token,
                        picture: '',
                        email: ''
                    };
                }

                await setAuthAction.execute({} as any, context);
            } catch (e) {
                response = e as Response;
            }

            const replied = response.reply() as { code: number};

            assert.equal(response instanceof Response, true);
            assert.equal(replied.code, 200);
            assert.equal(context.user.name, 'access_token');
        });
    });
});