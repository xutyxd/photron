import "reflect-metadata";

import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";

import { BadRequestResponse, InternalErrorResponse, NotFoundResponse } from "../../../../src/server/crosscutting/common/responses";
import { MemoryDatabaseService } from "../../../../src/server/crosscutting/database/services/memory-database.service";
import { TagController } from "../../../../src/server/tag/controllers/tag.controller";
import { ITagAPI } from "../../../../src/server/tag/interfaces/tag-api.interface";
import { ITagModel } from "../../../../src/server/tag/interfaces/tag-model.interface";
import { TagRepository } from "../../../../src/server/tag/repository/tag.repository";
import { TagService } from "../../../../src/server/tag/services/tag.service";

describe('TagController', () => {

    describe('TagController constructor', () => {
        it('it should instance', () => {
            let instance: TagController | Error;

            try {
                const database = new MemoryDatabaseService<ITagModel>();
                const repository = new TagRepository(database);
                const service = new TagService(repository);

                instance = new TagController(service);
            } catch (e) {
                instance = e as Error;
            }

            assert.equal(instance instanceof TagController, true);
        });
    });

    describe('TagController handlers', () => {
        let controller: TagController;

        beforeEach(async () => {
            const database = new MemoryDatabaseService<ITagModel>();
            await database.connection.open();
            const repository = new TagRepository(database);
            const service = new TagService(repository);

            controller = new TagController(service);
        });

        describe('TagController create', () => {
            it('should throw a bad request error if name is not provided', async () => {
                let response: ITagAPI | BadRequestResponse;

                try {
                    response = await controller.create({ body: { } } as any, {} as any);
                } catch (e) {
                    response = e as BadRequestResponse;
                }

                const replied = (response as BadRequestResponse).reply() as { code: number, response: string };

                assert.equal(response instanceof BadRequestResponse, true);
                assert.equal(replied.code, 400);
                assert.equal(replied.response, "Bad request: must have required property 'name'");
            });
        });

        describe('TagController list', () => {
            it('should return a list of tags', async () => {
                const request = { params: {} } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const tags = await controller.list(request, context);

                assert.equal(tags.length, 0);
            });

            it('should create a tag and return it', async () => {
                const body = { name: 'test', description: 'test' };
                const request = { body } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const tagCreated = await controller.create(request, context);

                const tags = await controller.list(request, context);
                const [ tagListed ] = tags;

                assert.equal(tags.length, 1);
                assert.equal(tagListed.name, tagCreated.name);
                assert.equal(tagListed.description, tagCreated.description);
                assert.equal(tagListed.owner, '1234-test');
            });
        });

        describe('TagController get', () => {
            it('should throw a bad request error if uuid is not provided', async () => {
                let response: ITagAPI | BadRequestResponse;

                try {
                    response = await controller.get({ params: {} } as any, { user: { sub: 1234 } } as any);
                } catch (e) {
                    response = e as BadRequestResponse;
                }

                const replied = (response as BadRequestResponse).reply() as { code: number, response: string };

                assert.equal(response instanceof BadRequestResponse, true);
                assert.equal(replied.code, 400);
                assert.equal(replied.response, "Bad request: must have required property 'uuid'");
            });

            it('should throw an error if tag is not found', async () => {
                let response: ITagAPI | NotFoundResponse;

                try {
                    response = await controller.get({ params: { uuid: 'test' } } as any, { user: { sub: 1234 } } as any);
                } catch (e) {
                    response = e as NotFoundResponse;
                }

                const replied = (response as BadRequestResponse).reply() as { code: number, response: string };

                assert.equal(response instanceof NotFoundResponse, true);
                assert.equal(replied.code, 404);
                assert.equal(replied.response, 'Not found: Record not found');
            });

            it('should get a tag', async () => {
                const body = { name: 'test', description: 'test', color: 'test' };
                const request = { body } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const tagCreated = await controller.create(request, context);
                const tag = await controller.get({ params: { uuid: tagCreated.uuid } } as any, context);

                assert.equal(tag.name, tagCreated.name);
                assert.equal(tag.description, tagCreated.description);
                assert.equal(tag.color, tagCreated.color);
                assert.equal(tag.owner, '1234-test');
            });
        });

        describe('TagController update', () => {
            it('should throw a bad request error if uuid is not provided', async () => {
                let response: ITagAPI | BadRequestResponse;

                const request = { params: { uuid: undefined }, body: { } } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;
                try {
                    response = await controller.update(request, context);
                } catch (e) {
                    response = e as BadRequestResponse;
                }

                const replied = (response as BadRequestResponse).reply() as { code: number, response: string };

                assert.equal(response instanceof BadRequestResponse, true);
                assert.equal(replied.code, 400);
                assert.equal(replied.response, "Bad request: must have required property 'uuid'");
            });

            it('should throw an error if tag is not found', async () => {
                let response: ITagAPI | NotFoundResponse;

                const request = { params: { uuid: 'test' }, body: { } } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                try {
                    response = await controller.update(request, context);
                } catch (e) {
                    response = e as NotFoundResponse;
                }
                console.log('Response: ', response);
                const replied = (response as NotFoundResponse).reply() as { code: number, response: string };

                assert.equal(response instanceof NotFoundResponse, true);
                assert.equal(replied.code, 404);
                assert.equal(replied.response, 'Not found: Record not found');
            });

            it('should update a tag', async () => {
                const body = { name: 'test', description: 'test', color: 'test' };
                const request = { body } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const tagCreated = await controller.create(request, context);
                const tag = await controller.update({ params: { uuid: tagCreated.uuid }, ...request }, context);

                assert.equal(tag.name, tagCreated.name);
                assert.equal(tag.description, tagCreated.description);
                assert.equal(tag.color, tagCreated.color);
                assert.equal(tag.owner, '1234-test');
            });
        });

        describe('TagController delete', () => {
            it('should throw a bad request error if uuid is not provided', async () => {
                let response: ITagAPI | BadRequestResponse;

                try {
                    response = await controller.delete({ params: {} } as any, { user: { sub: 1234 } } as any);
                } catch (e) {
                    response = e as BadRequestResponse;
                }

                const replied = (response as BadRequestResponse).reply() as { code: number, response: string };

                assert.equal(response instanceof BadRequestResponse, true);
                assert.equal(replied.code, 400);
                assert.equal(replied.response, "Bad request: must have required property 'uuid'");
            });

            it('should throw an error if tag is not found', async () => {
                let response: ITagAPI | NotFoundResponse;

                const request = { params: { uuid: 'test' } } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                try {
                    response = await controller.delete(request, context);
                } catch (e) {
                    response = e as NotFoundResponse;
                }

                const replied = (response as NotFoundResponse).reply() as { code: number, response: string };

                assert.equal(response instanceof NotFoundResponse, true);
                assert.equal(replied.code, 404);
                assert.equal(replied.response, 'Not found: Record not found');
            });

            it('should delete a tag', async () => {
                const body = { name: 'test', description: 'test', color: 'test' };
                const request = { body } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const tagCreated = await controller.create(request, context);
                const tag = await controller.delete({ params: { uuid: tagCreated.uuid } } as any, context);

                assert.equal(tag.name, tagCreated.name);
                assert.equal(tag.description, tagCreated.description);
                assert.equal(tag.color, tagCreated.color);
                assert.equal(tag.owner, '1234-test');
            });
        });
    });
});