import {GraphQLDateTime} from 'graphql-iso-date';
import {NewsResolver} from "./news";
import {UserResolver} from "./user";


const customScalarResolver = {
    Date: GraphQLDateTime,
};


export default [
    customScalarResolver,
    UserResolver,
    NewsResolver
]