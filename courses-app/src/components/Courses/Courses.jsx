import CourseCard from './components/CourseCard';
import SearchBar from './components/SearchBar';
import Button from '../common/Button';
import {
	mockedAuthorsList,
	mockedCoursesList,
} from '../common/assets/mockedFiles';

import { useState } from 'react';

import './index.css';

const Courses = ({ togglePage }) => {
	const searchAbility = (inputValue) => {
		setState(inputValue);
		if (state.length <= 1) {
			setArray(courseList);
		}
	};

	const filterElements = () => {
		setArray(
			courseList.filter(
				({ props: { title }, key }) =>
					title.toLowerCase().includes(state.toLowerCase()) ||
					(key + '').includes(state)
			)
		);
	};

	const courseList = mockedCoursesList.map(
		({ id, title, description, creationDate, duration, authors = [] }) => {
			const autorNames = authors?.map(
				(id) => mockedAuthorsList?.find((item) => item?.id === id)?.name
			);

			return (
				<CourseCard
					key={id}
					title={title}
					description={description}
					author={autorNames}
					duration={duration}
					created={creationDate}
				/>
			);
		}
	);

	const [state, setState] = useState('');
	const [array, setArray] = useState(courseList);

	return (
		<div className='Courses-wrap'>
			<div className='settings'>
				<SearchBar
					searchAbility={searchAbility}
					filterElements={filterElements}
				/>
				<Button text='Add new course' onClick={togglePage} />
			</div>
			<div className='cards-wrap'>{array}</div>
		</div>
	);
};

export default Courses;
