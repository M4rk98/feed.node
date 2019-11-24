import jwt from 'jsonwebtoken';
import {UserInputError} from "apollo-server-errors";

const createToken = async (user, secret, expiresIn) => {
    const { id, email, username, role } = user;
    return await jwt.sign({ id, email, username, role }, secret, {
        expiresIn,
    });
};

export const UserResolver = {
    Query: {
        users: async (parent, args, {models}) => {
            return models.User.findAll();
        }
    },
    Mutation: {
        signUp: async (
            parent,
            {username, email, password},
            {models, secret},
        ) => {
            const user = await models.User.create({
                username,
                email,
                password,
            });

            return {token: createToken(user, secret, '30m')};
        },
        signIn: async (
            parent,
            {username, password},
            {models, secret}
        ) => {
            const user = await models.User.findByName(username);

            if(!user) {
                throw new UserInputError('No users found with this username');
            }

            const isValid = await user.validatePassword(password);

            if (!isValid) {
                throw new AuthenticationError('Invalid password.');
            }

            return { token: createToken(user, secret, '30m') };
        }
    },
};