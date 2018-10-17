/**
 * User: clint
 * Date: 11/10/2018
 * Time: 07:58
 *
 * Rebasoft - Network Intelligence
 */

import * as actionTypes from './types';

export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
};

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
};