import assert from "node:assert";

import { When, Then, Given } from "@cucumber/cucumber";

import { SetAuthAction } from "../../../src/server/auth/actions/set-auth.action";

import { App } from '../../../src/server/app';
import { PhotronAPIClient } from '../../../src/package';

process.env.PORT = "0";

const app = new App();
// Mock auth action
const authAction = new SetAuthAction({
    status: async (access_token: string) => {
        return {
            name: access_token,
            sub: Math.random()
        };
    }
} as any);
// Desactivate the auth action
app.server.request.before.remove(authAction.execute);
// Add the auth action
app.server.request.before.add(authAction);

const client = new PhotronAPIClient(`http://localhost:${app.server.port}`);

client.auth.set('access_token');
let request: ReturnType<PhotronAPIClient["folders"]["create"]>;
let response: Awaited<typeof request>;

Given("I perform a post to {string} with name {string} and description {string}", (path, name, description) => {
    request = client.folders.create({ name, description });
    assert.equal(request instanceof Promise, true);
});
When("response is replied from the server with folder", async () => {
    try {
        response = await request;
    } catch(e) {
        console.warn('Error fetching: ', e);
    }
});

Then("it should return a {string} code and the folder created with name {string} and description {string}", (expectedCode, name, description) => {
    assert.equal(response.response.status, expectedCode);
    assert.equal(response.data?.code, expectedCode);
    assert.equal(response.data?.response.name, name);
    assert.equal(response.data?.response.description, description);
    app.server.close();
});
