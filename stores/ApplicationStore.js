import {BaseStore} from 'fluxible/addons';

class ApplicationStore extends BaseStore {

	constructor(dispatcher) {
		super(dispatcher);
		this.success = {};
		this.dialog = '';
		this.trends = [];
		this.error = {};
	}

	getState() {
		return {
			success: this.success,
			dialog: this.dialog,
			trends: this.trends,
			error: this.error
		};
	}

	onReceiveError(payload) {
		if (payload.data.message && payload.data.code && payload.data.informations) {
			this.error = payload.data;
			this.emitChange();
		}
	}

	onReceiveSuccess(payload) {
		if (payload && payload.data && payload.data.message) {
			this.success = payload.data;
			this.emitChange();
		}
	}

	onActiveDialog(payload) {
		this.dialog = payload.dialog;
		this.emitChange();
	}

	onCloseDialog(payload) {
		this.dialog = '';
		this.emitChange();
	}

	onCloseError(payload) {
		this.error = {};
		this.emitChange();
	}

	onCloseSuccess(payload) {
		this.success = {};
		this.emitChange();
	}

	onReceiveTrends(payload) {
		this.trends = payload.trends || [];
		this.emitChange();
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.success = state.success;
		this.dialog = state.dialog;
		this.trends = state.trends;
		this.error = state.error;
	}
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
	'CLOSE_SUCCESS_ACTION': 'onCloseSuccess',
	'ACTIVE_DIALOG_ACTION': 'onActiveDialog',
	'CLOSE_DIALOG_ACTION': 'onCloseDialog',
	'GET_TRENDS_ACTION': 'onReceiveTrends',
	'CLOSE_ERROR_ACTION': 'onCloseError',
	'SUCESS_ACTION': 'onReceiveSuccess',
	'ERROR_ACTION': 'onReceiveError',
};

export default ApplicationStore;
