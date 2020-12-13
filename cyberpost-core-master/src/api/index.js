import { Router } from 'express';
import providers from './providers';
import User from '../models/Users';
import { uid } from 'rand-token';
import { request } from 'http';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	// -> we have no resources

	// succes message
	function success(res, message) {
		res.json({
			status: 'success',
			message,
		})

	}

	// fail messasge
	function fail(res, message, detailed_message) {
		res.json({
			status: 'fail',
			message,
			detailed_message
		})

	}
	// perhaps expose some API metadata at the root
	api.post('/send/:provider', (req, res, error) => {
		const responseCallbacks = {
			success: (message) => {
				res.json({
					status: 'success',
					message: 'The mail has been send successfully!',
					provider_message: message || undefined
				});
				res.end();
			},
			fail: (error) => {
				res.json({
					status: 'fail',
					message: 'There was an error while sending the mail',
					provider_message: error || undefined
				});
				res.end();
			}
		}

		var provider = providers[req.params.provider] || null;
		if (provider === null) {
			res.json({ status: 'provider_not_found', message: 'The requested provider is not avaible.' });
		}
		else {
			let mail = req.body; // i know that this mail object has been validated by my middleware

			mail = provider.convertMail(mail);
			provider.sendMail(mail, responseCallbacks.success, responseCallbacks.fail);
		}
	});

	api.post('/register', (req, res) => {
		User.userExists(req.body.username, req.body.email, (err, user) => {
			console.log(user);
			if (user) {
				fail(res, 'This email or username alreadyed taken');
			}
			else {
				var token = uid(32)
				const newUser = new User({ username: req.body.username, email: req.body.email, password: req.body.password, api_key: 'CyberPost-' + token });
				newUser.save().then(() => {
					success(res, 'Registering successfully');
				})
				.catch((err) => {
					fail(res, err.message);
				});
			}
		});
	});

	api.post('/login', (req, res) => {

		User.authenticate(req.body.username, req.body.password, (err, user) => {
			if (err) {
				fail(res, 'Bad user name or password');
				console.log(user);
			}
			else if (user) {
				req.session.user = user;
				req.session.loggedIn = true;
				success(res, 'Login successfully');
			}
			else {
				fail(res, 'Bad user name or password');
			}
		});
	});

	// GET /logout
	api.get('/logout', function (req, res, next) {
		req.session.destroy();
		res.redirect('/login')
	});
	
	return api;
}