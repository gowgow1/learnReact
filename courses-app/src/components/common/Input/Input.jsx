import './index.css';

const Input = ({
	placeholder,
	labelText,
	onChange,
	id,
	name,
	type = 'text',
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
		/>
	</div>
);

export default Input;
