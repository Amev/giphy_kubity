function activeDialogAction(context, payload) {
	context.dispatch('ACTIVE_DIALOG_ACTION', {dialog: payload.dialog});
}

export default activeDialogAction;
