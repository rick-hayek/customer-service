import { ActionType } from '../actions/action-types';

const initState = [];

const messages = (state = initState, action) => {
    switch(action.type){
        case ActionType.ADD_MESSAGE:
            return [...state, action.message];
        default:
            return state;
    }
}

export default messages;

  