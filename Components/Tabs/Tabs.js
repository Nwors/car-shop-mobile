import React, {useState} from 'react';
import { Tab, TabView } from 'react-native-elements';
import {StyleSheet, Text} from "react-native";

function Tabs(props) {
    const [index, setIndex] = useState(0)
    return (
        <Text>1020</Text>
    );
}

const styles = StyleSheet.create({
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
});
export default Tabs;
