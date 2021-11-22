import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import Courses from '../Courses';
import * as selectors from '../../../store/selectors';
import { mockedAuthorsList, mockedCoursesList } from '../../../constants';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: jest.fn(),
}));

jest.mock('../../../store/selectors', () => ({
	getCourses: jest.fn(),
	getAuthors: jest.fn(),
	getUser: jest.fn(),
}));

jest.spyOn(reactRedux, 'useDispatch');

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		token: 'ddd32432-34324sfs-few2113',
		role: 'admin',
		email: 'test@test.ru',
	},
	courses: mockedCoursesList,
	authors: mockedAuthorsList,
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

beforeEach(() => {
	selectors.getAuthors.mockReturnValue(mockedState.authors);
	selectors.getCourses.mockReturnValue(mockedState.courses);
	selectors.getUser.mockReturnValue(mockedState.user);
});

afterEach(() => {
	selectors.getAuthors.mockClear();
	selectors.getCourses.mockClear();
	selectors.getUser.mockClear();
});

describe('Courses', () => {
	it('Courses rendered', () => {
		const { container } = render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);
		expect(container).toMatchSnapshot();
	});

	it('displays all courses from courses array', () => {
		const { getAllByTestId } = render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);
		expect(getAllByTestId('card')).toHaveLength(mockedCoursesList.length);
	});

	//I dont know but mutcher 'toBeEmptyDOMElement' doesn't work from this library
	// it('should display Empty container if courses array length is 0', () => {
	// 	selectors.getCourses.mockReturnValue([]);
	// 	const { getByTestId } = render(
	// 		<Provider store={mockedStore}>
	// 			<BrowserRouter>
	// 				<Courses />
	// 			</BrowserRouter>
	// 		</Provider>
	// 	);
	// 	expect(getByTestId('cards-wrapper')).toBeEmptyDOMElement();
	// });

	it('should be redirect to courseAdd after click on button', () => {
		const historyMock = jest.fn();
		useHistory.mockReturnValue({
			location: {
				pathname: 'http://localhost:3000/courses/add',
			},
			push: historyMock,
		});
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);
		const add = screen.getByTestId('add');
		fireEvent.click(add);
		expect(historyMock).toHaveBeenCalledWith('/courses/add');
	});
});
