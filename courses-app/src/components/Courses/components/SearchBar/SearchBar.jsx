import './index.css';
import Input from '../../../common/Input';
import Button from '../../../common/Button';

const SearchBar = ({ searchAbility, filterElements }) => (
	<div className='search-bar'>
		<Input placeholder='Enter course name...' onChange={searchAbility} />
		<Button text='Search' onClick={filterElements} />
	</div>
);

export default SearchBar;
