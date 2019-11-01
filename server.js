const express = require('express');
const hbs = require('hbs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');

// Connectors for mysql functions
const userConnector = require('./connectors/userConnector');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');




app.get('/', (request, response) => {
	response.render('market.hbs')
});

app.get('/account', (request, response) => {
	response.render('account.hbs')
});

app.get('/sellerPage', (request, response) => {
	response.render('sellerPage.hbs')
});

app.get('/sellerRegister', (request, response) => {
	response.render('sellerRegister.hbs')
});
app.get('/regimePage', (request, response) => {
    response.render('regimePage.hbs')
});
app.get('/databaseTesting', (request, response) => {
    response.render('databaseTesting.hbs')
});

app.get('/userCreation', (request, response) => {
    response.render('userCreation.hbs')
});

app.get('/signIn', (request, response) => {
    response.render('signIn.hbs')
});

app.get('/regimeCreation', (request, response) => {
    response.render('regimeCreation.hbs')
});

app.get('/verified', (request, response) => {
    response.render('verified.hbs')
});


//Dynamic for Heroku, default 3000 for local hosting
app.listen(process.env.PORT || 3000, () => {
});

// User Creation INSERT
app.post('/userCreation',function(req,res){

    var data = [req.body.firstname, req.body.lastname, req.body.password, req.body.email, req.body.phonenumber, req.body.gender]

  userConnector.addUser(data);
  res.render('success.hbs',{name:data[0]});
});

// Regime Creation INSERT
app.post('/regimeCreation',function(req,res){

    var data = [req.body.name, req.body.price, req.body.description, req.body.category, req.body.tags, req.body.goals]

  userConnector.addRegime(data);
  res.render('sellerPage.hbs');
});

