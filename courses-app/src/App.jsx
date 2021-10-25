import { useState } from 'react';
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';

import './App.css';
function App() {
	const [newCoursePage, setnewCoursePage] = useState(false);
	const togglePage = () => {
		setnewCoursePage(!newCoursePage);
	};
	return (
		<div className='AppWrap'>
			<Header />
			{newCoursePage ? (
				<CreateCourse togglePage={togglePage} />
			) : (
				<Courses togglePage={togglePage} />
			)}
		</div>
	);
}
export default App;
