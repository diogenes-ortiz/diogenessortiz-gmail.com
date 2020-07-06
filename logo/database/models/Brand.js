module.exports = function(sequelize, dataTypes) {
	let alias = 'Brand';

	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		name: {
			type: dataTypes.STRING
		}
	};

	let config = {
		tableName: "brands",
		timestamps: false
	}

	let Brand = sequelize.define(alias, cols, config);

	return Brand;
}