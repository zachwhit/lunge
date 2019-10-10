var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {

  var query = 'select * from products';
  db.query(query, function(err, rows, fields) {
    if (err) throw err;
    
    /*If you are creating api then get response in json format*/
    //res.json(rows);

    /*If you want response as json then comment below line*/
    res.render('products', { title: 'Products', products: rows});
  })
});

module.exports = router;