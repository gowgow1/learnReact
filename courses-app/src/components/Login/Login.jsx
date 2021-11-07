import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import Button from '../common/Button';
import Input from '../common/Input';

import Service from '../../services/services';
import './index.css';

const Login = () => {
	let service = new Service(); //ServiceApi
	let history = useHistory();
	const [inputsValue, setValues] = useState({});

	const handleInputName = ({ target }) => {
		setValues({
			...inputsValue,
			[target.name]: target.value,
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		let { email = '', password = '' } = inputsValue;
		const result = service.userLogin({ email, password });

		result.then((res) =>
			res.successful ? history.push('/courses') : alert('Invalid data')
		);
	};

	return (
		<div className='login'>
			<form className='login-form' onSubmit={onSubmit}>
				<h2>Login</h2>
				<Input
					placeholder='Enter email'
					labelText='Email'
					id='login-email'
					name='email'
					type='email'
					onChange={handleInputName}
				/>
				<Input
					placeholder='Enter password'
					labelText='Password'
					id='login-password'
					name='password'
					type='password'
					onChange={handleInputName}
				/>
				<Button text='Login' type='submit' />
				<div>
					If you not have an account you can{' '}
					<Link to='/registration' className='registration-link'>
						Registration
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
