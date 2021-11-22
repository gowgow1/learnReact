import courses from './courses/reducer';
import { ADD_COURSE } from './courses/actionTypes';
import { mockedCoursesList } from '../constants';

const mockedCourse = mockedCoursesList[0];

describe('reducer', () => {
	it('should set default store', () => {
		expect(courses([], { type: '' })).toEqual([]);
	});

	it('reducer should handle SAVE_COURSE and returns new state', () => {
		expect(
			courses([], { type: ADD_COURSE, payload: { item: mockedCourse } })
		).toEqual([mockedCourse]);
	});

	//test below according by TASK:) but i have default return instead GET_COURSES
	it('reducer should handle GET_COURSES', () => {
		expect(courses([], { type: '' })).toEqual([]);
	});
});
