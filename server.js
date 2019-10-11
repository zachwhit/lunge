const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));
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

app.listen(3000, () => {
	console.log('Server is up on the port 3000');
});

