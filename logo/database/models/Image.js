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

	return Image;
}