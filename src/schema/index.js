import { gql } from 'apollo-server-express';

import userSchema from './user';
import newsSchema from './news';

const linkSchema = gql`
    scalar Date
`;

export default [linkSchema, userSchema, newsSchema];