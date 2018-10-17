/**
 * User: clint
 * Date: 11/10/2018
 * Time: 08:00
 *
 * Rebasoft - Network Intelligence
 */

import * as actionTypes from '../actions/types';
import { combineReducers } from 'redux';
const initialUserState = {
    currentUser: null,
    isLoading: true
};

const user_reducer = (state = initialUserState, action) => {
    switch(action.type) {
        case actionTypes.SET_USER: {
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        }
        case actionTypes.CLEAR_USER: {
            return {
                ...initialUserState,
                isLoading: false
            }
        }
        default: return state;
    }
};

const rootReducer = combineReducers({
    user: user_reducer
});

export default rootReducer;