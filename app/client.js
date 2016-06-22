import babelPolyfill from 'babel-polyfill';
import createElement from 'fluxible-addons-react/createElementWithContext';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import React from 'react';
import app from './app';

injectTapEventPlugin();

const dehydratedState = window.App;

window.React = React;
window.ReactDOM = ReactDOM;

app.rehydrate(dehydratedState, (err, context) => {
	if (err) {
		throw err;
	}

	window.context = context;
	const mountNode = document.getElementById('container');
	ReactDOM.render(createElement(context), mountNode);
});
