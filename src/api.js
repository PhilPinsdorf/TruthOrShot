//Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const secret = require('./modules/secrets.js');
const Question = require('./modules/Question.js');
const path = require('path');
const favicon = require('serve-favicon');
const serverless = require('serverless-http')

//Express Instance
const app = express();
const router = express.Router();
app
	.use(express.static('public'))
	.use(cors())

router.get('/sound', (req, res) => {
  res.sendFile(path.resolve('./sounds/next_card.mp3'))
})

router.get('/newquestion', (req, res) => {
  // Get the count of all questions
  Question.count().exec(function (err, count) {

  // Get a random entry
  var random = Math.floor(Math.random() * count)

  // Again query all users but only fetch one offset by our random #
  Question.findOne().skip(random).exec(
    function (err, result) {
      // Random Question
      if (err) throw err
      res.status(200).send(result.text)
    })
  })
})

app.use('/.netlify/functions/api', router)

//Database Connection and opening of Port
mongoose.connect(secret.mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log('Connected to Database');
		app.listen(3000, () => console.log('Listen to 3000'));
		app.use(express.json());
		app.use(cors());
	})
	.catch((err) => {
		console.log(err);
	});

  module.exports.handler = serverless(app)

