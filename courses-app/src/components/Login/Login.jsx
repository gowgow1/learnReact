import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { PropTypes } from 'prop-types';

import Button from '../common/Button';
import Input from '../common/Input';

import { service } from '../../services/services';
import { useDispatch } from 'react-redux';

import './index.css';
import { asyncLoginUser } from '../../store/user/thunk';

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [inputsValue, setValues] = useState({});

	const handleInputName = ({ target }) => {
		setValues({
			...inputsValue,
			[target.name]: target.value,
		});
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		const { email = '', password = '' } = inputsValue;
		const { successful, result } = await service.userLogin({
			email,
			password,
		});

		if (successful) {
			dispatch(asyncLoginUser(result));
			localStorage.setItem('token', result);
			history.push('/courses');
		} else {
			alert('Invalid data');
		}
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

Login.propTypes = {
	setUser: PropTypes.func,
};

export default Login;
