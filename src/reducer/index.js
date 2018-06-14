import {combineReducers} from 'redux';
import slide from './slideReducers';
import add from './addReducers';

const rootReucer = combineReducers({
    slide:slide,
    add:add,
})

export default rootReucer;