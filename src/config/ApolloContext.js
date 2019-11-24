import models from "../model";
import DataLoader from "dataloader";
import loaders from "../loaders";

async function getContext(conn, req) {
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