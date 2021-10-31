import { useState } from 'react';

import CourseCard from './components/CourseCard';
import SearchBar from './components/SearchBar';
import Button from '../common/Button';

import './index.css';

const Courses = ({ togglePage, initCourses, initAuthors }) => {
	const [InputValue, setInputValue] = useState('');
	const [courses, setCourses] = useState(initCourses);

	const searchAbility = ({ target: { value } }) => {
		setInputValue(value);

		if (InputValue.length <= 1) {
			setCourses(initCourses);
		}
	};

	const searchElements = () => {
		setCourses(
			courses.filter(
				({ title, id }) =>
					title.toLowerCase().includes(InputValue.toLowerCase()) ||
					id.includes(InputValue)
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
			<div className='cards-wrap'>
				{courses.map((course) => {
					const { id, title, description, creationDate, duration, authors } =
						course;
					const autorNames = authors?.map(
						(id) => initAuthors?.find((item) => item?.id === id)?.name
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
				})}
			</div>
		</div>
	);
};

export default Courses;
