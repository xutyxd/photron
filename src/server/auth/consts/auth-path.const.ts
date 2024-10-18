import { IHTTPIntermediateAction } from "server-over-express";

export const authPaths: IHTTPIntermediateAction['paths'] = {
    include: [
        '/auth/status',
        '/directories',
        '/files',
        '/folders',
        '/photos',
        '/tags',
        '/users',
        '/versions'
    ],
    exclude: [
        '/auth/google'
    ]
};