import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import timeFormat from '../../helpers/timeFormat';
import { getAuthors, getCourses } from '../../store/selectors';

import './index.css';

const CourseInfo = () => {
	const coursesList = useSelector(getCourses);
	const authorsList = useSelector(getAuthors);

	const params = useParams();
	const {
		title = '',
		description,
		creationDate,
		duration,
		authors,
	} = coursesList.find(({ id }) => id === params.id);

	console.log(authors, authorsList);
	return (
		<div className='course-info'>
			<Link to='/courses' className='back-link'>
				&lt; Back to courses
			</Link>
			<h2>{title}</h2>
			<div className='info-wrap'>
				<div className='info-description'>{description}</div>
				<div className='info-credits'>
					<div className='credits-id'>
						<b>ID: </b>
						{params.id}
					</div>
					<div className='credits-duration'>
						<b>Duration: </b>
						{timeFormat(duration)} hours
					</div>
					<div className='credits-created'>
						<b>Created: </b>
						{creationDate}
					</div>
					<div className='credits-authors'>
						<b>Authors: </b>
						{authors
							.map((id) => authorsList.find((item) => item.id === id).name)
							.join(', ')}
					</div>
				</div>
			</div>
		</div>
	);
};
export default CourseInfo;
