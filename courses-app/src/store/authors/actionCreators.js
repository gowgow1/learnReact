import * as actions from './actionTypes';

export const addAuthor = (item) => ({
	type: actions.ADD_AUTHOR,
	payload: { item },
});

export const deleteAuthor = (id) => ({
	type: actions.DELETE_AUTHOR,
	payload: { id },
});

export const initAuthors = (items) => ({
	type: actions.INIT_AUTHOR_LIST,
	payload: { items },
});
