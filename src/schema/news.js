import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        news: [Article],
        article(id: ID!): Article
    }

    extend type Mutation {
        createArticle(
            title: String!,
            content: String,
            highlighted: Int
        ): Int
    }

    type Article {
        id: ID!,
        title: String,
        content: String,
        author: User!,
        highlighted: Int,
        createdAt: Date
    }
`;