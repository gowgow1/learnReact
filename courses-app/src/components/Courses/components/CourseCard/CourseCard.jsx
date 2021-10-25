import Button from '../../../common/Button';

import './index.css';

const CourseCards = ({
	id,
	title,
	description,
	author = [],
	duration,
	created,
}) => (
	<div key={id} className='card'>
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
				{duration}
			</div>
			<div className='created'>
				<strong>Created: </strong>
				{created}
			</div>
			<div className='show-btn-wrap'>
				<Button text='Show course' />
			</div>
		</div>
	</div>
);

export default CourseCards;
