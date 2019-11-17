import { gql } from 'apollo-server-express';

export default gql`
    type Query {
        users: [User],
    }

    type Mutation {
        signUp(
            username: String!,
            email: String!,
            password: String!
        ): String
    }
    
    type User {
        id: ID!,
        email: String
    }
`;