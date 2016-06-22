import config from '../config/configPublic.json';
import React from 'react';

class Html extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<html>
				<head>
					<meta charSet="utf-8"/>
					<meta httpEquiv="X-UA-Compatible" wrapper="IE=edge" />
					<meta name="viewport" wrapper="width=device-width, initial-scale=1, shrink-to-fit=no" />
					<title>{"Giphy Trends"}</title>
					<link href='https://fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css' />
					<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
					<link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.purple-pink.min.css" />
					<link rel="stylesheet" href="css/style.css" type='text/css' />
				</head>
				<body id="body">
					<div id="container" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
					<script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
					<script src="bundle.js"></script>
					<script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>
				</body>
			</html>
		);
	}
}

export default Html;
