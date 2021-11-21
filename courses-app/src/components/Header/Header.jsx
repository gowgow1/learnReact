import Logo from './components/Logo';
import Button from '../common/Button';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import { deleteUser } from '../../store/user/actionCreators';

const Header = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { isAuth, name } = useSelector(getUser);

	const logout = () => {
		dispatch(deleteUser());
		window.localStorage.clear();
		history.push('/login');
	};

	return (
		<div className='header'>
			<Logo />
			{isAuth ? (
				<div className='header-wrap'>
					<div className='header-text'>{name}</div>
					<Button text='logout' onClick={logout} />
				</div>
			) : null}
		</div>
	);
};

Header.propTypes = {
	setUser: PropTypes.func,
	isUser: PropTypes.object,
};

export default Header;
