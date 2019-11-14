const mysql = require('mysql');
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');

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
   var sql = "INSERT INTO user (firstname, lastname, password, email, phonenumber, gender) VALUES ('"+inputArray[0]+"','"+inputArray[1]+"', '"+inputArray[5]+"', '"+inputArray[4]+"', '"+inputArray[2]+"', '"+inputArray[3]+"')";
    db.query(sql, function (err, res) {
    if (err) throw err;
    // db.end();
	});
	   async function main() {
   
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        secure: false,
        auth: {
            user: 'lungesystem@gmail.com', 
            pass: 'lunge123!' 
        }
    });  
    let info = await transporter.sendMail({
        from: '"LUNGE" <admin@lunge.com>', 
        to: inputArray[4], 
        subject: 'Lunge Confirmation Email', 
        html: '<a href = "https://lunge-2.herokuapp.com/verified">Click here to confirm. </a>' 
    });
}
main().catch(console.error);
};

const addRegime = (inputArray) => {
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
   var sql = "INSERT INTO regime (name, price, description, category, tags, goals) VALUES ('"+inputArray[0]+"','"+inputArray[5]+"', '"+inputArray[2]+"', '"+inputArray[1]+"', '"+inputArray[4]+"', '"+inputArray[3]+"')";
    db.query(sql, function (err, res) {
    if (err) throw err;
    // db.end();
    });

}

const userSignIn = (email, password) => {
    return new Promise((resolve, reject) => {
    const db = mysql.createConnection({
        host     : 'lunge-database.ch0uzb2cuoae.us-west-2.rds.amazonaws.com',
        user     : 'admin',
        password : 'o0SgT30xueqiajnVsPaT',
        database : 'lunge',
        port: 3306
    });
    db.connect();      
        db.query("SELECT * FROM user WHERE user.email = ('"+email+"') AND user.password = ('"+password+"')", (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });
        db.end();
    });
}


const fetchRegimeCategory = (category) => {
    return new Promise((resolve, reject) => {
    const db = mysql.createConnection({
        host     : 'lunge-database.ch0uzb2cuoae.us-west-2.rds.amazonaws.com',
        user     : 'admin',
        password : 'o0SgT30xueqiajnVsPaT',
        database : 'lunge',
        port: 3306
    });
    db.connect();      
        db.query("SELECT * FROM regime WHERE regime.category = ('"+category+"')", (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });
        db.end();
    });
}


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
  addRegime,
  userSignIn,
  fetchRegimeCategory,

};
