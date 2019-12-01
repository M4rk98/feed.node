import {AuthenticationError} from "apollo-server-errors";
import jwt from 'jsonwebtoken';

export const requestUser = async req => {
    let token = req.headers.authorization;
    if (token) {
        token.replace('Bearer ', '');
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch (e) {
            throw new AuthenticationError(
                'Your session expired. Sign in again.',
            );
        }
    }
};