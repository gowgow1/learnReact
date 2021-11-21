import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCourses, getAuthors, getUser } from '../../store/selectors';

import CourseCard from './components/CourseCard';
import SearchBar from './components/SearchBar';
import Button from '../common/Button';

import './index.css';

const Courses = () => {
	const [InputValue, setInputValue] = useState('');
	const coursesList = useSelector(getCourses);
	const authorsList = useSelector(getAuthors);
	const { role } = useSelector(getUser);
	const history = useHistory();
	const redirectToAddCourse = () => {
		history.push('/courses/add');
	};
	const [filtredCourses, setCourses] = useState(coursesList);

	useEffect(() => {
		setCourses(coursesList);
	}, [coursesList]);

	const searchAbility = ({ target: { value } }) => {
		setInputValue(value);
		InputValue.length <= 1 && setCourses(coursesList);
	};

	const searchElements = () => {
		setCourses(
			coursesList.filter(
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
				{role === 'admin' ? (
					<Button text='Add new course' onClick={redirectToAddCourse} />
				) : null}
			</div>
			<div className='cards-wrap'>
				{filtredCourses.map((course) => {
					const { id, title, description, creationDate, duration, authors } =
						course;
					const autorNames = authors?.map(
						(id) => authorsList?.find((item) => item?.id === id)?.name
					);

					return (
						<CourseCard
							key={id}
							id={id}
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
