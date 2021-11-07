import * as actions from './actionTypes';

export default function courses(state = [], { type, payload }) {
	switch (type) {
		case actions.ADD_COURSE:
			return [...state, payload.item];
		case actions.DELETE_COURSE:
			return state.filter((item) => item.id !== payload.id);
		default:
			return state;
	}
}
