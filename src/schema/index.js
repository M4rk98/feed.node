import { gql } from 'apollo-server-express';

import userSchema from './user';

const linkSchema = gql`
    scalar Date
`;

export default [linkSchema, userSchema];