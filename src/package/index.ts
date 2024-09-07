
import createClient from "openapi-fetch";
import type { paths } from "../openapi/specification";

export class PhotronAPIClient {

    private client: ReturnType<typeof createClient<paths>>

    constructor(baseUrl: string) {
        this.client = createClient<paths>({ baseUrl });
    }

    public healthCheck() {
        return this.client.GET('/health-check');
    }
}