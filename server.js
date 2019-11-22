const express = require('express');
const hbs = require('hbs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');
const session = require('express-session')

// Connectors for mysql functions
const userConnector = require('./connectors/userConnector');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret:'pig123',
	resave: true,
	saveUninitialized: true
    
}));

const db = mysql.createConnection({
        host     : 'lunge-marketplace.cbimyqtp80cn.us-west-2.rds.amazonaws.com',
        user     : 'admin',
        password : 'hDCKykvSCmVhra96',
        database : 'lunge',
        port: 3306
    });
	
app.post('/test', function(request, response) {
	var email = request.body.email;
	var password = request.body.password;
	if (email && password) {
		db.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.email = email;
				response.redirect('/market_logged');
			} else {
				response.redirect('/login');
			}			
			response.end();
		});
	} else {
		response.end();
	}
});

const redirectLogin = (req, res, next) => {
    if (!req.session.loggedin) {
        res.redirect('/login')
    } else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.loggedin) {
        res.redirect('/market_logged')
    } else {
        next()
    }
}

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (request, response) => {
	if (request.session.loggedin) {
		response.render('market_logged.hbs')
	}
	else {
		response.render('market.hbs')
	}
});

app.get('/market_logged', (request, response) => {
	if (request.session.loggedin) { 
		response.render('market_logged.hbs')
	}
	else {
		response.render('market.hbs')
	}
});

app.get('/signInSuccess', redirectLogin, (request, response) => {
	response.render('signInSuccess.hbs')
});

app.get('/signInSuccess_logged', (request, response) => {
	if (request.session.loggedin) {
	response.render('signInSuccess_logged.hbs')
	}
});

app.get('/login', redirectHome, (request, response) => {
	response.render('login.hbs')
});

app.get('/userCreation', redirectHome, (request, response) => {
	response.render('userCreation.hbs')
});

app.get('/userCreation_logged', (request, response) => {
	if (request.session.loggedin) {
	response.render('userCreation_logged.hbs')
	}
});

app.post('/login', redirectHome, (req, res) => {
    const {email, password } = req.body

	
    if (email && password) {
        const user = users.find(
            user => user.email === email && user.password === password
            )
            if (user) {
                req.session.userId = user.id
                return res.redirect('/signInSuccess')
				console.log(email)
				console.log(password)
            }
    }
	

    res.redirect('/login')
})

app.post('/register', redirectHome, (req, res) => {
    const { name, email, password } = req.body

    if (name && email && password) {
        const exists = users.some(
            user => user.email === email
        )

        if (!exists) {
            const user = {
                id: users.length + 1,
                name,
                email,
                password
            }

            users.push(user)

            req.session.userId = user.id
            console.log(users)
            return res.redirect('/userCreation')

        }
    }
    res.redirect('/register')
	console.log(users)
})

app.post('/logout', redirectLogin, (req, res) => {

    req.session.destroy(err => {
        if(err) {
            return res.redirect('/home')
        }
        res.clearCookie('connect.sid')
        res.redirect('/')
    })
})

app.get('/account', (request, response) => {
	response.render('account.hbs')
});

app.get('/sellerPage_logged', (request, response) => {
	if (request.session.loggedin) {
		response.render('sellerPage_logged.hbs')
	}
	else {
		response.render('sellerPage.hbs')
	}
});

app.get('/sellerPage', (request, response) => {
	if (request.session.loggedin) {
		response.render('sellerPage_logged.hbs')
	}
	else {
		response.render('sellerPage.hbs')
	}
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

// User Login 
app.post('/userSignIn', async (req,res) => {
  let user = await userConnector.userSignIn(req.body.email, req.body.password);
  console.log(user)
  firstname = user[0]["firstname"];
  res.render('signInSuccess.hbs', 
    {
     name: firstname,
  });
});


// User Creation INSERT
app.post('/userCreation',function(req,res){

  if(req.body.passwordConfirm == req.body.password) {
    var data = [req.body.firstname, req.body.lastname, req.body.phonenumber, req.body.gender, req.body.email, req.body.password]
    userConnector.addUser(data);
    res.render('userCreationSuccess.hbs',
      {name:data[0],
       email: data[4],
      });
  }
  else{
    res.send("Passwords do not match.");
  }
});

// Fetch Regime Via Category - used on Main Page for featured Regimes
app.post('/fetchRegimeCategory', async (req,res) => {
  let regimes = await userConnector.fetchRegimeCategory(req.body.category);
  name = regimes[0]["name"];
  price = regimes[0]["price"];
  description = regimes[0]["description"];
  category = regimes[0]["category"];
  tags = regimes[0]["tags"];
  goals = regimes[0]["goals"];
  image = regimes[0]["category"];
  regimesObj = JSON.stringify(regimes);
  
  if (req.session.loggedin) {
		res.render('categoryPage_logged.hbs',
    {
      name: name,
      price: price,
      description: description,
      category: category,
      tags: tags,
      goals: goals,
      image: image,
      regimes: regimes
    });
  }
  else {
	  res.render('categoryPage.hbs',
	  {
		  name: name,
		  price: price,
		  description: description,
		  category: category,
		  tags: tags,
		  goals: goals,
		  image: image,
		  regimes: regimes
    });
		  
	  
	  
  }
  
  
});

app.post('/fetchSingleRegime', async (req,res) => {
  let regimes = await userConnector.fetchSingleRegime(req.body.regime);
  name = regimes[0]["name"];
  price = regimes[0]["price"];
  description = regimes[0]["description"];
  category = regimes[0]["category"];
  tags = regimes[0]["tags"];
  goals = regimes[0]["goals"];
  image = regimes[0]["category"];
  regimesObj = JSON.stringify(regimes);
  
  if (req.session.loggedin) {
	res.render('regimePage.hbs', 
    {
      name: name,
      price: price,
      description: description,
      category: category,
      tags: tags,
      goals: goals,
      image: image
    });
  }
  else {
	res.render('login.hbs')
	  
}
});

// Regime Creation INSERT
app.post('/regimeCreation',function(req,res){

    var data = [req.body.name, req.body.price, req.body.description, req.body.category, req.body.tags, req.body.goals]

  userConnector.addRegime(data);
  res.render('sellerPage.hbs');
});