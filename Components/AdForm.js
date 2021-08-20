import React, {useEffect, useRef, useState} from 'react';
import {View, TextInput, ScrollView, Text, CheckBox, StyleSheet, ActivityIndicator} from 'react-native';
import {Button} from 'react-native-elements'
import {useController, useForm} from 'react-hook-form'
import axios from "axios";
import {Car} from "../Structures/Car";
import {TechnicalCharacteristics} from "../Structures/TechnicalCharacteristics";
import SimpleImagePicker from "./ImagePicker/ImagePicker";
import { ErrorMessage } from '@hookform/error-message'
import {useIsFocused} from "@react-navigation/native";

const Input = ({name, control, placeholder, style, rules, defaultValue, route}) => {
    const {field} = useController({
        control,
        name,
        rules,
        defaultValue: route.name === 'Добавить объявление' ? '' : (defaultValue === null || defaultValue === undefined) ? '' : defaultValue + ''
    })
    return (
        <TextInput value={field.value}
        placeholder={placeholder}
        style = {style}
        onChangeText={field.onChange}
        />
    )
}

function AdForm({route, navigation}) {
    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);
        useEffect(() => {
            if (didMount.current) func();
            else didMount.current = true;
        }, deps);
    }

    const [photo,setPhoto] = useState([])
    const {control, handleSubmit, unregister, formState: {errors}} = useForm()
    const [checkBoxValue, setCheckBoxValue] = useState(false)
    const [allOptions, setAllOptions] = useState([])
    const [loadingFlag, setLoadingFlag] = useState(false)
    const focus = useIsFocused()

    const characteristicsBlock = (
        <>
            <View>
                {errors.label && (<Text style={styles.errorMessage}>{errors.label.message}</Text>)}
                <Input
                    defaultValue={route.params ? route.params.car.brand : ''}
                    name={'label'}
                    rules={{required: 'Введите название марки'}}
                    control={control}
                    route={route}
                    style={styles.regularInput}
                    placeholder="Введите название марки"
                />
            </View>
            <View>
                {errors.model && (<Text style={styles.errorMessage}>{errors.model.message}</Text>)}
                <Input
                    defaultValue={route.params ? route.params.car.model : ''}
                    rules={{required: 'Введите название модели'}}
                    name={'model'}
                    control={control}
                    route={route}
                    style={styles.regularInput}
                    placeholder="Введите название модели"
                />
            </View>
            <View>
                {errors.year && (<Text style={styles.errorMessage}>{errors.year.message}</Text>)}
                <Input
                    defaultValue={route.params ? route.params.car.productionyear : ''}
                    rules={{required: 'Введите год производства', validate: {
                        isNumber: it => !isNaN(it) || "Введите корректный год производства",
                        aboveZero: it => !(it < 1800)  || "Введите корректный год производства",
                        toHigh: it => !(it > new Date().getFullYear()) || "Введите корректный год производства"
                    }}}
                    name={'year'}
                    control={control}
                    route={route}
                    style={styles.regularInput}
                    placeholder="Введите год производства"
                />
            </View>
            <View>
                {errors.body && (<Text style={styles.errorMessage}>{errors.body.message}</Text>)}
                <Input
                    defaultValue={route.params ? route.params.car.body : ''}
                    name={'body'}
                    rules={{required: 'Введите тип кузова'}}
                    control={control}
                    route={route}
                    style={styles.regularInput}
                    placeholder="Введите тип кузова"
                />
            </View>
            <View>
                {errors.mileage && (<Text style={styles.errorMessage}>{errors.mileage.message}</Text>)}
                <Input
                    defaultValue={route.params ? route.params.car.mileage : ''}
                    rules={{required: 'Введите пробег', validate: {
                        isNumber: it => !isNaN(it) || "Введите корректный пробег",
                        aboveZero: it => !(it < 0)  || "Введите корректный пробег",
                        toHigh: it => !(it > 2000000000) || "Введите корректный пробег"
                        }
                    }}
                    name={'mileage'}
                    control={control}
                    route={route}
                    style={styles.regularInput}
                    placeholder="Введите пробег"
                />
            </View>
        </>
    )

    const handleDelete = (id) => () => {
        const items = allOptions.filter(item => item !== id);
        unregister(`option${id}`)
        setAllOptions(items)
    }
    const onSubmit = (data) => {
        setLoadingFlag(true)
        let bodyFormData = new FormData();
        let characteristics
        if(checkBoxValue) characteristics = new TechnicalCharacteristics(data.label, data.model, data.year, data.body, data.mileage)
        let car = new Car(data.name, data.description, undefined, data.price, data.phone, characteristics, Object.keys(data)
            .filter(it => it.includes("option")).map(it => data[it])
        )
        if(!(route.name === 'Добавить объявление')) car['id'] = route.params.car.id

        let localUri = photo.uri
        let filename = localUri.split('/').pop()
        let match = filename.split('.')[1]
        let type = `${photo.type}/${match}`
        const newImageUri =  "file:///" + localUri.split("file:/").join("");


        const header = {
            'Accept': 'application/json',
            'content-type': 'multipart/form-data',
        }

        bodyFormData.append("car",JSON.stringify(car))
        bodyFormData.append("image", { uri: newImageUri, name: filename, type: type})
        fetch(route.name === 'Добавить объявление' ? 'http://192.168.88.25:8888/cars/add-car': 'http://192.168.88.25:8888/cars/update-car' , {
            headers: header,
            method: 'POST',
            body: bodyFormData
        }).then(it => {
            alert(route.name === 'Добавить объявление'? 'Ваше объявление успешно добавлено':'Ваше объявление успешно отредактировано')
            setTimeout(()=>{navigation.navigate('Root', {
                screen: 'Каталог автомобилей'
            })
            setLoadingFlag(false)
            },1000)
        })
    }

    if(loadingFlag) {
        return <ActivityIndicator style={{marginTop: 50}} size="large" color="#00ff00" />
    } else return (
        <ScrollView>
        <View>
            {errors.name && (<Text style={styles.errorMessage}>{errors.name.message}</Text>)}
            <Input
                defaultValue={route.params ? route.params.car.name : ''}
                rules={{required: 'Пожалуйста введите название объявления'}}
                name={'name'}
                control={control}
                route={route}
                style={styles.regularInput}
                placeholder="Введите название объявления"
            />
        </View>
        <View>
            {errors.description && (<Text style={styles.errorMessage}>{errors.description.message}</Text>)}
            <Input
                defaultValue={route.params ? route.params.car.description : ''}
                rules={{required: 'Пожалуйста введите описание'}}
                name={'description'}
                control={control}
                route={route}
                multiline={true}
                style={{textAlignVertical: "top", alignSelf: 'center', marginTop: 3,width: '90%', height: 75, fontSize: 20, backgroundColor: 'white'}}
                placeholder="Введите описание"
            />
        </View>
        <SimpleImagePicker startImage={route.params ? route.params.car.photo: undefined} setPhoto = {setPhoto}/>
        <View>
            {errors.phone && (<Text style={styles.errorMessage}>{errors.phone.message}</Text>)}
            <Input
                defaultValue={route.params ? route.params.car.contacts : ''}
                rules={{
                    required: 'Пожалуйста введите телефон',
                    validate: {
                    isNumber: it => !isNaN(it.slice(1)) || "Введите корректный номер",
                    checkFirst: it => !(isNaN(it) && it !== '+') || "Введите корректный номер"
                },
                    minLength: {
                    value: 11,
                    message: "Минимальная длина 11 символов"
                },
                    maxLength: {
                    value: 12,
                    message: "Максимальная длина 12"
                }}}
                name={'phone'}
                control={control}
                route={route}
                style={styles.regularInput}
                placeholder="Введите номер телефона"
            />
        </View>
        <View>
            {errors.price && (<Text style={styles.errorMessage}>{errors.price.message}</Text>)}
            <Input
                defaultValue={route.params ? route.params.car.price : ''}
                name={'price'}
                rules={{required: 'Пожалуйста введите цену', validate: {
                        isNumber: it => !isNaN(it) || "Введите корректную цену",
                        aboveZero: it => !(it < 0)  || "Введите корректную цену",
                        toHigh: it => !(it >= 2000000000000) || "Введите корректуню цену"
                    }}}
                control={control}
                route={route}
                style={styles.regularInput}
                placeholder="Введите цену продажи в рублях"
            />
        </View>
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    style={styles.checkbox}
                    value={checkBoxValue}
                    onValueChange={setCheckBoxValue}
                />
                <Text style={styles.label}>Указать технические характеристики</Text>
            </View>
        </View>
        {checkBoxValue && characteristicsBlock}
        <Button title={'+'}
            onPress={() => {
                const id = Math.floor(Math.random() * 999999)
                setAllOptions([
                    ...allOptions,
                    id
                ])
            }}
            buttonStyle={
                {
                    width: 50,
                    marginLeft: 5,
                    backgroundColor: 'rgba(220,220,220,1)',
                }
            }
        />
        {allOptions.map(itId =>
            <View>
                {errors[`option${itId}`] && (<Text key={itId-1} style={styles.errorMessage}>{errors[`option${itId}`].message}</Text>)}
                <View key = {Math.ceil(Math.random()*5000000)} style={styles.checkboxContainer}>
                    <Button title={'-'}
                            onPress={handleDelete(itId)}
                            buttonStyle={
                                {
                                    width: 50,
                                    marginLeft: 5,
                                    backgroundColor: 'rgba(220,220,220,1)',
                                }
                            }
                    />
                    <Input
                        route={route}
                        rules={{required: 'Введите опцию'}}
                        name={`option${itId}`}
                        control={control}
                        style={styles.inputWithBtn}
                        placeholder="Введите опцию"
                    />
                </View>
            </View>
        )}
        <Button
            onPress={handleSubmit(onSubmit)}
            buttonStyle={
                {
                    borderRadius: 0,
                    marginTop: 5,
                    marginRight: 0,
                    marginBottom: 0,
                    backgroundColor: 'rgba(220,220,220,1)',
                }
            }
            title={route.name === 'Добавить объявление' ? 'Опубликовать':'Отредактировать'}>Опубликовать</Button>
    </ScrollView>

    );
}

export default AdForm;

const styles = StyleSheet.create({
    regularInput: {
        textAlignVertical: "center",
        alignSelf: 'center',
        width: '90%',
        marginTop:3,
        height: 30,
        fontSize: 20,
        backgroundColor: 'white'
    },
    errorMessage: {
        marginTop: 5,
        color: 'red',
        alignSelf: 'center',
        width: '90%',
        height: 30,
        fontSize: 16,
    },

    inputWithBtn: {
        textAlignVertical: "top",
        alignSelf: 'center',
        width: '90%',
        height: 40,
        fontSize: 20,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainer: {
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
});
