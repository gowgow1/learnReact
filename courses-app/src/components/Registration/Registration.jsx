import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import Button from '../common/Button';
import Input from '../common/Input';

import Service from '../../services/services';
import './index.css';

const Registration = () => {
	const [inputsValue, setValues] = useState({});
	const history = useHistory();
	const service = new Service();

	const handleInputName = ({ target }) => {
		setValues({
			...inputsValue,
			[target.name]: target.value,
		});
	};

	const onSubmit = async (event) => {
		// const result = service.userLogin({ email, password });

		// result.then((res) =>
		// 	res.successful
		// 		? history.push('/courses')
		// 		: alert('Invalid password or email')
		// );
		event.preventDefault();
		let { name = '', email = '', password = '' } = inputsValue;
		const result = service.userRegistration({ name, email, password });

		result.then((res) =>
			res.successful ? history.push('/login') : alert(res.errors)
		);
	};

	return (
		<div className='registration'>
			<form className='registration-form' onSubmit={onSubmit}>
				<h2>Registration</h2>
				<Input
					placeholder='Enter name'
					labelText='Name'
					id='registration-name'
					name='name'
					onChange={handleInputName}
				/>
				<Input
					placeholder='Enter Email'
					labelText='Email'
					id='registration-email'
					name='email'
					type='email'
					onChange={handleInputName}
				/>
				<Input
					placeholder='Enter password'
					labelText='Password'
					id='registration-password'
					name='password'
					type='password'
					onChange={handleInputName}
				/>
				<Button text='Registration' type='submit' />
				<div>
					If you have an account you can{' '}
					<Link to='/login' className='login-link'>
						Login
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Registration;
