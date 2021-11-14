import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import courses from './courses/reducer';
import authors from './authors/reducer';
import user from './user/reducer';

const reducer = combineReducers({
	courses,
	authors,
	user,
});

export const store = createStore(reducer, devToolsEnhancer());
