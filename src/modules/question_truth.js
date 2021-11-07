const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionShema = new Schema({
	text: {
		type: String,
		required: true,
	}
}, { collection: 'truth'});

const Truth = mongoose.model('Truth', questionShema);
module.exports = Truth;