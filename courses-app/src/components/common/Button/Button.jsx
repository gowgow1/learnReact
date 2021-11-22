import './index.css';

const Button = ({ text, onClick, dataTest }) => (
	<button onClick={onClick} className='button' data-testid={dataTest}>
		{text}
	</button>
);

export default Button;
