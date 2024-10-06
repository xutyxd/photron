import "reflect-metadata";

import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";

import { BadRequestResponse, NotFoundResponse } from "../../../../src/server/crosscutting/common/responses";
import { MemoryDatabaseService } from "../../../../src/server/crosscutting/database/services/memory-database.service";
import { FileController } from "../../../../src/server/file/controllers/file.controller";
import { IFileAPIData, IFileModelData } from "../../../../src/server/file/interfaces/data";
import { FileRepository } from "../../../../src/server/file/repository/file.repository";
import { FileService } from "../../../../src/server/file/services/file.service";

describe('FileController', () => {

    describe('FileController constructor', () => {
        it('it should instance', () => {
            let instance: FileController | Error;

            try {
                const database = new MemoryDatabaseService<IFileModelData>();
                const repository = new FileRepository(database);
                const service = new FileService(repository);

                instance = new FileController(service);
            } catch (e) {
                instance = e as Error;
            }

            assert.equal(instance instanceof FileController, true);
        });
    });

    describe('FileController handlers', () => {
        let controller: FileController;

        beforeEach(async () => {
            const database = new MemoryDatabaseService<IFileModelData>();
            await database.connection.open();
            const repository = new FileRepository(database);
            const service = new FileService(repository);

            controller = new FileController(service);
        });

        describe('FileController create', () => {
            it('should throw a bad request error if name is not provided', async () => {
                let response: IFileAPIData | BadRequestResponse;

                try {
                    const result = await controller.create({ body: { } } as any, {} as any);
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

        describe('FileController list', () => {
            it('should return a list of files', async () => {
                const request = { params: {} } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const files = await controller.list(request, context);

                assert.equal(files.length, 0);
            });

            it('should create a file and return it', async () => {
                const body = { name: 'test', description: 'test', size: 1024, type: 'image/png' };
                const request = { body } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const fileCreated = await controller.create(request, context);

                const files = await controller.list(request, context);
                const [ fileListed ] = files;

                assert.equal(files.length, 1);
                assert.equal(fileListed.name, fileCreated.name);
                assert.equal(fileListed.description, fileCreated.description);
                assert.equal(fileListed.owner, '1234-test');
            });
        });

        describe('FileController get', () => {
            it('should throw a bad request error if uuid is not provided', async () => {
                let response: IFileAPIData | BadRequestResponse;

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

            it('should throw an error if file is not found', async () => {
                let response: IFileAPIData | NotFoundResponse;

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

            it('should get a file', async () => {
                const body = { name: 'test', description: 'test', size: 1024, type: 'image/png' };
                const request = { body } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const fileCreated = await controller.create(request, context);
                const file = await controller.get({ params: { uuid: fileCreated.uuid } } as any, context);

                assert.equal(file.name, fileCreated.name);
                assert.equal(file.description, fileCreated.description);
                assert.equal(file.owner, '1234-test');
            });
        });

        describe('FileController update', () => {
            it('should throw a bad request error if uuid is not provided', async () => {
                let response: IFileAPIData | BadRequestResponse;

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

            it('should throw an error if file is not found', async () => {
                let response: IFileAPIData | NotFoundResponse;

                const request = { params: { uuid: 'test' }, body: { } } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                try {
                    response = await controller.update(request, context);
                } catch (e) {
                    response = e as NotFoundResponse;
                }

                const replied = (response as NotFoundResponse).reply() as { code: number, response: string };

                assert.equal(response instanceof NotFoundResponse, true);
                assert.equal(replied.code, 404);
                assert.equal(replied.response, 'Not found: Record not found');
            });

            it('should update a file', async () => {
                const body = { name: 'test', description: 'test', size: 1024, type: 'image/png' };
                const request = { body } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const fileCreated = await controller.create(request, context);
                const file = await controller.update({ params: { uuid: fileCreated.uuid }, ...request }, context);

                assert.equal(file.name, fileCreated.name);
                assert.equal(file.description, fileCreated.description);
                assert.equal(file.owner, '1234-test');
            });
        });

        describe('FileController delete', () => {
            it('should throw a bad request error if uuid is not provided', async () => {
                let response: IFileAPIData | BadRequestResponse;

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

            it('should throw an error if file is not found', async () => {
                let response: IFileAPIData | NotFoundResponse;

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

            it('should delete a file', async () => {
                const body = { name: 'test', description: 'test', size: 1024, type: 'image/png' };
                const request = { body } as any;
                const context = { user: { sub: 1234, name: '1234-test' } } as any;

                const fileCreated = await controller.create(request, context);
                const file = await controller.delete({ params: { uuid: fileCreated.uuid } } as any, context);

                assert.equal(file.name, fileCreated.name);
                assert.equal(file.description, fileCreated.description);
                assert.equal(file.owner, '1234-test');
            });
        });
    });
});