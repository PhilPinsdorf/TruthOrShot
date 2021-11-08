//Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const secret = require('./modules/database.js');
const serverless = require('serverless-http')
const never = require('./modules/collections/question_never');
const rather = require('./modules/collections/question_rather');
const truth = require('./modules/collections/question_truth');

//Express Instance
const app = express();
const router = express.Router();
app
	.use(express.static('public'))
	.use(cors())

var collections = [never, rather, truth]

router.get('/newquestion', (req, res) => {
  var doc = collections[Math.floor(Math.random() * collections.length)]

  // Get the count of all questions
  doc.count().exec(function (err, count) {

  // Get a random entry
  var random = Math.floor(Math.random() * count)

  var color = "#FAFAFA"
  var title = "Title"

  /*
    Future Colors:
    Red: #FF5D4E
    Orange: #FF9A00
    Yellow: #FFFF3D
    Blue: #85E8E0
    Green: #47D98B
  */

  if (doc === never) {
    color = "#FF5D4E";
    title = "ICH HAB NOCH NIE";
  }

  if (doc === rather) {
    color = "#85E8E0";
    title = "WER WÜRDE EHER";
  }

  if (doc === truth) {
    color = "#47D98B";
    title = "WAHRHEIT";
  }

  // Again query all users but only fetch one offset by our random #
  doc.findOne().skip(random).exec(
    function (err, result) {
      // Random Question
      if (err) throw err
        res.status(200).send({
          text: result.text,
          title: title,
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

