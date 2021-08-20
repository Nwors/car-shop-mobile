import React, {useEffect, useState, useRef} from 'react';
import {ScrollView, Text} from 'react-native'
import Card from "./CarCard/CarCard";
import axios from "axios";
import {Button, Icon} from "react-native-elements";
import {useHistory} from "react-router-dom";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import DotsPagination from "./DotsPagination";
import BottomSlide from "../BottomMenu/BottomSlide";



function CarsPage({navigation, filters, filterChanged}) {
    const useDidMountEffect = (func, deps) => {
        const didMount = useRef(false);
        useEffect(() => {
            if (didMount.current) func();
            else didMount.current = true;
        }, deps);
    }
    const isFocused = useIsFocused()
    const [curPage,setCurPage] = useState(1)
    const [cars, setCars] = useState([])
    const [countOfPages, setCountOfPages] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const createQueryString = filters => {
        const price = `&price=${filters['min']}-${filters['max']}`
        const model = `&model=${filters['model']}`
        const brand = `&brand=${filters['brand']}`

        return `${(filters['min'] !== undefined && filters['max'] !== undefined ) ? price : ''}
                ${(filters['model'] && filters['model'] !== '') ? model : ''}
                ${(filters['brand'] && filters['brand'] !== '') ? brand : ''}`
    }
    useEffect(() => {
        if (isFocused) {
            axios(`http://192.168.88.25:8888/cars/get-car-page?page=1&per-page=5${createQueryString(filters)}`, {
            }).then(it => {
                setCars([...it.data.items])
                setTotalCount(it.data.totalCount)
            })
        } else {
            setCurPage(1)}
    }, [isFocused])

    useEffect(() => {
        setCurPage(1)
        axios(`http://192.168.88.25:8888/cars/get-car-page?page=1&per-page=5${createQueryString(filters)}`, {
        }).then(it => {
            setCars([...it.data.items])
            setTotalCount(it.data.totalCount)
        })
    }, [filterChanged])


    useEffect(() => {
        axios(`http://192.168.88.25:8888/cars/get-car-page?page=${curPage}&per-page=5${createQueryString(filters)}`, {
        }).then(it => {
            setCars([...cars, ...it.data.items])
        })
    }, [curPage])

    useDidMountEffect(() => {
        setCountOfPages(Math.ceil(totalCount / 5))

    }, [totalCount])


    // useEffect(() => {
    //
    // }, [])


    return (
        <ScrollView>
            {cars.map((car, index) => <Card key={index} description={car.description} photo={JSON.parse(car.photo)} name={car.name} navigation={() => {
                navigation.navigate('car-page', {
                car: car
            })
            }}/>)}
                <Button
                    onPress={() => {
                        if(!(curPage >= countOfPages)) setCurPage(curPage + 1)
                    }}
                    icon={<Icon name='code' color='black' />}
                buttonStyle={
                    {
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        backgroundColor: 'rgba(220,220,220,1)',
                    }
                }
                titleStyle={{color: 'black'}}
                title='Показать еще' />
            <DotsPagination curPage={curPage} numberOfPages={countOfPages}/>
        </ScrollView>
    );
}

export default CarsPage;
