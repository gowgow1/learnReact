import './index.css';

const Input = ({ placeholder, labelText, onChange }) => {
	return (
		<div>
			<input
				placeholder={placeholder}
				onChange={({ target }) => {
					onChange(target.value);
				}}
				id='search'
				className='input'
			/>
			<label htmlFor='search'>{labelText}</label>
		</div>
	);
};

export default Input;
