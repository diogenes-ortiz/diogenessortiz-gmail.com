module.exports = function(sequelize, dataTypes) {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING
        },
        phone_number: {
            type: dataTypes.INTEGER
        },
        age: {
            type: dataTypes.INTEGER
        },
        admin: {
            type: dataTypes.BOOLEAN
        }

    }
    let config = {
        tableName: "users",
        timestamps: false
    }
    let User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.belongsToMany(models.Product, {
            as: "products",
            through: "favorites",
            foreignKey: "user_id",
            otherKey: "product_id",
            timestamps: false
        });
    }

    return User;
}