
import createClient, { Middleware } from "openapi-fetch";
import type { paths, components } from "../openapi/specification";

type IFolder = components['schemas']['IFolder'];
export class PhotronAPIClient {

    private client: ReturnType<typeof createClient<paths>>
    private authentication?: string;

    constructor(baseUrl: string) {
        this.client = createClient<paths>({ baseUrl, headers: { Bearer: 'access_token' } });
        this.client.use(this.authenticate);
    }

    private authenticate: Middleware = {
        onRequest: ({ request }) => {
            if (this.authentication) {
                request.headers.set('Authorization', `Bearer ${this.authentication}`);
            }

            return request;
        }
    }

    public auth = {
        set: (access_token: string) => {
            this.authentication = access_token;
        },
        get: () => {
            return this.authentication;
        }
    }

    public healthCheck() {
        return this.client.GET('/health-check');
    }

    public folders = {
        create: async (data: { name: string, description: string, parentIndex?: string }) => {
            return this.client.POST('/folders', { body: data });
        },
        list: async () => {
            return this.client.GET('/folders');
        },
        get: async (uuid: IFolder['uuid']) => {
            return this.client.GET('/folders/{uuid}', { params: { path: { uuid } } });
        },
        update: async (uuid: IFolder['uuid'], body: Partial<IFolder>) => {
            return this.client.PATCH('/folders/{uuid}', { params: { path: { uuid }, body } });
        },
        delete: async (uuid: IFolder['uuid']) => {
            return this.client.DELETE(`/folders/{uuid}`, { params: { path: { uuid } } });
        }
    }
}