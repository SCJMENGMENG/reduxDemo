/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Keyboard,
    Animated,
    TextInput,
    Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import *as slideAction from '../action/slideAction';
import *as addAction from '../action/addAction';

const screenHeigth = Dimensions.get('window').height;

type Props = {};
class App extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            aaa:0,
        };

        this.keyboardHeight = new Animated.Value(0);

    }

    componentWillMount() {
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShow.remove();
        this.keyboardDidHide.remove();
    }

    keyboardDidShow = (event) => {

        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 300,
            }),
        ]).start();
    };

    keyboardDidHide = (event) => {

        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            }),
        ]).start();
    };

    render() {

        const {num,leftSlideFn,rightSlideFn,count,ADDFN,DDAFN} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    名字-{global.NAME}
                </Text>
                <Text style={styles.instructions} onPress={()=>{
                    global.AAA = '666'
                    this.setState({
                        aaa:1
                    })
                }}>
                    点击年龄-{global.AAA ? global.AAA : global.AGE}
                </Text>
                <Text style={styles.instructions}>
                    描述-{global.DESCRIBE}
                </Text>
                <Text onPress={ADDFN}>加</Text>
                <Text>{count}</Text>
                <Text onPress={DDAFN}>减</Text>
                <Text onPress={num <8 ? rightSlideFn : null}>点我 +</Text>
                <Text onPress={num >0 ? leftSlideFn : null}>点我 -</Text>
                {this.spotModule(9,num)}

                <Animated.View style={{marginBottom:this.keyboardHeight}}>
                    <TextInput
                        style={{
                            backgroundColor: "cyan",
                            width: 200,
                            height: 20,
                            marginTop:100,
                        }}
                    />
                </Animated.View>
            </View>
        );
    }

    spotModule(count,num) {

        let spots = [];
        for (let i = 0; i < count; i++) {
            let spot = <View key={i} style={{
                width: 20,
                height: 20,
                backgroundColor: num == i ? 'cyan' : 'red',
                margin: 4
            }}/>
            spots.push(spot)
        }

        return <View style={{
            flexDirection: 'row',
            marginTop:screenHeigth - 50,
            position: 'absolute',
            backgroundColor: global.COLOR,
        }}>
            {spots}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default connect(
    (state) => ({
        num:state.slide.num,
        count:state.add.get('count')
    }),
    (dispatch => ({
        leftSlideFn:() => dispatch(slideAction.leftSlide()),
        rightSlideFn:() => dispatch(slideAction.rightSlide()),
        ADDFN:() => dispatch(addAction.ADD()),
        DDAFN:() => dispatch(addAction.DDA()),
    }))
)(App)