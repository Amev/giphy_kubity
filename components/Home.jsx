import Menu from './Menu.jsx';
import React from 'react';

class Home extends React.Component {

	static contextTypes = {
		getStore: React.PropTypes.func,
		executeAction: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
	}

	render() {
		let trends = [];

		this.props.trends.map((trend, index) => {
			let src = trend && trend.giphy && trend.giphy.images ? trend.giphy.images.fixed_height.url : '';

			if (src) {
				let style = {background: "url('" + src + "') center / cover"};

				trends.push(
					<div key={index} className="mdl-cell mdl-cell--3-col">
						<div className="demo-card-image mdl-card mdl-shadow--2dp" style={style}>
							<div className="mdl-card__title mdl-card--expand"></div>
							<div className="mdl-card__actions">
							    <span className="demo-card-image__filename">{trend.trend}</span>
							</div>
						</div>
					</div>
				);
			}
		});
		return (
			<div>
				<Menu url={this.props.url}>
					<div className="mdl-grid">
						{trends}
					</div>
				</Menu>
			</div>
		);
	}
}

export default Home;
