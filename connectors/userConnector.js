const mysql = require('mysql');


const addUser = (inputArray) => {
    const db = mysql.createConnection({
        host     : 'lunge-database.ch0uzb2cuoae.us-west-2.rds.amazonaws.com',
        user     : 'admin',
        password : 'o0SgT30xueqiajnVsPaT',
        database : 'lunge',
        port: 3306
    });

    db.connect((err) => {
    if(err){
        throw err;
    }
    });
    var sql = "INSERT INTO user (firstname, lastname, password, email, phonenumber, gender) VALUES ('"+inputArray[0]+"','"+inputArray[1]+"', '"+inputArray[2]+"', '"+inputArray[3]+"', '"+inputArray[4]+"', '"+inputArray[5]+"')";
    db.query(sql, function (err, res) {
    if (err) throw err;

    db.end();

	});
};


//code to add in later

/*

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


*/

module.exports = {
  addUser,
};
