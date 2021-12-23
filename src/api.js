// Imports
const express = require('express');
const serverless = require('serverless-http')
const cors = require('cors');
const router = require('./router.js')

// Express Instance
const app = express();

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
