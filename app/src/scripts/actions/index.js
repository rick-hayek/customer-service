
import {ActionType}  from './action-types';

export const addMessage = (message) =>{
    return {
        type: ActionType.ADD_MESSAGE,
        message
    };
}

export const changeShuttle = (shuttle) =>{
    return {
        type: ActionType.CHANGE_SHUTTLE,
        shuttle
    };
}