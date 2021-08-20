
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View, Linking} from 'react-native';
import DrawerNavigator from "./Components/DrawerNavigation/DrawerNavigator";
import {BrowserRouter,  Switch, Route} from 'react-router-dom'
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import {Icon} from 'react-native-elements'
import CarPage from "./Components/CarsPage/CarPage/CarPage";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomMenu from "./Components/BottomMenu/BottomSlide";
import BottomSlide from "./Components/BottomMenu/BottomSlide";
import AdForm from "./Components/AdForm";

const Stack = createStackNavigator();

export default function App() {
    const [carUrl, setCarUrl] = useState('http:/10.0.2.2:3000/cars/')
    const refRBSheet = useRef();
    const loadInBrowser = () => {
        Linking.openURL(carUrl).catch(err => console.error("Couldn't load page", err));
    };

  return (
      <>
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen  component={DrawerNavigator} name={'Root'} options={{ title: '', headerShown: false }}/>
              <Stack.Screen
                  options={{
                      setCarUrl: setCarUrl,
                      headerRight: () => (
                          <Icon
                              raised
                              name='dots-three-vertical'
                              type='entypo'
                              onPress={() => refRBSheet.current.open()} />)
                  }}
                  name="car-page">
                  {props => <CarPage {...props} setCarUrl={setCarUrl}/>}
              </Stack.Screen>
              <Stack.Screen  component={AdForm} name={'Редактировать объявление'} options={{ title: 'Редактировать объявление'}}/>
          </Stack.Navigator>
          <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              customStyles={{
                  wrapper: {
                  },
                  container: {
                  height: 200,
                  backgroundColor: "rgba(255,255,255,0.9)"
                  },
                  draggableIcon: {
                      backgroundColor: "#000"
                  }
              }}
          >
               <BottomSlide carUrl={carUrl} close={() => refRBSheet.current.close()}/>
          </RBSheet>
      </NavigationContainer>
      </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
