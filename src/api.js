//Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const secret = require('./modules/secrets.js');
const Question = require('./modules/Question.js');
const path = require('path');
const favicon = require('serve-favicon');
const serverless = require('serverless-http')
const never = require('./modules/question_never');
const rather = require('./modules/question_rather');
const truth = require('./modules/question_truth');

//Express Instance
const app = express();
const router = express.Router();
app
	.use(express.static('public'))
	.use(cors())
  .use(favicon('./images/favicon.ico'))

router.get('/sound', (req, res) => {
  res.sendFile('./sounds/next_card.mp3')
})

var collections = [never, rather, truth]

router.get('/newquestion', (req, res) => {
  var doc = collections[Math.floor(Math.random() * collections.length)]

  // Get the count of all questions
  doc.count().exec(function (err, count) {

  // Get a random entry
  var random = Math.floor(Math.random() * count)

  var color = "#FAFAFA"
  if (doc === never) color = "#fbd1d1";
  if (doc === rather) color = "#c9f7f9";
  if (doc === truth) color = "#d4f9c6";

  // Again query all users but only fetch one offset by our random #
  doc.findOne().skip(random).exec(
    function (err, result) {
      // Random Question
      if (err) throw err
        res.status(200).send({
          text: result.text,
          color: color
      })
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

