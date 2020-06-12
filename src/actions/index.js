import * as actionTypes from './types';
 
/* User Actions */
export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            createdUser: user
        }
    }
}

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}


/* Chat Actions */
export const setCurrentChat = chat => {
    return {
        type: actionTypes.SET_CURRENT_CHAT,
        payload: {
            chat: chat
        }
    }
}