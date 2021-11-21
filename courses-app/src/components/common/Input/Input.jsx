import './index.css';

const Input = ({
	placeholder,
	labelText,
	onChange,
	id,
	name,
	type = 'text',
	value,
}) => (
	<div className='input-wrap'>
		<label htmlFor={id}>{labelText}</label>
		<input
			placeholder={placeholder}
			onChange={onChange}
			id={id}
			className='input'
			name={name}
			type={type}
			value={value}
		/>
	</div>
);

export default Input;
