import * as actions from './actionTypes';

export const deleteUser = () => ({
	type: actions.DELETE_USER,
});

export const loginUser = (token, { name, email, role }) => ({
	type: actions.USER_LOGIN,
	payload: { isAuth: true, name, token, email, role },
});
