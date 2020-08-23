const fs = require('fs');
const path = require('path');
let bcrypt = require('bcrypt')
let { check, validationResult, body } = require ('express-validator')
const db = require('../database/models');
const {Op} = require('sequelize');

const cartsController = {
    list: function(req, res, next) {
        // USUARIO LOGUEADO
        if(res.locals.userLog != undefined) {
            db.Cart.findAll({
                where: {
                    //user_id: res.locals.userLog.id,
                    state: '0'
                },
                //include: [{association: "products"}, {all: true, nested: true}]
                //include: {all: true, nested: true}
                //include: {all: true}
                //include: [{association: "products", include: {association: "images"}}]
                include: [{association: "products", through:{attributes:["quantity", "price"]},  include: {association: "images"}}]
            })
    
            //Promise.all([pedidoCarrito, pedidoImagenes])
            .then(function(cart) {
                console.log(cart);
                // CARRO ABIERTO
                if (cart != "") {
                    console.log(cart[0].id)
                    let cartId = cart[0].id;  // ID de carrito
                    let cartOpen = cart[0]   // me quedo con el primer carrito
                    db.Cart_Product.findAll({
                        where: {
                            cart_id: cartId
                        },
                    })

                    .then(function(cartProducts) {
                        console.log(cartProducts)
                        console.log(cartProducts[0] != "")
                        // HAY ARTICULOS
                        if (cartProducts[0] != "") {
                            db.Image.findAll({
                                where:{
                                    product_id: cartProducts[0].product_id
                                }
                            })
                            .then(function(images) {

                                console.log("articulos carrito");
                                console.log(cartProducts[0]);
                                //console.log(cartProducts[0].length);
                                let cartPdto = cartProducts[0];
                                res.render('carts', { 
                                    pepe:'pepe',
                                    cart:cartOpen, 
                                    product: cartPdto, 
                                    images: images
                                }) 
                            });
                        }
                        // NO HAY ARTICULOS
                        else {
                            //console.log("no hay articulos, solo un carro vacio");
                            res.render('carts');
                        }
                    })
                }
                //CARRO CERRADO
                else {
                    //console.log("entro por NULL");
                    db.Cart.create({
                        user_id: res.locals.userLog.id,
                        total: 0,
                        state: 1
                    })
                    .then(function(cart) {
                        res.render('carts', {cart: cart});
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            })
            // USUARIO NO LOGUEADO
        } else {
            res.redirect('/users/login');
        }
    },

    create: function (req, res, next) {
	    //--- USUARIO LOGUEADO ---
        if (res.locals.userLog != undefined) {
            let productId = req.body.productId;
            // BUSCA CARRITO
            db.Cart.findOne({
                where: {
                    user_id: res.locals.userLog.id,
                    state: 1,
                }
            })
            .then(function(cart) {
		        //--- EXISTE CARRITO ---
                if (cart != undefined) {
                    let cartId = cart.id;

                    db.Cart_product.findAll({
                        where: {
                            cart_id: cartId,
                            product_id: req.body.productId
                    },
			        include: [{association:"products"}]
			        })
                    .then(function(art) {
			
                        if(item != ""){
                            //console.log();
                            let unidades = art[0].quantity + 1;
                            let precio = art[0].price;
                            db.Cart_Product.update({
                                quantity: unidades,
                                price: precio,
                            }, {
                                where: {
                                    product_id: req.body.productId,
                                    cart_id: cartId
                                }
                            })
                            .then(function(agregado) {
                                //console.log();
                                res.render('/cart');
                               
                            })
                            .catch(function(error) {
                                console.log(error);
                            }) 
                        } else {
                            db.Product.findByPk(productId)
                            .then(function(product) {
                                db.Cart_Product.create({
                                    //quantity: req.body.art,
                                    price: product.price,
                                    cart_id: cartId,
                                    product_id: productId,
                                })
                            })

                        }
                    })
        		//--- NO EXISTE CARRITO ---
                } else {
                    db.Cart.create({
                        user_id: res.locals.userLog.id,
                        total: 0,
                        state: 1
                    })
                    .then(function(cartCreated) {
                        cartId = cartCreated.id;
                        db.Product.findByPk(productId)
                        .then(function(product) {
                            db.Cart_Product.create({
                                //quantity: req.query.art,
                                price: product.price,
                                cart_id: cartId,
                                product_id: productId,
                            })
                        })

                    })

                }
            })

            .then(function() {
                res.redirect('/products');

            })
            .catch(function(error) {
                console.log(error);
            })
	    //--- USUARIO NO LOGUEADO ---
        } else {
            res.redirect('/users/login');
        }
    },

    //ADD ARTICLE
    add: function (req, res, next) {
        // USUARIO LOGUEADO
        if (res.locals.userLog != undefined) {
            // BUSCO EL CARRITO
            db.Cart.findOne({
                where: {
                    user_id: res.locals.userLog.id,
                    state: 1
                }
            })
            .then(function(cart) {
                // TOMO EL CART ID
                let cartId = cart.id;
                // TOMO EL PRODUCT ID
                let productoId = req.body.productId;
                // BUSCO EL ARTICULO
                db.Cart_product.findOne({
                    where: {
                        product_id: productoId,
                        cart_id: cartId
                    }
                })
                .then(function(art_carrito) {   //VER art_carrito
                    //console.log()
                    let unidades = art_carrito.quantity + 1;
                    let precioUnitario = art_carrito.price/art_carrito.quantity;
                    let precio = art_carrito.price + precioUnitario;
                    db.Cart_Product.update(
                        {
                            quantity: unidades,
                            price: precio
                        }, {
                            where: {
                                product_id: productoId,
                                cart_id: cartId
                            }
                        })
                        .then(function(cartProducts) {
                            res.redirect('/cart');
                        })
                })
                .catch(function(error) {
                    console.log(error);
                })
            })
            // USUARIO NO LOGUEADO
        } else {
            res.redirect('/users/login')
        }
    },

//SUBTRACT ARTICLE
    subtract: function (req, res, next) {
        // USUARIO LOGUEADO
        if (res.locals.userLog != undefined) {
            // BUSCO EL CARRITO
            db.Cart.findOne({
                where: {
                    user_id: res.locals.userLog.id,
                    state: 1
                }
            })
            .then(function(cart) {
                // TOMO EL CART ID
                let cartId = cart.id;
                // TOMO EL PRODUCT ID
                let productoId = req.body.productId;
                    // BUSCO EL ARTICULO
                db.Cart_product.findOne({
                    where: {
                        product_id: productoId,
                        cart_id: cartId
                    }
                })
                .then(function(art_carrito) {            //VER
                    let unidades = art_carrito.quantity;
                    let precioUnitario = art_carrito.price/art_carrito.quantity; 
                    let precio = art_carrito.price - precioUnitario;
                        
                    if (unidades == 1) {
                        res.redirect('/cart/remove/' + productoId);
                            
                    } else {
                        unidades--;
                        db.Cart_product.update(
                            {
                                quantity: unidades,
                                price: precio
                            }, {
                                where: {
                                    product_id: productoId,
                                    cart_id: cartId
                                }
                            })
                            .then(function(carts) {
                                res.redirect('/cart');
                            })
                    }
                })
                .catch(function(error) {
                    console.log(error);
                })
            })
             // USUARIO NO LOGUEADO       
        } else {
            res.redirect('/users/login')
        }
    },    

//DELETE
    delete: function (req, res, next) {
        // USUARIO LOGUEADO
        if (res.locals.userLog != undefined) {
            // BUSCO EL CARRITO
            db.Cart.findOne({
                where: {
                    user_id: res.locals.userLog.id,
                    state: 1
                }
            })
            .then(function(cart) {
                // TOMO EL CART ID
                let cartId = cart.id;
                // TOMO EL PRODUCT ID
                let productoId = req.body.productId;   //número de ID
                db.Cart_Product.destroy({
                    where: {
                        product_id: productoId,
                        cart_id: cartId
                    }
                })
                .then(function(cartProducts) {
                    
                    res.redirect('/cart');
                })
            })
            .catch(function(error) {
                console.log(error);
            })
            // USUARIO NO LOGUEADO
        } else {
            res.redirect('/users/login')
        }
    },
/*
    destroy: function(req, res) {
        //BUSCO PELI
        db.Movie.findByPk(req.params.id, {
            //AGREGO RELACION ACTORES
            include: ['actors'] //mal, cambiar por alias actors
        })
        .then(function(movie) {
            // IDS DE ACTORES VACIA
            let actorsIds = []
            // TOMO LOS IDS DE TODOS LOS ACTORES DE ESTA PELI
            movie.actors.forEach(function(actor) { //mal Actor por alias actors y segundo movie por actor
                actorsIds.push(actor.id) //mal movie, cambiar por actor
            });
            // DESVINCULO ACTORES DE ESTA PELI
            movie.removeActors(actorsIds) //Movies, cambiar por Actors
            // AHORA PUEDO BORRAR LA PELI
            db.Movie.destroy({
                where: {
                    id: movie.id
                }
            })
        })
        .catch(function(error){
            console.log(error)
        })

        res.redirect("/movies");
    },*/


//PAYMENT CLOSE
    close: function (req, res, next) {
        // USUARIO LOGUEADO
        if (res.locals.userLog != undefined) {
            db.Cart_product.findAll({
                where: {
                    cart_id: req.params.id,
                }
            })

            .then(function() {
                db.Cart.update({ 
                    state: 0,
                    total: subtotal
                },
                {
                    where: {
                        user_id: res.locals.userLog.id,
                        id: req.params.id,
                    }
                })
                .then(function() {
                    res.redirect('/users/profile');
                })
                .catch(function(error) {
                    console.log(error);
                })
                        
            })
            // USUARIO NO LOGUEADO
        } else {
            res.redirect('/users/login')
        }
    },


    store : function (req, res, next){
        //console.log(res.params.productId)
        console.log(req.body.productId)
        console.log(req.session.usuarioLogueado)
        //console.log(userLog)
        console.log(res.locals.userLog)
        console.log(res.locals.userLog.id)
        //res.render('pago')
        /*db.Product.findByPk(req.body.productId)
        db.Cart.create({
            user_id: userLog.id,
            product_id: req.body.productId,
            state:'1',
            sale_date: new Date(), 
            total:u 
        });*/
        res.redirect('/products/genero/1')
    },

    pago : function (req, res, next){
        res.render('pago')
    }
}

module.exports = cartsController