import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Image, Button, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements'

export default function SimpleImagePicker({setPhoto, startImage}) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Необходимо разрешить приложению доступ к камере');
                }
            }
        })();
    }, []);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync(
            {
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                //allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            }
        );
        if (!result.cancelled) {
            setPhoto(result)
            setImage(result.uri);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
                            style = {
                                {
                                    width: '20%',
                                    marginTop: 10,
                                    height: 60,
                                    justifySelf: 'center',
                                    backgroundColor: 'white'
                                }
                            }
                            onPress={pickImage}>
                            <View style={{marginVertical: 18}}>
                                <Icon
                                    name='camera'
                                    type='font-awesome' />
                            </View>
            </TouchableOpacity>
            {(image || startImage) && <Image source={(startImage !== undefined && !image) ? { uri: `http://192.168.88.25:8888/uploads/${JSON.parse(startImage)}` } : {uri: image}} style={{ width: 200, height: 200, marginTop: 10}}/>}
        </View>
    );
}


// export default function SimpleImagePicker({setPhoto}) {
//     const [imageSource, setImageSource] = useState(null);
//
//     function selectImage() {
//         let options = {
//             title: 'You can choose one image',
//             maxWidth: 256,
//             maxHeight: 256,
//             storageOptions: {
//                 skipBackup: true
//             }
//         };
//
//         ImagePicker.showImagePicker(options, response => {
//             console.log({ response });
//             if (response.didCancel) {
//                 console.log('User cancelled photo picker');
//                 Alert.alert('You did not select any image');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 let source = { uri: response.uri };
//                 console.log({ source });
//             }
//         });
//     }
//
//     return (
//         <TouchableOpacity
//             style = {
//                 {
//                     width: '20%',
//                     marginTop: 10,
//                     marginLeft: '40%',
//                     height: 60,
//                     justifySelf: 'center',
//                     backgroundColor: 'white'
//                 }
//             }
//             onPress={() =>
//                 ImagePicker.launchImageLibrary(
//                     {
//                         mediaType: 'photo',
//                         includeBase64: false,
//                     },
//                     (response) => {
//                         setPhoto(response)
//                     },
//                 )
//             }>
//             <View style={{marginVertical: 18}}>
//                 <Icon
//                     name='camera'
//                     type='font-awesome' />
//             </View>
//         </TouchableOpacity>
//     );
// }
