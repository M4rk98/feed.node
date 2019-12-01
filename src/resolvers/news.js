export const NewsResolver = {
    Query: {
        news: async (parent, args, {models}) => {
            return models.News.findAll();
        }
    },

    Mutation: {
        createArticle: async (
            parent,
            {
                title,
                content,
                highlighted
            },
            {models, reqUser},
        ) => {
            await models.News.create({
                title,
                content,
                highlighted,
                author: reqUser.id
            });

            return 200;
        },
    },

    Article: {
        author: async (article, args, { loaders }) => {
            return await loaders.user.load(article.author);
        },
    }
};