import * as reactRedux from 'react-redux';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import Header from '../Header';

const mockedState = {
	isAuth: true,
	name: 'Alex',
	token: 'f1f2f3f4',
	role: 'user',
	email: 'alex@mail.ru',
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

jest.spyOn(reactRedux, 'useDispatch');

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
}));

beforeEach(() => {
	reactRedux.useSelector.mockReturnValue(mockedState);
});

afterEach(() => {
	reactRedux.useSelector.mockClear();
});

describe('Testing: <Header/>', () => {
	it('rendered without crushing', () => {
		const { container } = render(
			<Provider store={mockedStore}>
				<Header />
			</Provider>
		);
		expect(container).toMatchSnapshot();
	});
	it('should get name from store', async () => {
		const { getByText } = render(
			<Provider store={mockedStore}>
				<Header />
			</Provider>
		);
		expect(getByText('Alex')).toBeTruthy();
	});

	it('should be with alt', () => {
		const { queryByAltText } = render(
			<Provider store={mockedStore}>
				<Header />
			</Provider>
		);
		expect(queryByAltText('logo')).toBeTruthy();
	});
});
