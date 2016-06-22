import ApplicationStore from '../stores/ApplicationStore';
import Component from '../components/Application.jsx';
import RouteStore from '../stores/RouteStore';
import Fluxible from 'fluxible';

let app = new Fluxible({
	component: Component,
	stores: [
		ApplicationStore,
		RouteStore
	]
});

export default app;
