<<<<<<< HEAD:logo/database/models/Genre.js
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
=======
module.exports = function(sequelize, dataTypes) {
	let alias = 'Gender';

	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		gender_name: {
			type: dataTypes.STRING
		}
	};

	let config = {
		tableName: "genders",
		timestamps: false
	}

	let Gender = sequelize.define(alias, cols, config);

	Gender.associate = function(models) {
		Gender.hasMany(models.Product, {
			as: "products",
			foreignKey: "gender_id"
		})
	}
	return Gender;
>>>>>>> 1b1466ef1d410ba8f1a3fef2c0990537a05c18ff:logo/database/models/Gender.js
}