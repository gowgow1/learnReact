import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import CourseForm from '../CourseForm';
import * as selectors from '../../../store/selectors';
import { mockedAuthorsList, mockedCoursesList } from '../../../constants';

const mockedState = {
	user: {
		isAuth: true,
		name: 'alex',
		token: 'fasdasdaf123',
		role: 'admin',
		email: 'admin@email.ru',
	},
	courses: mockedCoursesList,
	authors: mockedAuthorsList,
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: jest.fn(),
}));

jest.mock('../../../store/selectors', () => ({
	getCourses: jest.fn(),
	getAuthors: jest.fn(),
	getUser: jest.fn(),
}));

window.alert = jest.fn();

const useDispatchSpyOn = jest.spyOn(reactRedux, 'useDispatch');

beforeEach(() => {
	selectors.getAuthors.mockReturnValue(mockedState.authors);
	selectors.getCourses.mockReturnValue(mockedState.courses);
	selectors.getUser.mockReturnValue(mockedState.user);
	reactRedux.useDispatch.mockReturnValue(jest.fn());
});

afterEach(() => {
	selectors.getAuthors.mockClear();
	selectors.getCourses.mockClear();
	selectors.getUser.mockClear();
	reactRedux.useDispatch.mockClear();
});

describe('CourseForm', () => {
	it('should be rendered', () => {
		const { container } = render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseForm />
				</BrowserRouter>
			</Provider>
		);
		expect(container).toMatchSnapshot();
	});

	it('should show authors', () => {
		const { queryAllByTestId } = render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseForm />
				</BrowserRouter>
			</Provider>
		);
		expect(queryAllByTestId('authors')).toHaveLength(mockedAuthorsList.length);
	});

	it('"createAuthor" should call dispatch', () => {
		const { getByTestId } = render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseForm />
				</BrowserRouter>
			</Provider>
		);

		fireEvent.click(getByTestId('createAuthor'));
		expect(useDispatchSpyOn).toHaveBeenCalled();
	});

	it('"Add author" add an author in author list', () => {
		const { getAllByTestId, getByTestId } = render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseForm />
				</BrowserRouter>
			</Provider>
		);
		const addAuthor = getAllByTestId('addAuthor');
		fireEvent.click(addAuthor[0]);
		expect(getByTestId('choosenAuthor')).toBeTruthy();
	});

	it('"Delete Author" should delte author from current authors list', () => {
		const { getAllByTestId, getByTestId } = render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseForm />
				</BrowserRouter>
			</Provider>
		);
		const addAuthors = getAllByTestId('addAuthor');
		expect(addAuthors).toHaveLength(mockedAuthorsList.length);
		fireEvent.click(addAuthors[0]);
		expect(getAllByTestId('addAuthor')).toHaveLength(
			mockedAuthorsList.length - 1
		);
		fireEvent.click(getByTestId('deleteAuthor'));
		expect(getAllByTestId('addAuthor')).toHaveLength(mockedAuthorsList.length);
	});
});
