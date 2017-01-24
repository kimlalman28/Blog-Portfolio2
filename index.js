var pg = require('pg');
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public')); //allow use to style.css

app.set('view engine', 'ejs'); //to use ejs
app.set('views', './views')
var dbURL = process.env.DATABASE_URL ||'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/blog'; //connection string to database

app.get('/', function(req, res){
	res.redirect('/portfolio')
})

app.get('/blog', function (req, res) { //get request for blog page
	pg.connect(dbURL, function(err, client, done){
		client.query('select * from posts', function(err, result){
			res.render('blog', {data: result.rows}) 
			done();
			pg.end();
		})
	})
})

app.post('/blog', function(req, res){ //post request when user submits a post
	pg.connect(dbURL, function(err, client, done){
		client.query(`insert into posts(title, body) values ('${req.body.title}', '${req.body.body}')`,function(err, result){
			res.redirect('/blog');
			done();
			pg.end();
		})
	})
})

app.get('/portfolio', function(req, res){ //get request for portfolio page. Only need to render when on page
	res.render('portfolio')
})

app.get('*', function(req, res){
	res.status(404).send("Page not found! Try route to /portfolio or /blog" )
})


app.listen(port, function(){
	console.log("App listening on port 3000")
})
