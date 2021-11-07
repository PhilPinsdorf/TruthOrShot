const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionShema = new Schema({
	text: {
		type: String,
		required: true,
	}
}, { collection: 'never'});

const Never = mongoose.model('Never', questionShema);
module.exports = Never;