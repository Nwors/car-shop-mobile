import React, {useEffect} from 'react';
import {Button, Text, View} from "react-native";
import {useHistory, Link} from "react-router-native";
import RouteService from "../../RouteService/RouteService";


function TestText(props) {
    const history = useHistory()
    useEffect(() => {
    },[])

    return (
        <View>
            <Text>Тестовый текст</Text>
            <Button onPress={() => {
                if(process.browser) window.history.pushState({}, "", "cars")
                history.push('/cars')
                console.log(history)
            }} title={'Переход'}>Go to the another page</Button>

        </View>

    );
}

export default TestText;
