const express = require('express');
const hbs = require('hbs');
const mysql = require('mysql');

var app = express();

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

// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

// Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {title:'Post One', body:'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });
});

// Insert post 2
app.get('/addpost2', (req, res) => {
    let post = {title:'Post Two', body:'This is post number two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 2 added...');
    });
});

// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
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
