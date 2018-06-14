import *as types from '../constans/addTypes';

import Immutable from 'immutable';
const initState = Immutable.fromJS({
    count: 0,
});

export default function add(state=initState, action) {

    let newState = state;

    switch (action.type) {
        case types.ADD:

            newState = newState.set('count',newState.get('count') +1);

            return newState;

        case types.DDA:

            newState = newState.set('count',newState.get('count') -1);
            return newState

        default:
            return newState;
    }
}