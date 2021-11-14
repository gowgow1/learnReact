import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actionsCourses from '../src/store/courses/actionCreators';
import * as actionsAuthors from '../src/store/authors/actionCreators';

import Login from './components/Login';
import Header from './components/Header';
import Courses from './components/Courses';
import Registration from './components/Registration';
import CreateCourse from './components/CreateCourse';
import CourseInfo from './components/CourseInfo';

import { service } from './services/services';
import { getUser } from './store/selectors';
import { loginUser } from './store/user/actionCreators';

import './App.css';

function App() {
	const dispatch = useDispatch();
	const currentUser = useSelector(getUser);

	const userInit = () => {
		const name = localStorage.getItem('name');
		const token = localStorage.getItem('token');
		dispatch(loginUser(token, { name }));
	};

	const initCourses = async () => {
		const { result } = await service.getCourses();
		dispatch(actionsCourses.initCourses(result));
	};
	const initAuthors = async () => {
		const { result } = await service.getAuthors();
		dispatch(actionsAuthors.initAuthors(result));
	};

	useEffect(() => {
		initCourses();
		initAuthors();
		userInit();
	}, []);

	return (
		<BrowserRouter>
			<div className='app-wrap'>
				<Header />
				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/registration' component={Registration} />
				<Switch>
					<Route path='/courses/add'>
						<CreateCourse />
					</Route>
					<Route path='/courses/:id' children={<CourseInfo />} />
					<Route path='/courses'>
						<Courses />
					</Route>
				</Switch>
				<Redirect from='/' to={currentUser.isAuth ? '/courses' : '/login'} />
			</div>
		</BrowserRouter>
	);
}
export default App;
