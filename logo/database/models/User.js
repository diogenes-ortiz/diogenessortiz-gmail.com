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
        rating: {
            type: dataTypes.DOUBLE
        },
        favorite_movie_id: {
            type: dataTypes.INTEGER
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
            through: "product_user",
            foreignKey: "user_id",
            otherKey: "product_id",
            timestamps: false
            //onDelete: "cascade"
            //onUpdate: "cascade"
        });
    }

    return User;
}