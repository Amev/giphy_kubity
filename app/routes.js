import throwNotFoundAction from '../actions/throwNotFoundAction';
import getTrendsAction from '../actions/getTrendsAction';
import Home from '../components/Home.jsx';

export default {
	home: {
		path: '/',
		method: 'get',
		handler: Home,
		label: 'Home',
		action: getTrendsAction
	},
	us: {
		path: '/US',
		method: 'get',
		handler: Home,
		label: 'US',
		action: getTrendsAction
	},
	gb: {
		path: '/GB',
		method: 'get',
		handler: Home,
		label: 'GB',
		action: getTrendsAction
	},
	br: {
		path: '/BR',
		method: 'get',
		handler: Home,
		label: 'BR',
		action: getTrendsAction
	},
	notFound: {
		path: '/*',
		method: 'get',
		handler: Home,
		label: 'Home',
		action: throwNotFoundAction
	}
};
