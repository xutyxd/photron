
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
        create: async (data: { name: string, description: string, parentId?: number }) => {
            return this.client.POST('/folders', { body: data });
        },
        list: async () => {
            return this.client.GET('/folders');
        },
        get: async (id: IFolder['id']) => {
            return this.client.GET('/folders/{id}', { params: { query: { id } } });
        },
        update: async (id: IFolder['id'], body: Partial<IFolder>) => {
            return this.client.PATCH('/folders/{id}', { params: { query: { id }, body } });
        },
        delete: async (id: IFolder['id']) => {
            return this.client.DELETE(`/folders/{id}`, { params: { query: { id } } });
        }
    }
}