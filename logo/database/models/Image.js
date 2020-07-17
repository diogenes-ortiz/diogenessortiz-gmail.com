<<<<<<< HEAD
module.exports = function(sequelize, dataTypes) {
	let alias = 'Image';

	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			//allowNull: false
		},
		route: {
			type: dataTypes.STRING
        },
        product_id: {
            type: dataTypes.INTEGER
        }
	};

	let config = {
		tableName: "images",
		timestamps: false
	}

	let Image = sequelize.define(alias, cols, config);

	Image.associate = function(models) {
		Image.belongsTo(models.Product, {
			as: "product",
			foreignKey: "product_id"
		})
	}

	return Image;
=======
module.exports = function(sequelize, dataTypes) {
	let alias = 'Image';

	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		route: {
			type: dataTypes.STRING
        },
        product_id: {
            type: dataTypes.INTEGER
        }
	};

	let config = {
		tableName: "images",
		timestamps: false
	}

	let Image = sequelize.define(alias, cols, config);

	Image.associate = function(models) {
		Image.belongsTo(models.Product, {
			as: "product",
			foreignKey: "product_id"
		})
	}

	return Image;
>>>>>>> 1b1466ef1d410ba8f1a3fef2c0990537a05c18ff
}