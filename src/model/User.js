import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [7, 42],
            },
        }
    });

    User.associate = models => {
        User.hasMany(models.News, {
            foreignKey: {
                name: 'author',
                allowNull: false
            },
            onDelete: 'CASCADE' }
        )
    };

    User.findByName = async username => {
        return User.findOne({
            where: {username: username},
        });
    };

    User.beforeCreate(async user => {
        user.password = await user.generatePasswordHash();
    });


    User.prototype.generatePasswordHash = async function() {
        const saltRounds = 10;
        return await bcrypt.hash(this.password, saltRounds);
    };

    User.prototype.validatePassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    return User;
};

export default user;