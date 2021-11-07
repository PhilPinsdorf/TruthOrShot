const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionShema = new Schema({
	text: {
		type: String,
		required: true,
	}
}, { collection: 'rather'});

const Rather = mongoose.model('Rather', questionShema);
module.exports = Rather;