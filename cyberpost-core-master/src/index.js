import http from 'http';
import path from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import web from './web';
import config from './config.json';
import cookieParser from 'cookie-parser';
import session from 'express-session';

let app = express();

// session
app.set('trust proxy', 1)

app.server = http.createServer(app);

// body-parse middleware 
app.use(bodyParser.json({
	limit: config.bodyLimit
}));
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

// logger
app.use(morgan('dev'));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(cookieParser());
app.use(session({
	secret: 'dashboar userpass',
	resave: false,
	saveUninitialized: true
}))

// view engine 
app.set('views', path.resolve( __dirname, './views/pages' ));
app.set('view engine', 'pug');

// connect to db
initializeDb(db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// public static 
	app.use('/public', express.static(__dirname + '/public'));
	
	// web router
	app.use('/', web({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;