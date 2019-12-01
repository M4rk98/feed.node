import models from "../model";
import DataLoader from "dataloader";
import loaders from "../loaders";
import {requestUser} from "../util/RequestUser";

async function getContext({conn, req}) {
    if(req) {
        return await getRequestInterceptor(req)
    }
    if(conn) {
        return getConnectionInterceptor()
    }
}


async function getRequestInterceptor(req) {
    const reqUser = await requestUser(req);
    return {
        models,
        reqUser,
        secret: process.env.SECRET,
        loaders: {
            user: new DataLoader(keys =>
                loaders.user.batchUsers(keys, models),
            ),
        },
    }
}

function getConnectionInterceptor() {
    return {
        models,
        secret: process.env.SECRET,
        loaders: {
            user: new DataLoader(keys =>
                loaders.user.batchUsers(keys, models),
            ),
        },
    }
}
export default getContext;
