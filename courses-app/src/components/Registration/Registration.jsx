import Button from '../common/Button';
import Input from '../common/Input';

import './index.css';

const Registration = () => {
	return (
		<div className='registration'>
			<form className='registration-form'>
				<h2>Registration</h2>
				<Input
					placeholder='Enter name'
					labelText='Name'
					id='name'
					name='name'
				/>
				<Input
					placeholder='Enter Email'
					labelText='Email'
					id='Email'
					name='email'
					type='email'
				/>
				<Input
					placeholder='Enter password'
					labelText='Password'
					id='password'
					name='password'
					type='password'
				/>
				<Button text='Registration' />
			</form>
		</div>
	);
};

export default Registration;
