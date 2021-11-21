import { Route, Redirect, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Login from './components/Login';
import Header from './components/Header';
import Courses from './components/Courses';
import Registration from './components/Registration';
import CourseForm from './components/CourseForm';
import CourseInfo from './components/CourseInfo';
import { PrivateRouter } from './components/PrivateRouter/PrivateRouter';

import { asyncLoginUser } from './store/user/thunk';
import { asyncInitCourses } from './store/courses/thunk';
import { asyncInitAuthors } from './store/authors/thunk';

import './App.css';

function App() {
	const dispatch = useDispatch();
	const token = localStorage.getItem('token');

	useEffect(() => {
		dispatch(asyncInitCourses());
		dispatch(asyncInitAuthors());
		token && dispatch(asyncLoginUser(token));
	}, [dispatch]);

	return (
		<div className='app-wrap'>
			<Header />
			<Route path='/login'>
				<Login />
			</Route>
			<Route path='/registration' component={Registration} />
			<Switch>
				<PrivateRouter path='/courses/add' component={CourseForm} />
				<PrivateRouter
					path='/courses/update/:courseId'
					component={CourseForm}
				/>
				<Route path='/courses/:id' component={CourseInfo} />
				<Route path='/courses' component={Courses} />
			</Switch>
			<Redirect from='/' to={token ? '/courses' : '/login'} />
		</div>
	);
}
export default App;
