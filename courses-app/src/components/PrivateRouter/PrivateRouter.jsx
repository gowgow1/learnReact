import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';

export const PrivateRouter = ({ component: Component, ...rest }) => {
	const user = useSelector(getUser);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (user.isAuth) {
					return user.role === 'admin' ? (
						<Component {...props} />
					) : (
						<Redirect
							to={{
								pathname: '/courses',
								state: { from: props.location },
							}}
						/>
					);
				} else {
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location },
							}}
						/>
					);
				}
			}}
		/>
	);
};
