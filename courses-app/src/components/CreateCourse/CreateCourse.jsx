import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../common/Input';
import Button from '../common/Button';

import genId from '../../helpers/genId';
import timeFormat from '../../helpers/timeFormat';

import './index.css';

const CreateCourse = ({ initialAuthors, updateAuthors, updateCourses }) => {
	const [inputValues, setValues] = useState({});
	const [authors, setAuthors] = useState(initialAuthors);
	const [currentAuthors, setCurrentAuthors] = useState([]);
	const history = useHistory();

	const handleInputName = ({ target }) => {
		setValues({
			...inputValues,
			[target.name]: target.value,
		});
	};

	const update = (event) => {
		const newAutor = {
			name: inputValues.authorInput,
			id: genId(),
		};

		updateAuthors(newAutor);
		setAuthors([...authors, newAutor]);

		event.preventDefault();
	};

	const createCourse = (event) => {
		event.preventDefault();
		const date = new Date();
		updateCourses({
			...inputValues,
			id: genId(),
			creationDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
			authors: [...currentAuthors.map((item) => item.id)],
		});
		history.push('/courses');
	};

	return (
		<form className='create-course'>
			<div className='control'>
				<Input
					placeholder='Enter Title'
					labelText='Title'
					id='title'
					onChange={handleInputName}
					name='title'
				/>
				<Button text='Create course' onClick={createCourse} />
			</div>
			<label htmlFor='ariaText'>Description</label>
			<textarea
				minLength='2'
				id='ariaText'
				className='text-aria'
				defaultValue='some text...'
				onChange={handleInputName}
				name='description'
			></textarea>
			<div className='author-wrap'>
				<div className='author-create'>
					<h2>Add author</h2>
					<Input
						placeholder='Enter author name...'
						labelText='Author name:'
						id='authorInput'
						name='authorInput'
						onChange={handleInputName}
					/>
					<Button text='Create Author' onClick={update} />
					<h2>Duration</h2>
					<Input
						placeholder='Enter duration in minutes...'
						labelText='Duration'
						id='duration'
						onChange={handleInputName}
						name='duration'
						type='number'
					/>
					<div className='duration-bar'>
						Duration: <span>{timeFormat(inputValues.duration)}</span> hours
					</div>
				</div>
				<div className='author-choose'>
					<h2> Authors </h2>
					<ul>
						{authors.map(({ id, name }) => (
							<li key={id} className='author-name'>
								<div>{name}</div>
								<Button
									text='Add author'
									onClick={(event) => {
										setCurrentAuthors([
											...currentAuthors,
											authors.find((item) => item.id === id),
										]);

										setAuthors(authors.filter((item) => item.id !== id));
										event.preventDefault();
									}}
								/>
							</li>
						))}
					</ul>
					<h2>Course authors</h2>
					{currentAuthors.length ? (
						<ul>
							{currentAuthors.map(({ id, name }) => (
								<li key={id} className='author-name'>
									<div>{name}</div>
									<Button
										text='Delete Author'
										onClick={(event) => {
											setAuthors([
												...authors,
												currentAuthors.find((item) => item.id === id),
											]);
											setCurrentAuthors(
												currentAuthors.filter((item) => item.id !== id)
											);

											event.preventDefault();
										}}
									/>
								</li>
							))}
						</ul>
					) : (
						'Author list is empty'
					)}
				</div>
			</div>
		</form>
	);
};

export default CreateCourse;
