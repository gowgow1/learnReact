import { useState } from 'react';

import CourseCard from './components/CourseCard';
import SearchBar from './components/SearchBar';
import Button from '../common/Button';

import './index.css';

const Courses = ({ togglePage, initialCourseList, initialAuthors }) => {
	const courseList = initialCourseList.map((course) => {
		const { id, title, description, creationDate, duration, authors } = course;
		const autorNames = authors?.map(
			(id) => initialAuthors?.find((item) => item?.id === id)?.name
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
	});

	const [courses, setCoursesList] = useState(courseList);
	const [InputValue, setInputValue] = useState('');

	const searchAbility = ({ target: { value } }) => {
		setInputValue(value);

		if (InputValue.length <= 1) {
			setCoursesList(courseList);
		}
	};

	const searchElements = () => {
		setCoursesList(
			courseList.filter(
				({ props: { title }, key }) =>
					title.toLowerCase().includes(InputValue.toLowerCase()) ||
					(key + '').includes(InputValue)
			)
		);
	};

	return (
		<div className='Courses-wrap'>
			<div className='settings'>
				<SearchBar
					searchAbility={searchAbility}
					searchElements={searchElements}
				/>
				<Button text='Add new course' onClick={togglePage} />
			</div>
			<div className='cards-wrap'>{courses}</div>
		</div>
	);
};

export default Courses;
