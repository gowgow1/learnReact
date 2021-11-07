import * as actions from './actionTypes';

export const addCourse = (item) => ({
	type: actions.ADD_COURSE,
	payload: { item },
});

export const deleteCourse = (id) => ({
	type: actions.DELETE_COURSE,
	payload: { id },
});
