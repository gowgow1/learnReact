import './index.css';
import Logo from './components/Logo';
import Button from '../common/Button';

const Header = () => (
	<div className='header'>
		<Logo />
		<div className='header-wrap'>
			<div className='header-text'>Dave</div>
			<Button text='logout' onClick={() => {}} />
		</div>
	</div>
);

export default Header;
