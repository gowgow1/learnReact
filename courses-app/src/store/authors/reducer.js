import * as actions from './actionTypes';

export default function authors(state = [], { type, payload }) {
	switch (type) {
		case actions.INIT_AUTHOR_LIST:
			return [...payload.items];
		case actions.ADD_AUTHOR:
			return [...state, payload.item];
		case actions.DELETE_AUTHOR:
			return state.filter((item) => item.id !== payload.id);
		default:
			return state;
	}
}
