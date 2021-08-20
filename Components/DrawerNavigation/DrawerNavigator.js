import React, {useRef, useState} from 'react';
import CarsPage from "../CarsPage/CarsPage";
import {Button, Text, View} from "react-native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import AdForm from "../AdForm";
import {Icon} from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import FilterBlock from "../CarsPage/FilterBlock/FilterBlock";
import CarPage from "../CarsPage/CarPage/CarPage";

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.navigate('Home')} title="Go back home" />
        </View>
    );
}

const Drawer = createDrawerNavigator();

function DrawerNavigator({}) {
    const [filterParams, setFilterParams] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    const [filterChanged, setFilterChanged] = useState(false)
    const refRBSheet = useRef();
    console.log(filterParams)
    return (
        <>
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Добавить объявление" component={AdForm} />
            <Drawer.Screen options={{
                headerRight: () => (
                    <Icon
                        onPress={() => setModalVisible(true)}
                        raised
                        name='dots-three-vertical'
                        type='entypo'
                    />)
            }} name="Каталог автомобилей" >
                {props => <CarsPage {...props} filters={filterParams} filterChanged={filterChanged}/>}
            </Drawer.Screen>
        </Drawer.Navigator>
        <FilterBlock
                     flag={filterChanged}
                     changeFlag={setFilterChanged}
                     setVisible = {setModalVisible}
                     isVisible={modalVisible}
                     filters={filterParams}
                     setFilters={setFilterParams}/>
        </>
    );
}

export default DrawerNavigator;
