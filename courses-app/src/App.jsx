import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { useState } from 'react';

import Login from './components/Login';
import Header from './components/Header';
import Courses from './components/Courses';
import Registration from './components/Registration';
import CreateCourse from './components/CreateCourse';
import CourseInfo from './components/CourseInfo/CourseInfo';

import { mockedAuthorsList, mockedCoursesList } from './constants';
import './App.css';

function App() {
	const [coursesList, setCourseList] = useState(mockedCoursesList);
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
	const [isUser, setUser] = useState({
		token: localStorage.getItem('token'),
		name: localStorage.getItem('name'),
	});

	const updateAuthors = (newAuthor) => {
		setAuthorsList([...authorsList, newAuthor]);
	};

	const updateCourses = (newCourse) => {
		setCourseList([...coursesList, newCourse]);
	};

	return (
		<BrowserRouter>
			<div className='app-wrap'>
				<Header isUser={isUser} setUser={setUser} />
				<Route path='/login'>
					<Login isUser={isUser} setUser={setUser} />
				</Route>
				<Route path='/registration' component={Registration} />
				<Switch>
					<Route path='/courses/add'>
						<CreateCourse
							initialAuthors={authorsList}
							updateAuthors={updateAuthors}
							updateCourses={updateCourses}
						/>
					</Route>
					<Route
						path='/courses/:id'
						children={
							<CourseInfo coursesList={coursesList} authorsList={authorsList} />
						}
					/>
					<Route path='/courses'>
						<Courses initCourses={coursesList} initAuthors={authorsList} />
					</Route>
				</Switch>
				<Redirect from='/' to={isUser.token ? '/courses' : '/login'} />
			</div>
		</BrowserRouter>
	);
}
export default App;
