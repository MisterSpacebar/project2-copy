var api_key = process.env.api_key;
var api_secret = process.env.api_secret;
var sem3 = require('semantics3-node')(api_key, api_secret);

var db = require("../models");

// Routes
module.exports = function (app) {

  app.get("/search/:data", function (req, res) {
    // Build the request
    sem3.products.products_field("search", req.params.data);
    // Run the request
    sem3.products.get_products(
      function (err, products) {
        if (err) {
          console.log("Couldn't execute request: get_products");
          return;
        }
        res.json(products);
      }
    );
  });


  // Get route for inventory for an specific user
  app.get("/myInventory/:id", function (req, res) {
    db.product.findAll({
      where: {
        userId: req.params.id
      }
    }).then(function (dbProducts) {
      res.json(JSON.stringify(dbProducts));
    });
  });


  app.get("/userLogin", function (req, res) {
    res.send(JSON.stringify(req.user.id));
  });

  // save to database
  app.post("/saveToInventory", function (req, res) {
    let data = {
      name: req.body.data.name,
      category: req.body.data.category,
      brand: req.body.data.brand,
      price: req.body.data.price,
      quantity: req.body.quantity,
      userId: req.body.userId
    }
    db.product.create(data).then(function (dbProd) {
      console.log(dbProd.product)
    })
  });

  // update data
  app.put("/updateInventory", function(req, res, err){
    var changeData = {
      name: req.body.name,
      category: req.body.category,
      brand: req.body.brand,
      price: req.body.price,
      quantity: req.body.quantity
    }
    console.log("TEST ITEM ID: "+req.body.id);

    db.product.update(changeData, { where: { id: req.body.id}} )
      .then(function (response){
        res.json(response);
      })
        .catch(err);

  });

  app.get("/search", function (req, res) {
    res.render('search');
  });

};

