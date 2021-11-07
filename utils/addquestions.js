//Imports
const mongoose = require('mongoose');
const secret = require('../modules/secrets.js');
const Question = require('../modules/Question.js');
const fs = require('fs');

//Database Connection and opening of Port
mongoose.connect(secret.mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
        try {
            // read contents of the file
            const data = fs.readFileSync('./text.txt', 'UTF-8');

            // split the contents by new line
            const lines = data.split(/\r?\n/);

            // print all lines
            lines.forEach((line) => {
                Question.findOne( {text: line}, (err, result) => {
                    if (result) {
                        console.log('Exists')
                    } else {
                        var doc = new Question({
                            text: line
                        }) 

                        doc.save((err, quest) => {
                            if (err) return console.log(err);
                            console.log('Added');
                        })
                    }
                })
            });
        } catch (err) {
            console.error(err);
        }
	})
	.catch((err) => {
		console.log(err);
	});

