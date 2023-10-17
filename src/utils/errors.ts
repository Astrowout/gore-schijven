import {
    APIErrorCode, ClientErrorCode, isNotionClientError,
} from '@notionhq/client';

export const handleNotionErrors = (error: unknown) => {
    if (isNotionClientError(error)) {
        // error is now strongly typed to NotionClientError
        switch (error.code) {
        case ClientErrorCode.RequestTimeout:
            // ...
            break;
        case APIErrorCode.ObjectNotFound:
            // ...
            break;
        case APIErrorCode.Unauthorized:
            // ...
            break;
        default:
            console.error(error);
        }
    }
};