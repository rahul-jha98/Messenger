import {combineReducers} from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState = {
    currentUser: null,
    isLoading: true
}

const user_reducer = (state = initialUserState, action) => {
    console.log(action);
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.createdUser,
                isLoading: false
            }
        case actionTypes.CLEAR_USER:
            return {
                ...initialUserState,
                isLoading: false
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: user_reducer
});

export default rootReducer;
