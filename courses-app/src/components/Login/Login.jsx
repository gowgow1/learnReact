import './index.css';
import { Link, useHistory } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../../components/common/Input';

const Login = () => {
	let history = useHistory();

	return (
		<div className='login'>
			<form
				className='login-form'
				onSubmit={() => {
					history.push('/courses');
				}}
			>
				<h2>Login</h2>
				<Input
					placeholder='Enter email'
					labelText='Email'
					id='login-email'
					name='email'
					type='email'
				/>
				<Input
					placeholder='Enter password'
					labelText='Password'
					id='login-password'
					name='password'
					type='password'
				/>
				<Button text='Login' type='submit' />
				<div>
					If you not have an account you can&nbsp;
					<Link to='/registration' className='registration-link'>
						Registration
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
