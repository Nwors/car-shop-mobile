import React, {useEffect} from 'react';
import {Text} from 'react-native'
import {Button, Card, Icon} from 'react-native-elements'
import {useHistory} from "react-router-native";

function CarCard({name, description, photo, navigation}) {
    return (
        <Card>
            <Card.Title>{name}</Card.Title>
            <Card.Divider/>
            <Card.Image resizeMode={"cover"} source={{uri: `http://192.168.88.25:8888/uploads/${photo}`}}>
            </Card.Image>
            <Text style={{marginBottom: 10}}>
                {description}
            </Text>
            <Button
                icon={<Icon name='code' color='black' />}
                onPress={() => navigation()}
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
                title='Подробнее'
            />
        </Card>
    );
}

export default CarCard;
