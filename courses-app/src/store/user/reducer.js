import * as actions from './actionTypes';

const def = { isAuth: '', name: '', email: '', token: '', role: '' };

export default function user(state = def, { type, payload }) {
	switch (type) {
		case actions.DELETE_USER:
			return def;
		case actions.USER_LOGIN:
			return { ...payload };
		default:
			return state;
	}
}
