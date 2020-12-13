import { Router } from 'express';
import validateMiddleware from './validate-mail';

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here
	routes.use(validateMiddleware);

	return routes;
}