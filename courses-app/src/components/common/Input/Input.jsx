import './index.css';

const Input = ({ placeholder, labelText, onChange, id, name }) => (
	<div className='input-wrap'>
		<label htmlFor={id}>{labelText}</label>
		<input
			placeholder={placeholder}
			onChange={onChange}
			id={id}
			className='input'
			name={name}
		/>
	</div>
);

export default Input;
