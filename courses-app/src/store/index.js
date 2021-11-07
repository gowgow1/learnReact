import { createStore, combineReducers } from 'redux';
import courses from './courses/reducer';
import user from './user/reducer';

const store = createStore(combineReducers({ courses, user }));

export default store;
