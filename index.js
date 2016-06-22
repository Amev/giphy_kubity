require("babel-polyfill");
require("babel-register")({
	presets: ['es2015', 'stage-0', 'react'],
	plugins: ["transform-decorators-legacy"],
	extensions: [".js"]
});

var server = require('./server.js');
