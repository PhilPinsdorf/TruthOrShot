//Imports
const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http')
const router = require('./router.js')
const cors = require('cors');

//Express Instance
const app = express();

//Connect to Database, then start express app
var mongoDbUri = 'mongodb+srv://tos:IfhWYIlA70YTitpA@truthorshot.n259x.mongodb.net/Questions?retryWrites=true&w=majority'
mongoose.connect(mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log('Connected to Database!');
		app.listen(3000, () => console.log('Listen to 3000!'));
		app.use(express.json());
		app.use(cors());
		app.use(express.static('public'))
		app.use('/.netlify/functions/api', router)
	})
	.catch((err) => {
		console.log(err);
	});

module.exports.handler = serverless(app)
