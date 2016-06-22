import {navigateAction} from 'fluxible-router';
import React from 'react';

class Menu extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
		this.handleNavAction = this.handleNavAction.bind(this);
	}

	handleNavAction(event) {
		event.preventDefault();
		let id = event.target.id;
		let url = id && (id === "US" || id === "GB" || id === "BR") ? "/" + id : "/";

		this.context.executeAction(navigateAction, {url: url});
	}

	render() {
		return (
			<div className="mdl-layout mdl-js-layout">
				<header className="mdl-layout__header">
					<div className="mdl-layout__header-row">
						<span className="mdl-layout-title" onClick={this.handleNavAction}>
							Giphy Trends
						</span>
						<div className="mdl-layout-spacer"></div>
						<nav className="mdl-navigation mdl-layout--large-screen-only">
							<a className="mdl-navigation__link" id="US"
								onClick={this.handleNavAction}>Etats-Unis</a>
							<a className="mdl-navigation__link" id="GB"
								onClick={this.handleNavAction}>Royaume-Uni</a>
							<a className="mdl-navigation__link" id="BR"
								onClick={this.handleNavAction}>Bresil</a>
						</nav>
					</div>
				</header>
				<main className="mdl-layout__content">
					{this.props.children}
					<div onClick={this.handleNavAction} id="US">US</div>
				</main>
			</div>
		);
	}
}

export default Menu;
