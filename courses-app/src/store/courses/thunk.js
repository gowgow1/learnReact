// import { deleteCourse } from './actionCreators';
import { service } from '../../services/services';
import {
	deleteCourse,
	updateCourse,
	addCourse,
	initCourses,
} from './actionCreators';

export const asyncInitCourses = () => async (dispatch) => {
	const { successful, result } = await service.getCourses();
	if (successful) dispatch(initCourses(result));
};
export const asynDeleteCourse = (id, token) => async (dispatch) => {
	const { successful } = await service.deleteCourse(id, token);
	if (successful) dispatch(deleteCourse(id));
};

export const asyncUpdateCourse = (token, course) => async (dispatch) => {
	const { successful, result } = await service.updateCourse(
		course.id,
		course,
		token
	);
	if (successful) dispatch(updateCourse(result));
};

export const asyncAddCourse = (token, course) => async (dispatch) => {
	const { successful, result } = await service.addCourse(course, token);
	if (successful) dispatch(addCourse(result));
};
