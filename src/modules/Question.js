const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionShema = new Schema({
	text: {
		type: String,
		required: true,
	}
}, { collection: 'Question'});

const Question = mongoose.model('Question', questionShema);
module.exports = Question;