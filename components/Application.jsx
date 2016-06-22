import {connectToStores, provideContext} from 'fluxible-addons-react';
//import closeErrorAction from '../actions/closeErrorAction';
import ApplicationStore from '../stores/ApplicationStore';
import {handleHistory} from 'fluxible-router';
import Home from './Home.jsx';
import React from 'react';

@provideContext
@handleHistory
@connectToStores([ApplicationStore], (context) => {
	return context.getStore(ApplicationStore).getState();
})
class Application extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
		this.handleCloseError = this.handleCloseError.bind(this);
	}

	handleCloseError(reason) {
		this.context.executeAction(closeErrorAction, {});
	}

	render() {
		let Handler = Home, url = '', isError = false, errorMsg = '';

		if (this.props.currentRoute && this.props.currentRoute.handler) {
			Handler = this.props.currentRoute.handler;
			url = this.props.currentRoute.url;
		}
		if (this.props.error && this.props.error.informations) {
			errorMsg = <span>{this.props.error.informations}</span>;
			isError = true;
		}
		return (
			<div>
				<div>
					{errorMsg}
					<Handler url={url} trends={this.props.trends} />
				</div>
			</div>
		);
	}
}

export default Application;
