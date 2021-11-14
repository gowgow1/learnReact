import * as actions from './actionTypes';

const unLogin = { isAuth: false, name: '', email: '', token: '' };

export default function user(state = unLogin, { type, payload }) {
	switch (type) {
		case actions.SET_USER:
			return payload.user;
		case actions.DELETE_USER:
			return unLogin;
		case actions.USER_LOGIN:
			return { ...state, ...payload };
		default:
			return state;
	}
}
