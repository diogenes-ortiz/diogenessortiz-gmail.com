const movies = require("../database/models/Movie");
let db = require ("../database/models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;


const moviesController = {
    list : function(req, res, next) {
        db.Movies.findAll()
        .then(function(movies){
            res.send(movies)
        })
        .catch(function(error) {
            console.log(error);
            res.send("error")
        })
    }
}

module.exports = moviesController;