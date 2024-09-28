import "reflect-metadata";

import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";

import { BadRequestResponse } from "../../../../src/server/crosscutting/common/responses/bad-request.response.class";
import { InternalErrorResponse } from "../../../../src/server/crosscutting/common/responses/internal-error.response.class";
import { MemoryDatabaseService } from "../../../../src/server/crosscutting/database/services/memory-database.service";
import { FolderController } from "../../../../src/server/folder/controllers/folder.controller";
import { IFolderAPI } from "../../../../src/server/folder/interfaces/folder-api.interface";
import { IFolderModel } from "../../../../src/server/folder/interfaces/folder-model.interface";
import { FolderRepository } from "../../../../src/server/folder/repository/folder.repository";
import { FolderService } from "../../../../src/server/folder/services/folder.service";
import { NotFoundResponse } from "../../../../src/server/crosscutting/common/responses/not-found.response.class";

describe('FolderController', () => {

    describe('FolderController constructor', () => {
        it('it should instance', () => {
            let instance: FolderController | Error;

            try {
                const database = new MemoryDatabaseService<IFolderModel>();
                const repository = new FolderRepository(database);
                const service = new FolderService(repository);

                instance = new FolderController(service);
            } catch (e) {
                instance = e as Error;
            }

            assert.equal(instance instanceof FolderController, true);
        });
    });

    describe('FolderController handlers', () => {
        let controller: FolderController;

        beforeEach(async () => {
            const database = new MemoryDatabaseService<IFolderModel>();
            await database.connection.open();
            const repository = new FolderRepository(database);
            const service = new FolderService(repository);

            controller = new FolderController(service);
        });

        describe('FolderController create', () => {
            it('should throw a bad request error if name is not provided', async () => {
                let response: IFolderAPI | BadRequestResponse;

                try {
                    response = await controller.create({ body: { } } as any, {} as any);
                } catch (e) {
                    response = e as BadRequestResponse;
                }

                const replied = (response as BadRequestResponse).reply() as { code: number, response: string };

                assert.equal(response instanceof BadRequestResponse, true);
                assert.equal(replied.code, 400);
                assert.equal(replied.response, 'Bad request: Property "name" is required');
            });

            it('should throw an error if parent folder is not found', async () => {
                let response: IFolderAPI | InternalErrorResponse;

                try {
                    response = await controller.create({ body: { name: 'test', description: 'test', parentId: 1, ownerId: 1 } } as any, { user: { sub: 1234 } } as any);
                } catch (e) {
                    response = e as InternalErrorResponse;
                }

                const replied = (response as InternalErrorResponse).reply() as { code: number, response: string };

                assert.equal(response instanceof InternalErrorResponse, true);
                assert.equal(replied.code, 500);
                assert.equal(replied.response, 'Internal server error: Parent folder not found');
            });

            it('should create a folder without parent', async () => {

                const body = { name: 'test', description: 'test', ownerId: 1 };
                const request = { body } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const folder = await controller.create(request, context);

                assert.equal(folder.name, 'test');
                assert.equal(folder.description, 'test');
                assert.equal(folder.parent, undefined);
                assert.equal(folder.owner, '1234-test');
            });
        });

        describe('FolderController list', () => {
            it('should return a list of folders', async () => {
                const request = { params: {} } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const folders = await controller.list(request, context);

                assert.equal(folders.length, 0);
            });

            it('should create a folder and return it', async () => {
                const body = { name: 'test', description: 'test', ownerId: 1 };
                const request = { body } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const folderCreated = await controller.create(request, context);

                const folders = await controller.list(request, context);
                const [ folderListed ] = folders;

                assert.equal(folders.length, 1);
                assert.equal(folderListed.name, folderCreated.name);
                assert.equal(folderListed.description, folderCreated.description);
                assert.equal(folderListed.owner, '1234-test');
            });
        });

        describe('FolderController get', () => {
            it('should throw a bad request error if uuid is not provided', async () => {
                let response: IFolderAPI | BadRequestResponse;

                try {
                    response = await controller.get({ params: {} } as any, { user: { sub: 1234 } } as any);
                } catch (e) {
                    response = e as BadRequestResponse;
                }

                const replied = (response as BadRequestResponse).reply() as { code: number, response: string };

                assert.equal(response instanceof BadRequestResponse, true);
                assert.equal(replied.code, 400);
                assert.equal(replied.response, 'Bad request: Property "uuid" is required');
            });

            it('should throw an error if folder is not found', async () => {
                let response: IFolderAPI | BadRequestResponse;

                try {
                    response = await controller.get({ params: { uuid: 1 } } as any, { user: { sub: 1234 } } as any);
                } catch (e) {
                    response = e as BadRequestResponse;
                }

                const replied = (response as BadRequestResponse).reply() as { code: number, response: string };

                assert.equal(response instanceof NotFoundResponse, true);
                assert.equal(replied.code, 404);
                assert.equal(replied.response, 'Not found: Record not found');
            });

            it('should get a folder', async () => {
                const body = { name: 'test', description: 'test', ownerId: 1 };
                const request = { body } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const folderCreated = await controller.create(request, context);
                const folder = await controller.get({ params: { uuid: folderCreated.uuid } } as any, context);

                assert.equal(folder.name, folderCreated.name);
                assert.equal(folder.description, folderCreated.description);
                assert.equal(folder.owner, '1234-test');
            });
        });
    });
});