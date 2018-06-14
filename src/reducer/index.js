import {combineReducers} from 'redux';
import slide from './slideReducers';

const rootReucer = combineReducers({
    slide:slide,
})

export default rootReucer;