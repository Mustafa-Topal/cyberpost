import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';

var app = express();
var MongoStore = require('connect-mongo')(session);
	// body-parse middleware 
	app.use(bodyParser.json({
}));

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	mongoose.connect('mongodb://localhost:27017/cyberpost');
	var db = mongoose.connection;

	// use sessions for tracking logins
	app.use(session({
		secret: 'work hard',
		resave: true,
		saveUninitialized: false,
		store: new MongoStore({
			mongooseConnection: db
		})
	}));
	callback(db);
}