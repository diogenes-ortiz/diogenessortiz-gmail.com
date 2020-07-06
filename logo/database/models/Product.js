module.exports = function(sequelize, dataTypes) {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
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
        tableName: "products",
        timestamps: false
    }
    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsToMany(models.Cart, {
            as: "movies",
            through: "cart_product",
            foreignKey: "product_id",
            otherKey: "cart_id",
            timestamps: false
            //onDelete: "cascade"
            //onUpdate: "cascade"
        });
        Product.belongsToMany(models.User, {
            as: "users",
            through: "product_user",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false
            //onDelete: "cascade"
            //onUpdate: "cascade"
        });
        Product.belongsToMany(models.Colour, {
            as: "colours",
            through: "colour_product",
            foreignKey: "product_id",
            otherKey: "colour_id",
            timestamps: false
            //onDelete: "cascade"
            //onUpdate: "cascade"
        });
        Product.belongsToMany(models.Size, {
            as: "sizes",
            through: "product_size",
            foreignKey: "product_id",
            otherKey: "size_id",
            timestamps: false
            //onDelete: "cascade"
            //onUpdate: "cascade"
        });
        Product.belongsToMany(models.Category, {
            as: "categories",
            through: "categoryproduct_user",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false
            //onDelete: "cascade"
            //onUpdate: "cascade"
        });
    }

    return Product;
}