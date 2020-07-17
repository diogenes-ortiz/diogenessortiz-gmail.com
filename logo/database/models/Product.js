module.exports = function(sequelize, dataTypes) {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        brand_id: {
            type: dataTypes.INTEGER
        },
        colour_id: {
            type: dataTypes.INTEGER
        },
        genre_id: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.DOUBLE
        },
        sale: {
            type: dataTypes.BOOLEAN
        }

    }
    let config = {
        tableName: "products",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.Genre, {
			as: "genre",
			foreignKey: "genre_id"
        });
        Product.belongsTo(models.Brand, {
			as: "brand",
			foreignKey: "brand_id"
		});
        Product.hasMany(models.Image, {
			as: "images",
			foreignKey: "product_id"
		});
        Product.belongsToMany(models.Cart, {
            as: "carts",
            through: "cart_product",
            foreignKey: "product_id",
            otherKey: "cart_id",
            timestamps: false
        });
        Product.belongsToMany(models.User, {
            as: "users",
            through: "favorites",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false
        });
        Product.belongsToMany(models.Colour, {
            as: "colours",
            through: "colour_product",
            foreignKey: "product_id",
            otherKey: "colour_id",
            timestamps: false
        });
        Product.belongsToMany(models.Size, {
            as: "sizes",
            through: "product_size",
            foreignKey: "product_id",
            otherKey: "size_id",
            timestamps: false
        });
        Product.belongsToMany(models.Category, {
            as: "categories",
            through: "category_product",
            foreignKey: "product_id",
            otherKey: "category_id",
            timestamps: false
        });
    }

    return Product;
}