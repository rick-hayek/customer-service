import { ActionType } from '../actions/action-types';

const initState = {
    id: undefined,
    name: undefined
};

const shuttle = (state = initState, action) => {
    switch(action.type){
        case ActionType.CHANGE_SHUTTLE:
            return Object.assign({}, state, {messages: action.shuttle})
        default:
            return state;
    }
}

export default shuttle;