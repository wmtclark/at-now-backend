import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRouter from './router';

dotenv.config({ silent: true });

const app = express();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/at_now';
mongoose.connect(mongoURI);
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// additional init stuff should go before hitting the routing
app.use('/api', apiRouter);

// default index route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
