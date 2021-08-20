import React from 'react';
import {Icon} from 'react-native-elements'
import {Linking, Text, View, Clipboard, StyleSheet} from "react-native";

function BottomSlide({carUrl, close}) {
    const loadInBrowser = () => {
        Linking.openURL(carUrl).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <View style={style.container}>
            <View style={style.buttonsContainer}>
                <View style={{marginRight: 60}}>
                    <Icon
                        raised
                        name='network'
                        type='entypo'
                        onPress={() => {close(); loadInBrowser()}} />
                </View>
                <View style={{marginLeft: 60}}>
                    <Icon
                        raised
                        name='clipboard'
                        type='entypo'
                        onPress={() => {close(); Clipboard.setString(carUrl)}}
                    />
                </View>
            </View>
            <View style={style.buttonsContainer}>
            <Text style={{marginRight: 20}}>Открыть в браузере</Text>
            <Text style={{marginLeft: 60, marginRight: 20}}>Скопировать</Text>
            </View>
        </View>
    );
}

export default BottomSlide;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonsContainer: {
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
    },
})
