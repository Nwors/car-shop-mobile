import React, {useState} from 'react';
import {Text, View} from "react-native";
import {Button, Input} from "react-native-elements";
import Modal from 'react-native-modal';


function FilterBlock({setVisible, isVisible, filters, setFilters, changeFlag, flag}) {

    const onChangeText = (key, val) => {filters[key] = val}

    return (
        <Modal
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={200}
            animationOutTiming={200}
            style={{
            alignSelf: 'center',
            width: '100%',
            height: '100%',
            margin: 0,
            backgroundColor: '#ffffff'
        }} isVisible={isVisible}>
            <View style={{
                marginLeft: 25,
                marginTop: 0
            }}>
                <Text>Марка</Text>
                <Input
                    defaultValue={filters['brand'] !== undefined ? filters['brand'] : ''}
                    placeholder={'Введите марку'}
                    onChangeText={text => {
                        onChangeText('brand', text)
                    }}
                    containerStyle={{
                    height: 45,
                    width: '50%'
                }}/>
                <Text>Модель</Text>
                <Input
                    defaultValue={filters['model'] !== undefined ? filters['model'] : ''}
                    placeholder={'Введите модель'}
                    onChangeText={text => {
                        onChangeText('model', text)
                    }}
                    containerStyle={{
                    height: 45,
                    width: '50%'
                }}/>
                <Text>Ценовой фильтр</Text>
                <View style={{
                    flexDirection: "row",
                    marginTop: 25,
                    marginBottom: 5,
                }}>
                    <Input
                        defaultValue={filters['min'] !== undefined ? filters['min'] : ''}
                        placeholder={'от'}
                        onChangeText={text => {
                            onChangeText('min', text)
                        }}
                        containerStyle={{
                            height: 45,
                            width: '30%'
                        }}/>
                    <Text style={{fontSize: 30}}>-</Text>
                    <Input
                        defaultValue={filters['max'] !== undefined ? filters['max'] : ''}
                        placeholder={'до'}
                        onChangeText={text => {
                            onChangeText('max', text)
                        }}
                        containerStyle={{
                            height: 45,
                            width: '30%'
                        }}/>
                </View>

                <View style={{
                    flexDirection: "row",
                    marginTop: 25,
                    marginBottom: 5,
                }}>
                    <Button
                        onPress={() => {setVisible(false); changeFlag(!flag)}}
                        buttonStyle={{
                        width: '70%',
                        alignSelf: 'center',
                        backgroundColor: '#aaaaaa'
                    }} title={'Применить'}/>
                    <Button
                        onPress={() => {
                            changeFlag(!flag)
                            setVisible(false)
                            setFilters({})
                        }}
                        buttonStyle={{
                        width: '70%',
                        alignSelf: 'center',
                        backgroundColor: '#aaaaaa'
                    }} title={'Сбросить'}/>
                </View>
            </View>
        </Modal>

    );
}

export default FilterBlock;
