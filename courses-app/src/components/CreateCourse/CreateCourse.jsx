import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Input from '../common/Input';
import Button from '../common/Button';

import genId from '../../helpers/genId';
import timeFormat from '../../helpers/timeFormat';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors } from '../../store/selectors';
import { addAuthor } from '../../store/authors/actionCreators';
import { addCourse } from '../../store/courses/actionCreators';

import './index.css';

const CreateCourse = () => {
	const dispatch = useDispatch();
	const initialAuthors = useSelector(getAuthors);
	const [inputValues, setValues] = useState({});
	const [authors, setAuthors] = useState(initialAuthors);
	const [currentAuthors, setChoosenAuthors] = useState([]);
	const history = useHistory();

	useEffect(() => {
		setAuthors(initialAuthors);
	}, [initialAuthors]);

	const handleInputName = ({ target }) => {
		setValues({
			...inputValues,
			[target.name]: target.value,
		});
	};

	const updateAuthors = (event) => {
		const newAutor = {
			name: inputValues.authorInput,
			id: genId(),
		};
		dispatch(addAuthor(newAutor));
		event.preventDefault();
	};

	const updateCourses = (event) => {
		event.preventDefault();
		const date = new Date();
		dispatch(
			addCourse({
				...inputValues,
				id: genId(),
				creationDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
				authors: [...currentAuthors.map((item) => item.id)],
			})
		);
		history.push('/courses');
	};

	const onAddAuthor = (event, id) => {
		setChoosenAuthors([
			...currentAuthors,
			authors.find((item) => item.id === id),
		]);

		setAuthors(authors.filter((item) => item.id !== id));
		event.preventDefault();
	};

	const onRemoveAuthor = (event, id) => {
		setAuthors([...authors, currentAuthors.find((item) => item.id === id)]);
		setChoosenAuthors(currentAuthors.filter((item) => item.id !== id));

		event.preventDefault();
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
				<Button text='Create course' onClick={updateCourses} />
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
					<Button text='Create Author' onClick={updateAuthors} />
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
									onClick={(event) => onAddAuthor(event, id)}
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
										onClick={(event) => onRemoveAuthor(event, id)}
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

CreateCourse.propTypes = {
	initialAuthors: PropTypes.array,
	updateAuthors: PropTypes.func,
	updateCourses: PropTypes.func,
};

export default CreateCourse;
