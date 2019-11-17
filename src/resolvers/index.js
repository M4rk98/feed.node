import { GraphQLDateTime } from 'graphql-iso-date';


const customScalarResolver = {
    Date: GraphQLDateTime,
};

const UserResolver = {
    Query: {
        users: async (parent, args, { models }) => {
            return models.User.findAll();
        }
    },

    Mutation: {
        signUp: async (
            parent,
            { username, email, password },
            { models, secret },
        ) => {
            const user = await models.User.create({
                username,
                email,
                password,
            });

            return { token: createToken(user, secret, '30m') };
        },
    },
};

export default [
    customScalarResolver,
    UserResolver
]