import './index.css';

const Input = ({ placeholder, labelText, onChange, id }) => (
	<div className='input-wrap'>
		<label htmlFor={id}>{labelText}</label>
		<input
			placeholder={placeholder}
			onChange={({ target }) => {
				onChange(target.value);
			}}
			id={id}
			className='input'
		/>
	</div>
);

export default Input;
