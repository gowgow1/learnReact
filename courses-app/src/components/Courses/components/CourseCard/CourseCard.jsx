import Button from '../../../common/Button';
import timeFormat from '../../../../helpers/timeFormat';

import './index.css';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { deleteCourse } from '../../../../store/courses/actionCreators';

const CourseCards = ({
	id,
	title,
	description,
	author = [],
	duration,
	created,
}) => {
	const history = useHistory();
	const onClick = () => history.push(`/courses/${id}`);
	const dispatch = useDispatch();

	const onDelete = () => {
		dispatch(deleteCourse(id));
	};
	const onEdit = () => {}; //tasks of next hw

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
				<div className='duration'>
					<strong>Duration: </strong>
					{timeFormat(duration)}
				</div>
				<div className='created'>
					<strong>Created: </strong>
					{created}
				</div>
				<div className='btn-wrap'>
					<Button text='Show course' onClick={onClick} />
					<Button text='E' onClick={onEdit} />
					<Button text='D' onClick={onDelete} />
				</div>
			</div>
		</div>
	);
};

export default CourseCards;
