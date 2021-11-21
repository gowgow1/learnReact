import { loginUser } from './actionCreators';
import { service } from '../../services/services';

export const asyncLoginUser = (token) => async (dispatch) => {
	const { result, successful } = await service.getUser(token);
	if (successful) dispatch(loginUser(token, result));
};
