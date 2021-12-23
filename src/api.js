// Imports
const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http')
const cors = require('cors');
const questionShema = require('./modules/questionShema');

// Express Instance
const app = express();
const router = express.Router();
app.use(cors());
app.use(express.static('public'))

// Route to new question
router.get('/newquestion', (req, res) => {
    var doc = questionShema[Math.floor(Math.random() * questionShema.length)]
  
    // Get the count of all questions
    doc.count().exec(function (err, count) {
        //Set Color and Title to corresponding Document
        var color = ""
        var title = ""
    
        switch (doc) {
            case questionShema[0]:
            color = "#FF5D4E";
            title = "ICH HAB NOCH NIE";
            break;
            
            case questionShema[1]:
            color = "#85E8E0";
            title = "WER WÜRDE EHER";
            break;
    
            case questionShema[2]:
            color = "#47D98B";
            title = "WAHRHEIT";
            break;
        }
  
        // Get a random entry from the Document
        var random = Math.floor(Math.random() * count)
    
        //Load all Questions from the Document but only get the one with the offset from our random number
        doc.findOne().skip(random).exec((err, result) => {
            if (err) throw err
    
            //Send Back Data from the Choosen entry
            res.status(200).send({
            text: result.text,
            title: title,
            color: color
            })
        })
    })
})

app.use('/.netlify/functions/api', router)

// Connect to Database, then start express app
var mongoDbUri = 'mongodb+srv://tos:IfhWYIlA70YTitpA@truthorshot.n259x.mongodb.net/Questions?retryWrites=true&w=majority'
mongoose.connect(mongoDbUri, { useNewUrlParser: true })
	.then((result) => {
		console.log('Connected to Database!');
		app.listen(3000, () => console.log('Listen to 3000!'));
		app.use(express.json());
	})
	.catch((err) => {
		console.log(err);
	});

module.exports.handler = serverless(app)
