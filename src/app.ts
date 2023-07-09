import express, { Express } from "express";
import { router } from "./api";
import { connect } from "mongoose";
import cors from "cors";
import * as dotenv from 'dotenv';

// Express Instance
const app: Express = express();

dotenv.config();
const mongoDbUri: string = process.env.MONGODB_URI || '';

if(mongoDbUri == '') {
	process.exit(1);
}

app.use('/api', router)
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

run().catch(err => console.log(err));

async function run() {
	// set('strictQuery', true);
	await connect(mongoDbUri);
	console.log('Connected to Database!');
	app.listen(3000, () => console.log('Listen to 3000!'));
}