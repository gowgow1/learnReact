import * as actions from './actionTypes';

export const addCourse = (item) => ({
	type: actions.ADD_COURSE,
	payload: { item },
});

export const deleteCourse = (id) => ({
	type: actions.DELETE_COURSE,
	payload: { id },
});

export const initCourses = (items) => ({
	type: actions.INIT_COURSE_LIST,
	payload: { items },
});

export const updateCourse = (item) => ({
	type: actions.UPDATE_COURSE,
	payload: { item },
});
