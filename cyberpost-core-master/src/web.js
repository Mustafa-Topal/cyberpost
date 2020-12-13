import { Router } from 'express';
import User from './models/Users';

export default ({ config, db }) => {
    let web = Router();
    // PORT
    web.get('/', (req, res) => {
        if (req.session.loggedIn === true) {
            // take user elements
            res.render('dashboard', { user: req.session.user } );
        } else {
            res.redirect('/login');
        }
    })
    // load ABOUT page
    web.get('/about', (req, res) => {
        res.render('about', { });
    })
    // load LOGIN page
    web.get('/login', (req, res) => {
        res.render('login', { });
    })
    // load REGISTER page
    web.get('/register', (req, res) => {
        res.render('register', { });
    })
    // load DASHBOARD page
    web.get('/dashboard', (req, res) => {
            if (req.session.loggedIn === true) {
                // take user elements
                res.render('dashboard', { user: req.session.user } );
            } else {
                res.redirect('/login');
            }
    })
    return web;
}



