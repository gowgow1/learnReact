import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';

import './index.css';

const Registration = () => {
	return (
		<div className='registration'>
			<form
				className='registration-form'
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<h2>Registration</h2>
				<Input
					placeholder='Enter name'
					labelText='Name'
					id='registration-name'
					name='name'
				/>
				<Input
					placeholder='Enter Email'
					labelText='Email'
					id='registration-email'
					name='email'
					type='email'
				/>
				<Input
					placeholder='Enter password'
					labelText='Password'
					id='registration-password'
					name='password'
					type='password'
				/>
				<Button text='Registration' type='submit' />
				<div>
					If you have an account you can&nbsp;
					<Link to='/login' className='login-link'>
						Login
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Registration;
