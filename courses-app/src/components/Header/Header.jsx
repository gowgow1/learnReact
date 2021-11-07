import Logo from './components/Logo';
import Button from '../common/Button';
import { useHistory } from 'react-router-dom';

import './index.css';

const Header = ({ isUser, setUser }) => {
	const history = useHistory();

	const logout = () => {
		window.localStorage.clear();
		setUser({});
		history.push('/login');
	};
	return (
		<div className='header'>
			<Logo />
			{isUser.token ? (
				<div className='header-wrap'>
					<div className='header-text'>{isUser.name}</div>
					<Button text='logout' onClick={logout} />
				</div>
			) : null}
		</div>
	);
};

export default Header;
