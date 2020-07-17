module.exports = function(sequelize, dataTypes) {
	let alias = 'Genre';

	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		genre_name: {
			type: dataTypes.STRING
		}
	};

	let config = {
		tableName: "genres",
		timestamps: false
	}

	let Genre = sequelize.define(alias, cols, config);

	Genre.associate = function(models) {
		Genre.hasMany(models.Product, {
			as: "products",
			foreignKey: "genre_id"
		})
	}
	return Genre;
}