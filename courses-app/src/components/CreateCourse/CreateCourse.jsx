import Input from '../common/Input';
import Button from '../common/Button';

import './index.css';

const CreateCourse = ({ togglePage }) => {
	return (
		<div className='create-course'>
			<div className='top-handlers'>
				<Input
					placeholder='Enter Title'
					labelText='Title'
					id='title'
					onChange={() => {}}
				/>
				<Button text='Create course' onClick={togglePage} />
			</div>
			<label htmlFor='ariaText'>Description</label>
			<textarea
				id='ariaText'
				className='text-aria'
				defaultValue='some text...'
			></textarea>
		</div>
	);
};

export default CreateCourse;
