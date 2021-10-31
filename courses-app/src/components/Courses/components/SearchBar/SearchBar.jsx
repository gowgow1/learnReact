import Input from '../../../common/Input';
import Button from '../../../common/Button';

import './index.css';

const SearchBar = ({ searchAbility, searchElements }) => (
	<div className='search-bar'>
		<Input
			placeholder='Enter course name...'
			id='search'
			onChange={searchAbility}
		/>
		<Button text='Search' onClick={searchElements} />
	</div>
);

export default SearchBar;
