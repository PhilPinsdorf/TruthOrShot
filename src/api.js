// Imports
const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http')
const cors = require('cors');
const questionShema = require('./modules/questionShema');

// Express Instance
const app = express();
const router = express.Router();



app.use('/.netlify/functions/api', router)

// Connect to Database, then start express app
var mongoDbUri = 'mongodb+srv://tos:IfhWYIlA70YTitpA@truthorshot.n259x.mongodb.net/Questions?retryWrites=true&w=majority'
mongoose.connect(mongoDbUri, { useNewUrlParser: true })
	.then((result) => {
		console.log('Connected to Database!');
		app.listen(3000, () => console.log('Listen to 3000!'));
		app.use(express.json());
		app.use(cors());
		app.use(express.static('public'))
	})
	.catch((err) => {
		console.log(err);
	});

module.exports.handler = serverless(app)
