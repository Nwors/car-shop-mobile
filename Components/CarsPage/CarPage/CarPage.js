import React, {useEffect, useRef, useState} from 'react';
import {Alert, Text, View, StyleSheet, ScrollView} from "react-native";
import { ActivityIndicator } from 'react-native';
import { Image, Button } from 'react-native-elements';
import axios from "axios";
import {useIsFocused} from "@react-navigation/native";

function CarPage({route, navigation, setCarUrl}) {
    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);
        useEffect(() => {
            if (didMount.current) func();
            else didMount.current = true;
        }, deps);
    }

    const showConfirmDialog = () => {
        return Alert.alert(
            "Подтвердите действие",
            "Вы действительно хотите удалить объявление?",
            [
                // The "Yes" button
                {
                    text: "Да",
                    onPress: () => {
                        axios(`http://192.168.88.25:8888/cars/delete-car?id=${car.id}`)
                        navigation.navigate('Root', {
                            screen: 'Каталог автомобилей'
                        })
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "Нет",
                },
            ]
        );
    }

    const [characteristicsFlag, setCharacteristicsFlag] = useState(false)
    const [photo, setPhoto] = useState('')
    const [car, setCar] = useState({})
    const [options, setOptions] = useState([])
    const isFocused = useIsFocused()

    useEffect(() => {
        axios(`http://192.168.88.25:8888/cars/get-car-options?id=${route.params.car.id}`).then(carOptions => {
            setOptions(carOptions.data.map(it => it.option_name))
        })
        setCar(route.params.car)
    }, [])

    useEffect(() => {
        if (isFocused) {
            setCarUrl(`http://192.168.88.25:3000/cars/${route.params.car.id}`)
        }

    }, [isFocused])

    useDidMountEffect(() => {
        setPhoto(JSON.parse(car.photo))
        if (car.hasOwnProperty("body") && car.body != null) {
            setCharacteristicsFlag(true)
        }
    }, [car])

    return (
        <ScrollView>
            <View style={styles.row}>
                <Text style={{
                    fontSize: 20,
                }}>{car.name}</Text>
                <Text style={{
                    marginLeft: "auto",
                    marginRight: 8,
                    fontSize: 20,
                }}>{car.price}</Text>

            </View>
            <View>
                <Image
                    source={{uri: `http://192.168.88.25:8888//uploads/${photo}`}}
                    style={{width: '100%', height: 300}}
                    PlaceholderContent={<ActivityIndicator/>}
                />
            </View>
            {characteristicsFlag ?
                <View className={"field-name top-name"}><Text style={{
                    fontSize: 20,
                    borderBottomWidth: 2,
                    borderBottomColor: 'grey'
                }}>Технические характеристики:</Text></View> : undefined}
            {characteristicsFlag ?
                <View><Text>Марка машины: {`${car.brand}`}</Text></View> : undefined}
            {characteristicsFlag ?
                <View><Text>Модель машины: {`${car.model}`}</Text></View> : undefined}
            {characteristicsFlag ?
                <View><Text>Год производства: {`${car.productionyear}`}</Text></View> : undefined}
            {characteristicsFlag ? <View><Text>Тип кузова: {`${car.body}`}</Text></View> : undefined}
            {characteristicsFlag ?
                <View><Text>Общий пробег(км): {`${car.mileage}`}</Text></View> : undefined}
            <View><Text style={{
                fontSize: 20,
                borderBottomWidth: 2,
                borderBottomColor: 'grey'
            }}>Описание:</Text></View>
            <View><Text>{car.description}</Text></View>
            {options[0] !== undefined ?  <View><Text style={{
                fontSize: 20,
                borderBottomWidth: 2,
                borderBottomColor: 'grey'
            }}>Дополнительные опции: </Text></View> : undefined }
            {options[0] !== undefined ?  options.map((it, index) =>
                <View key={index}><Text >{it}</Text></View>
            ) : undefined}
            <View><Text style={{
                fontSize: 20,
                borderBottomWidth: 2,
                borderBottomColor: 'grey'
            }}>Телефон:</Text></View>
            <View><Text>{car.contacts}</Text></View>
            <Button buttonStyle={{
                marginTop: 10,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#aaaaaa'
            }} onPress={() => {
                navigation.navigate('Редактировать объявление', {car: car})
            }} title={"Редактировать объявление"}/>
            <Button buttonStyle={{
                marginTop: 10,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#aaaaaa'
            }} onPress={() => showConfirmDialog()} title={"Удалить объявление"}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    rowRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    row: {
        flexDirection: 'row',
    },

    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        width: 300,
        height: 300,
        backgroundColor: "red",
        marginBottom: 30,
    },
});

export default CarPage;
