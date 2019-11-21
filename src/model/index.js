import Sequelize from 'sequelize';
import 'dotenv/config';


let sequelize;
sequelize = new Sequelize(
    process.env.DATABASE_URL,
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: true
        }
    });

const models = {
    User: sequelize.import('./User'),
    News: sequelize.import('./News')
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;