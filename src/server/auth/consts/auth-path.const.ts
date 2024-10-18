import { IHTTPIntermediateAction } from "server-over-express";

export const authPaths: IHTTPIntermediateAction['paths'] = {
    include: [
        '/auth/status',
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