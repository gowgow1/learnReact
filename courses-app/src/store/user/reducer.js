import * as actions from './actionTypes';

export default function user(state = null, { type, payload }) {
	switch (type) {
		case actions.SET_USER:
			return payload.user;
		case actions.DELETE_USER:
			return null;
		default:
			return state;
	}
}
