import React from 'react';
import {Text} from "react-native";
import {StyleSheet} from "react-native";
import {Icon} from "react-native-elements";

function LeftComponent(props) {
    return (
        <Icon
            onPress={()=>console.log(10)}
            name='list'
            color='white' />
    );
}

export default LeftComponent;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
});
