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
        ): Token
    }
    
    type Token {
        token: String
    }
    
    type User {
        id: ID!,
        email: String
    }
`;