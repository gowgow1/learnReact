import Button from '../../../common/Button';
import timeFormat from '../../../../helpers/timeFormat';

import './index.css';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../../store/selectors';
import { asynDeleteCourse } from '../../../../store/courses/thunk';

const CourseCards = ({
	id,
	title,
	description,
	author = [],
	duration,
	created,
}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { role, token } = useSelector(getUser);

	const toCoursesPage = () => history.push(`/courses/${id}`);

	const onDelete = () => dispatch(asynDeleteCourse(id, token));

	const onEdit = () => history.push(`/courses/update/${id}`);

	return (
		<div className='card'>
			<div className='card-content'>
				<h2 className='title'>{title}</h2>
				<div className='description'>{description}</div>
			</div>
			<div className='card-info'>
				<div className='author'>
					<strong>Authors: </strong>
					{author.join(', ')}
				</div>
				<div className='duration'>Duration: {timeFormat(duration)}</div>
				<div className='created'>Created: {created}</div>
				<div className='btn-wrap'>
					<Button text='Show course' onClick={toCoursesPage} />
					{role === 'admin' && <Button text='E' onClick={onEdit} />}
					{role === 'admin' && <Button text='D' onClick={onDelete} />}
				</div>
			</div>
		</div>
	);
};

export default CourseCards;
