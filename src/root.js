import React,{Component} from 'react';
import { AppRegistry } from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './store/ConfigureStore';
import App from './container/App';
import './situation';

const store = configureStore();

export default class Root extends Component{
    render(){
        return(
            <Provider store={store}>
               <App/>
            </Provider>
        )
    }
}


AppRegistry.registerComponent('reduxDemo', () => Root);