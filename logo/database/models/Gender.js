module.exports = function(sequelize, dataTypes) {
	let alias = 'Gender';

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
		tableName: "genders",
		timestamps: false
	}

	let Gender = sequelize.define(alias, cols, config);

	return Gender;
}
/*
favorite_movie_id: {
    type: dataTypes.INTEGER
}*/