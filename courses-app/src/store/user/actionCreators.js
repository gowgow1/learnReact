import * as actions from './actionTypes';

export const setUser = (user) => ({
	type: actions.SET_USER,
	payload: { user },
});

export const deleteUser = () => ({
	type: actions.DELETE_USER,
});

export const loginUser = (token, { name, email }) => ({
	type: actions.USER_LOGIN,
	payload: { isAuth: true, name, token },
});
