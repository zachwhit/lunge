const express = require('express');
const hbs = require('hbs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');

// Connectors for mysql functions
const userConnector = require('./connectors/userConnector');



const session = require('express-session')

const TWO_HOURS = 1000 * 60 * 60 * 1

const {
    NODE_ENV = 'development',

    SESS_NAME = 'sid',
    SESS_SECRET = 'ssh!quiet,it\'asecret!',  //replace we actually value 
    SESS_LIFETIME = TWO_HOURS
} = process.env

const IN_PROD = NODE_ENV === 'production'

/*
const db = mysql.createConnection({
        host     : 'lunge-database.ch0uzb2cuoae.us-west-2.rds.amazonaws.com',
        user     : 'admin',
        password : 'o0SgT30xueqiajnVsPaT',
        database : 'lunge',
        port: 3306
    });
	function a(){
    db.connect((err) => {
    if(err) throw err;
	db.query("SELECT id, firstname, email, password from user", function (err, result) {
    if (err) throw err;
	var result;
    var i, len, text;
for (i = 0, len = result.length, text = ""; i < len; i++) {
  text += result[i] + "<br>";
  users = result[i]
  //console.log(users);
}
	
  });
});
	}
*/




const users = [
    {id: 1, name: 'Alex', email: 'alex@alex.ca', password: '123456' },
    {id: 2, name: 'brendon', email: 'btang@gmail.com', password: '123456' },
    {id: 3, name: 'tang', email: 'tang@gmail.com', password: '123456' }
]


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge:  SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}))

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login')
    } else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/market_logged')
    } else {
        next()
    }
}

app.use((req, res, next) => {
    const { userId } = req.session
    if (userId) {
        res.locals.user = users.find(
            user => user.id === userId
        )
    }
    next()
})


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

/*
app.get('/', (request, response) => {
	response.render('market.hbs')
});
*/
// was main.hbs
app.get('/', (request, response) => {
	if (request.session.userId) {
		response.render('market_logged.hbs')
	}
	else {
		response.render('market.hbs')
	}
});

app.get('/market_logged', (request, response) => {
	if (request.session.userId) {
		response.render('market_logged.hbs')
	}
	else {
		response.render('market.hbs')
	}
});

// was home.hbs
app.get('/signInSuccess', redirectLogin, (request, response) => {
	const { user } = response.locals
	response.render('signInSuccess.hbs')
});

app.get('/signInSuccess_logged', (request, response) => {
	if (req.session.userId) {
	response.render('signInSuccess_logged.hbs')
	}
});


// was login.hbs didnt add anything form login to market yet
app.get('/login', redirectHome, (request, response) => {
	response.render('login.hbs')
});



// was register.hbs didnt add anything form login to usercreation yet
app.get('/userCreation', redirectHome, (request, response) => {
	response.render('userCreation.hbs')
});

app.get('/userCreation_logged', (request, response) => {
	if (req.session.userId) {
	response.render('userCreation_logged.hbs')
	}
});




// was login, now marketplace 
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
	console.log(email)
	console.log(password)

    res.redirect('/login')
})

// 
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
        res.clearCookie(SESS_NAME)
        res.redirect('/')
    })
})


app.get('/account', (request, response) => {
	response.render('account.hbs')
});



app.get('/sellerPage_logged', (request, response) => {
	if (request.session.userId) {
		response.render('sellerPage_logged.hbs')
	}
	else {
		response.render('sellerPage.hbs')
	}
});

app.get('/sellerPage', (request, response) => {
	if (request.session.userId) {
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
});
// Regime Creation INSERT
app.post('/regimeCreation',function(req,res){

    var data = [req.body.name, req.body.price, req.body.description, req.body.category, req.body.tags, req.body.goals]

  userConnector.addRegime(data);
  res.render('sellerPage.hbs');
});

app.get('/fetchRegimeCategory', (request, response) => {
	if (request.session.userId) {
		response.render('categoryPage_logged.hbs')
	}
	else {
		response.render('categoryPage.hbs')
	}
});

app.get('/fetchRegimeCategory_logged', (request, response) => {
	if (request.session.userId) {
		response.render('categoryPage_logged.hbs')
	}
	else {
		response.render('categoryPage.hbs')
	}
});




