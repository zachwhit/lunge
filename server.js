const express = require('express');
const hbs = require('hbs');
const mysql = require('mysql');
const bodyParser = require('body-parser');

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

//Dynamic for Heroku, default 3000 for local hosting
app.listen(process.env.PORT || 3000, () => {
});



// Create connection
const db = mysql.createConnection({
    host     : 'lunge-database.ch0uzb2cuoae.us-west-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'o0SgT30xueqiajnVsPaT',
    database : 'lunge',
    port: 3306,
    timeout: 60000,
    debug: true
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

app.post('/submit',function(req,res){

  var username=req.body.username;
  var firstname=req.body.firstname;
  var lastname=req.body.lastname;
  var password=req.body.password;
  var email=req.body.email;
  var gender=req.body.gender;
  res.write('Hey "' + req.body.firstname+'".\n');
  res.write('You sent the email "' + req.body.email+'".\n');
  res.write('You sent the username "' + req.body.username+'".\n');

  var sql = "INSERT INTO testfield (username, firstname, lastname, password, email, gender) VALUES ('"+username+"', '"+firstname+"','"+lastname+"', '"+password+"', '"+email+"', '"+gender+"')";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
     res.end();
  });
});

app.post('/getuser',function(req,res){
  var username=req.body.username;
  var sql = "SELECT * FROM testfield WHERE testfield.username = '"+username+"'";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record pulled");
    res.send(result);
  });
});


// Select posts
app.get('/get', (req, res) => {
    let sql = 'SELECT * FROM testfield';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched...');
    });
});

// Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetched...');
    });
});

// Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

// Delete post
app.get('/deletepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});
