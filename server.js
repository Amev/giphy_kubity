import createElementWithContext from 'fluxible-addons-react/createElementWithContext';
import HtmlComponent from './components/Html.jsx';
import config from './config/configServer.json';
import {navigateAction} from 'fluxible-router';
import serialize from 'serialize-javascript';
import ReactServer from 'react-dom/server';
import Trends from 'google-trends-api';
import compression from 'compression';
import bodyParser from 'body-parser';
import app from './app/app.js';
import express from 'express';
import React from 'react';
import path from 'path';

let component = React.createFactory(HtmlComponent);
let server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(compression());
server.set('json spaces', 0);

server.use((req, res, next) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, x-access-token');
	res.set('Access-Control-Allow-Methods', 'DELETE, GET, PUT, POST');
	if (req.method == 'OPTIONS') {
		if (req.headers['access-control-request-method']
			&& (req.headers['access-control-request-method'] === 'GET'
				|| req.headers['access-control-request-method'] === 'DELETE'
				|| req.headers['access-control-request-method'] === 'POST'
				|| req.headers['access-control-request-method'] === 'PUT')) {
			res.set('Access-Control-Allow-Origin', '*');
			res.set('Access-Control-Allow-Headers', 'x-access-token, content-type');
			return res.send();
		}
	}
	return next();
});

server.use('/api/trends/:localization', (req, res, next) => {
	let localization = req.params.localization;

	if (localization !== 'FR' && localization !== 'US' && localization !== 'BR'
			&& localization !== 'GB') {
		res.status(404).json({
			code : 404,
			message: "Bad Request",
			informations: "Incorrect localization"
		});
		return ;
	}
	return new Promise((resolve, reject) => {
		return Trends.hotTrends(localization).then((result) => {
			resolve(result);
		});
	}).then((trends) => {
		res.status(200).json({trends: trends});
	}).catch((error) => {
		console.log(error);
		res.status(404).json({
			code : 500,
			message: "Internal Error",
			informations: "Fetching Trends Error, plz check internet connection"
		});
	});
});

server.use(express.static(__dirname + '/build'));

server.use('/', (req, res, next) => {
	var context = app.createContext();
	context.executeAction(navigateAction, {url: req.url}, (error) => {
		if (error) {
			res.status(404).json({
				informations: 'Page not Found',
				message: 'Bad request',
				code : 404
			});
		} else {
			var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';'
			var contextComponent = context.getComponentContext();
			var html = ReactServer.renderToStaticMarkup(component({
				state: exposed,
				markup: ReactServer.renderToString(createElementWithContext(context)),
				context: contextComponent
			}));
			res.send(html);
		}
	});
});

server.set('port', config.port);
server.listen(server.get('port'), "127.0.0.1", function() {
	console.log('Server started: http://localhost:' + server.get('port') + '/');
});
