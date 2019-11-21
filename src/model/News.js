const news = (sequelize, DataTypes) => {
    const News = sequelize.define('news', {
        title: {
            type: DataTypes.STRING,
        },
        highlighted: {
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.TEXT
        },
    });

    News.associate = models => {
        News.belongsTo(models.User, {
            foreignKey: {
                name: 'author',
                allowNull: false
            },
            onDelete: 'CASCADE' }
        )
    };

    return News;
};

export default news;