import * as reactRedux from 'react-redux';
import { render } from '@testing-library/react';
import CourseCard from '../CourseCard';
import { Provider } from 'react-redux';
import timeFormat from '../../../../../helpers/timeFormat';

const mockedState = {
	isAuth: true,
	name: 'Alex',
	token: '123123',
	role: 'user',
	email: 'alex@test.ru',
};

const mockedCourse = {
	id: 123,
	title: 'Course',
	description: 'description',
	created: '12/12/2021',
	duration: 123,
	author: ['Pau', 'Pau'],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
}));

jest.spyOn(reactRedux, 'useDispatch');

beforeEach(() => {
	reactRedux.useSelector.mockReturnValue(mockedState);
});
afterEach(() => {
	reactRedux.useSelector.mockClear();
});

describe('Course Card', () => {
	it('should render', () => {
		const { container } = render(
			<Provider store={mockedStore}>
				<CourseCard {...mockedCourse} />
			</Provider>
		);
		expect(container).toMatchSnapshot();
	});

	it('CourseCard has title', () => {
		const { getByText } = render(
			<Provider store={mockedStore}>
				<CourseCard {...mockedCourse} />
			</Provider>
		);
		expect(getByText('Course')).toBeTruthy();
	});

	it('CourseCard has description', () => {
		const { getByText } = render(
			<Provider store={mockedStore}>
				<CourseCard {...mockedCourse} />
			</Provider>
		);
		expect(getByText('description')).toBeTruthy();
	});

	it('CourseCard has duration in the correct format', () => {
		const { getByText } = render(
			<Provider store={mockedStore}>
				<CourseCard {...mockedCourse} />
			</Provider>
		);
		const d = 'Duration: ' + timeFormat(mockedCourse.duration);
		expect(getByText(d)).toBeTruthy();
	});

	it('CourseCard has authors list', () => {
		const { getByText } = render(
			<Provider store={mockedStore}>
				<CourseCard {...mockedCourse} />
			</Provider>
		);
		expect(getByText(mockedCourse.author.join(', '))).toBeTruthy();
	});

	it('CourseCard has created Date', () => {
		const { getByText } = render(
			<Provider store={mockedStore}>
				<CourseCard {...mockedCourse} />
			</Provider>
		);
		expect(getByText('Created: ' + mockedCourse.created)).toBeTruthy();
	});
});
