const { response, request } = require("express");
var fs = require("fs");
require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
let ejs = require('ejs');
var axios = require("axios");
const createApplication = require("express/lib/express");
import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://joke-generator.p.rapidapi.com/generate-joke',
  headers: {
    'X-RapidAPI-Host': 'joke-generator.p.rapidapi.com',
    'X-RapidAPI-Key': 'd31b4af6e1msh5e7a7598c0144e4p1e467fjsn3fdf5395389c'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("This app is listening port number %d", PORT);
});