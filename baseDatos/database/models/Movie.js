module.exports = (sequelize, dataTypes) => {
    let alias = "Movies";
    let cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },

        title : {
            type : dataTypes.STRING
        },

        length : {
            type : dataTypes.INTEGER
        }
    }

    let config = {
        timestamps : false
    } 
    
    const Movie = sequelize.define(alias, cols, config);
    return Movie;
    
}

