import { addAuthor, initAuthors } from './actionCreators';
import { service } from '../../services/services';

export const asyncAddAuthor = (item, token) => async (dispatch) => {
	const { successful, result } = await service.addAuthor(item, token);
	if (successful) dispatch(addAuthor(result));
};

export const asyncInitAuthors = () => async (dispatch) => {
	const { successful, result } = await service.getAuthors();
	if (successful) dispatch(initAuthors(result));
};
