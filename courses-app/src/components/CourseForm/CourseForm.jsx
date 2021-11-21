import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '../common/Input';
import Button from '../common/Button';

import timeFormat from '../../helpers/timeFormat';
import { getAuthors, getCourses, getUser } from '../../store/selectors';
import { asyncUpdateCourse, asyncAddCourse } from '../../store/courses/thunk';
import { asyncAddAuthor } from '../../store/authors/thunk';

import './index.css';

const CourseForm = () => {
	const { courseId } = useParams();
	const history = useHistory();

	const dispatch = useDispatch();
	const initialAuthors = useSelector(getAuthors);
	const initialCourses = useSelector(getCourses);

	const { token } = useSelector(getUser);
	const course = initialCourses.find((item) => item.id === courseId);

	const [currentAuthors, setAuthors] = useState([]);
	const [choosenAuthors, setChoosenAuthors] = useState([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('Some text...');
	const [authorName, setAuthorName] = useState('');
	const [duration, setDuration] = useState(0);

	const initStates = (course) => {
		if (course) {
			const choosenAuthors = initialAuthors.filter((author) =>
				course.authors.includes(author.id)
			);
			const authors = initialAuthors.filter(
				(author) => !course.authors.includes(author.id)
			);
			setAuthors(authors);
			setChoosenAuthors(choosenAuthors);
			setTitle(course.title);
			setDescription(course.description);
			setDuration(course.duration);
		} else {
			setAuthors(initialAuthors);
		}
	};

	useEffect(() => {
		initStates(course);
	}, [initialAuthors, initialCourses]);

	const addTitle = (event) => setTitle(event.target.value);
	const addDescription = (event) => setDescription(event.target.value);
	const addAuthorName = (event) => setAuthorName(event.target.value);
	const addDuration = (event) => setDuration(+event.target.value);

	const onAddAuthor = (event, id) => {
		setChoosenAuthors([
			...choosenAuthors,
			currentAuthors.find((item) => item.id === id),
		]);

		setAuthors(currentAuthors.filter((item) => item.id !== id));
		event.preventDefault();
	};

	const onRemoveAuthor = (event, id) => {
		setAuthors([
			...currentAuthors,
			choosenAuthors.find((item) => item.id === id),
		]);
		setChoosenAuthors(choosenAuthors.filter((item) => item.id !== id));

		event.preventDefault();
	};

	const updateAuthors = (event) => {
		event.preventDefault();
		dispatch(asyncAddAuthor({ name: authorName }, token));
	};

	const updateCourse = (event) => {
		event.preventDefault();
		const date = new Date();
		dispatch(
			asyncUpdateCourse(token, {
				title,
				description,
				duration,
				creationDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
				authors: choosenAuthors.map((item) => item.id),
				id: course.id,
			})
		);
		history.push('/courses');
	};

	const setCourse = (event) => {
		event.preventDefault();
		const date = new Date();
		dispatch(
			asyncAddCourse(token, {
				title,
				description,
				duration,
				creationDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
				authors: choosenAuthors.map((item) => item.id),
			})
		);
		history.push('/courses');
	};

	return (
		<form className='create-course'>
			<div className='control'>
				<Input
					placeholder='Enter Title'
					labelText='Title'
					id='title'
					onChange={addTitle}
					name='title'
					value={title}
				/>
				{courseId ? (
					<Button text='Update course' onClick={updateCourse} />
				) : (
					<Button text='Create course' onClick={setCourse} />
				)}
			</div>
			<label htmlFor='ariaText'>Description</label>
			<textarea
				minLength='2'
				id='ariaText'
				className='text-aria'
				value={description}
				onChange={addDescription}
				name='description'
			/>
			<div className='author-wrap'>
				<div className='author-create'>
					<h2>Add author</h2>
					<Input
						placeholder='Enter author name...'
						labelText='Author name:'
						id='authorInput'
						name='authorInput'
						onChange={addAuthorName}
						value={authorName}
					/>
					<Button text='Create Author' onClick={updateAuthors} />
					<h2>Duration</h2>
					<Input
						placeholder='Enter duration in minutes...'
						labelText='Duration'
						id='duration'
						onChange={addDuration}
						name='duration'
						type='number'
						value={duration}
					/>
					<div className='duration-bar'>
						Duration: <span>{timeFormat(duration)}</span> hours
					</div>
				</div>
				<div className='author-choose'>
					<h2> Authors </h2>
					<ul>
						{currentAuthors.map(({ id, name }) => (
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
					{choosenAuthors.length ? (
						<ul>
							{choosenAuthors.map(({ id, name }) => (
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

CourseForm.propTypes = {
	initialAuthors: PropTypes.array,
	updateAuthors: PropTypes.func,
	setCourse: PropTypes.func,
};

export default CourseForm;
