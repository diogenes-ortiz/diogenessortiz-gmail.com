module.exports = function(sequelize, dataTypes) {
	let alias = 'Size';

	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		size_name: {
			type: dataTypes.STRING
		}
	};

	let config = {
		tableName: "sizes",
		timestamps: false
	}

	let Size = sequelize.define(alias, cols, config);

	SizeUser.associate = function(models) {
        SizeUser.belongsToMany(models.Product, {
            as: "products",
            through: "product_size",
            foreignKey: "size_id",
            otherKey: "product_id",
            timestamps: false
            //onDelete: "cascade"
            //onUpdate: "cascade"
        });
    }

	return Size;
}