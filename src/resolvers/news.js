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
            {models, secret},
        ) => {
            const article = await models.News.create({
                title,
                content,
                highlighted
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