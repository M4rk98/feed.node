import {AuthenticationError} from "apollo-server-errors";
import jwt from 'jsonwebtoken';

export const requestUser = async req => {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch (e) {
            throw new AuthenticationError(
                'Your session expired. Sign in again.',
            );
        }
    }
};