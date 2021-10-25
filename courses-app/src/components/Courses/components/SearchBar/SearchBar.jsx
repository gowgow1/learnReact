import Input from '../../../common/Input';
import Button from '../../../common/Button';

import './index.css';

const SearchBar = ({ searchAbility, filterElements }) => (
	<div className='search-bar'>
		<Input
			placeholder='Enter course name...'
			id='search'
			onChange={searchAbility}
		/>
		<Button text='Search' onClick={filterElements} />
	</div>
);

export default SearchBar;
