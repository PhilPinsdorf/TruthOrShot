const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionShemaNever = new Schema({
	text: {
		type: String,
		required: true,
	}
}, { collection: 'never'});

const questionShemaRather = new Schema({
	text: {
		type: String,
		required: true,
	}
}, { collection: 'rather'});

const questionShemaTruth = new Schema({
	text: {
		type: String,
		required: true,
	}
}, { collection: 'truth'});

const Never = mongoose.model('Never', questionShemaNever);
const Rather = mongoose.model('Rather', questionShemaRather);
const Truth = mongoose.model('Truth', questionShemaTruth);

module.exports = [Never, Rather, Truth];