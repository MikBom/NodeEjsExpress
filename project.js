// We take needed modules in use
const { response, request } = require("express");
var fs = require("fs");
require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
let ejs = require('ejs');
var axios = require("axios");
const createApplication = require("express/lib/express");


//apikey for weather
const apiKey = '81e9c5816d90d63c82e0876fca5c273c';

// Let's take bodyParser in use in express application
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));

//View mode for ejs
app.set("view engine", "ejs"); 

//Material from the public folder
app.use(express.static("./public"));

//index page
app.get("/", function(req, res) {
  var data = {
    heading: "Main page",
    text: "This is on var data under /.",
    whichpage: "Main page",
  }
  res.render("pages/index", data);
});

// Weather page
app.get('/ilma', (req, res) => {
  res.render('pages/ilma', {weather: null, error: null});
})
// post request that logs the value of 'city' to the console
app.post('/ilma', (req, res) => {
  
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('pages/ilma', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('pages/ilma', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('pages/ilma,', {weather: weatherText, error: null});
      }
    }
  });
})

//Joke reading part from local file
app.get("/local", function(req,res){
  var data = require(__dirname + '/jokes.json');
  var results = '<table border="1">';  
  for (var i = 0; i < data.length; i++) {
     
      results +=
          '<tr>' +
          '<td>' + data[i].id + '</td>' +
          '<td>' + data[i].joke + '</td>' +
          '</tr>';
  }
  
  res.send(results + "Return back from <a href = '/'>here.</a>");
});

//Joke reading part from external file, not posting to EJS page
app.get("/jokeapi", function(request, response) {
  var data = {
    heading: "Api page",
    text: "This page bring to server jokes from http://api.icndb.com/jokes/.",
    whichpage: "API from external page.",
  }
  const promise = axios.get("http://api.icndb.com/jokes/") 
  .then(response => {
  const data = response.data;
  console.log(data);
  });

response.render("pages/local", data);
});



//If not correct page writed then it gives warning 
app.get("*", function(req,res){
  res.status(404).send("Sivua ei löydy! Palaa takaisin <a href = '/'>tästä.</a>");
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening on port 3000');
  
  });



//web server creation with Express
/*const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("This app is listening port number %d", PORT);
});*/

