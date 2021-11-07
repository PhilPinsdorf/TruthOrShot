//Imports
const mongoose = require('mongoose');
const secret = require('../modules/secrets.js');
const never = require('../modules/question_never');
const rather = require('../modules/question_rather');
const truth = require('../modules/question_truth');
const fs = require('fs');

//Database Connection and opening of Port
mongoose.connect(secret.mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
        try {
            // read contents of the file
            const never_txt = fs.readFileSync('./Nochnie.txt', 'UTF-8');
            const rather_txt = fs.readFileSync('./Eher.txt', 'UTF-8');
            const truth_txt = fs.readFileSync('./Wahrheit.txt', 'UTF-8');

            // split the contents by new line
            const never_lines = never_txt.split(/\r?\n/);
            const rather_lines = rather_txt.split(/\r?\n/);
            const truth_lines = truth_txt.split(/\r?\n/);

            // add to db never
            console.log(" ")
            console.log("Never: ")
            never_lines.forEach((line) => {
                never.findOne( {text: line}, (err, result) => {
                    if (result) {
                        console.log('Exists')
                    } else {
                        var doc = new never({
                            text: line
                        }) 

                        doc.save((err, quest) => {
                            if (err) return console.log(err);
                            console.log('Added');
                        })
                    }
                })
            });

            // add to db rather
            console.log(" ")
            console.log("Rather: ")
            rather_lines.forEach((line) => {
                rather.findOne( {text: line}, (err, result) => {
                    if (result) {
                        console.log('Exists')
                    } else {
                        var doc = new rather({
                            text: line
                        }) 

                        doc.save((err, quest) => {
                            if (err) return console.log(err);
                            console.log('Added');
                        })
                    }
                })
            });

            // add to db truth
            console.log(" ")
            console.log("Truth: ")
            truth_lines.forEach((line) => {
                truth.findOne( {text: line}, (err, result) => {
                    if (result) {
                        console.log('Exists')
                    } else {
                        var doc = new truth({
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

