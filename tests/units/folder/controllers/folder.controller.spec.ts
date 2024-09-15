import "reflect-metadata";

import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";

import { FolderController } from "../../../../src/server/folder/controllers/folder.controller";
import { FolderRepository } from "../../../../src/server/folder/repository/folder.repository";
import { FolderService } from "../../../../src/server/folder/services/folder.service";
import { IDatabase } from "../../../../src/server/crosscutting/common/interfaces/database.interface";
import { IFolderModel } from "../../../../src/server/folder/interfaces/folder-model.interface";
import { MemoryDatabaseService } from "../../../../src/server/crosscutting/common/services/memory-database.service";
import { IFolder } from "../../../../src/server/folder/interfaces/folder.interface";
import { BadRequestResponse } from "../../../../src/server/crosscutting/common/responses/bad-request.response.class";

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
        let database: IDatabase<IFolderModel>;
        let repository: FolderRepository;
        let service: FolderService;

        beforeEach(async () => {
            const database = new MemoryDatabaseService<IFolderModel>();
            await database.connection.open();
            const repository = new FolderRepository(database);
            const service = new FolderService(repository);

            controller = new FolderController(service);
        });

        describe('FolderController create', () => {
            it('should throw a bad request error if name is not provided', async () => {
                let response: IFolder | BadRequestResponse;

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
                let response: IFolder | BadRequestResponse;

                try {
                    response = await controller.create({ body: { name: 'test', description: 'test', parentId: 1, ownerId: 1 } } as any, { user: { sub: 1234 } } as any);
                } catch (e) {
                    response = e as BadRequestResponse;
                }

                const replied = (response as BadRequestResponse).reply() as { code: number, response: string };

                assert.equal(response instanceof BadRequestResponse, true);
                assert.equal(replied.code, 400);
                assert.equal(replied.response, 'Bad request: Parent folder not found');
            });

            it('should create a folder without parent', async () => {

                const body = { name: 'test', description: 'test', ownerId: 1 };
                const request = { body } as any;
                const context = { user: { sub: 1234 } } as any;

                const folder = await controller.create(request, context);

                assert.equal(folder.name, 'test');
                assert.equal(folder.description, 'test');
                assert.equal(folder.parentId, undefined);
                assert.equal(folder.ownerId, 1234);
            });
        });
    });
});