import Button from '../../../common/Button';
import timeFormat from '../../../../helpers/timeFormat';

import './index.css';
import { useHistory } from 'react-router';

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
				<div className='show-btn-wrap'>
					<Button text='Show course' onClick={onClick} />
				</div>
			</div>
		</div>
	);
};

export default CourseCards;
