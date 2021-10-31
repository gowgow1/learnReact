import { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Registration from './components/Registration';

import { mockedAuthorsList, mockedCoursesList } from './constants';
import './App.css';

function App() {
	const [showCoursePage, toggleCoursePage] = useState(false);
	const [isLogin, setLogin] = useState(false);
	const [coursesList, setCourseList] = useState(mockedCoursesList);
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);

	const updateAuthors = (newAuthor) => {
		setAuthorsList([...authorsList, newAuthor]);
	};

	const updateCourses = (newCourse) => {
		setCourseList([...coursesList, newCourse]);
		togglePage();
	};

	const togglePage = () => toggleCoursePage(!showCoursePage);

	return (
		<div className='app-wrap'>
			<Header />
			<Router>
				<Redirect to='/registration' />
				<Route exact path='/registration'>
					<Registration />
				</Route>
				<Route path='/courses'>
					{showCoursePage ? (
						<CreateCourse
							initialAuthors={authorsList}
							updateAuthors={updateAuthors}
							updateCourses={updateCourses}
						/>
					) : (
						<Courses
							initCourses={coursesList}
							initAuthors={authorsList}
							togglePage={togglePage}
						/>
					)}
				</Route>
			</Router>
		</div>
	);
}
export default App;
