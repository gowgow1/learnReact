import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import courses from './courses/reducer';
import authors from './authors/reducer';
import user from './user/reducer';

const reducer = combineReducers({
	courses,
	authors,
	user,
});

export const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk))
);
