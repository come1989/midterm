const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');

class App {
    constructor () {
        this.app = express();

        //------------------------------    view engine setting
        this.setViewEngine();

        //------------------------------    middleware setting
        this.setMiddleWare();

        //------------------------------    add static directory
        this.setStatic();

        //------------------------------    local variable
        this.setLocals();

        //------------------------------    routing
        this.getRouting();

        //------------------------------    404
        this.status404();

        //------------------------------    error handler
        this.errorHandler();
    }

    getRouting () {
        this.app.use(require('./controllers'));
    }

    setViewEngine () {
        nunjucks.configure('template', {
            autoescape: true,
            express: this.app
        });
    }

    setMiddleWare () {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    setStatic () {
        this.app.use('/uploads', express.static('uploads'));
    }

    setLocals () {
        this.app.use( (req, res, next) => {
            this.app.locals.isLogin = true;
            this.app.locals.req_path = req.path;
            next();
        });
    }

    status404 () {        
        this.app.use((req, res, next) => {
            res.status(404).render('common/404.html');
        });
    }

    errorHandler () {
        this.app.use((err, req, res, next) => {
            console.log(err);
            res.status(500).render('common/500.html');
        });
    }
}

module.exports = new App().app;

        /*      wrong constructor code I made (wrong sequence)
                (~) -> (local variable) -> (~) -> (routing) -> (~)
        //------------------------------    routing
        this.getRouting();

        //------------------------------    view engine setting (nunjucks)
        this.setViewEngine();

        //------------------------------    middleware setting
        this.setMiddleWare();

        //------------------------------    add static directory
        this.setStatic();

        //------------------------------    local variable
        this.setLocals();

        //------------------------------    404
        this.status404();

        //------------------------------    error handler
        this.errorHandler();
        */