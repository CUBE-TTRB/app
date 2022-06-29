import * as React from "react";
import  { useState} from 'react';
import {View,  SafeAreaView, TextInput, Button} from 'react-native';
import {addRessources} from "../services/ressource.service";
import {DropDown} from "react-native-material-dropdown";



function AddResource  ({navigation})  {

    let [title,setTitle]=useState('');
    let [body,setBody]=useState('');
    let [type,setType]=useState('');
    let [visibility,setVisibility]=useState('');

    const DataVisibility =[{
        value: 'PUBLIC',
    },
        {
            value: 'PRIVATE',
        },{
            value: 'SHARED',
        }];

    const DataType=[{
        value: 'ACTIVITY',
    },
        {
            value: 'ARTICLE',
        },{
            value: 'COURSE',
        },
        {
            value: 'EXERCISE',
        },
        {
            value: 'BOOKLET',
        },
        {
            value: 'VIDEOGAME',
        },
        {
            value: 'VIDEO',
        },
        {
            value: 'CHALLENGE_CARD',
        }];


    function addResource(){
        setType='ARTICLE';
        setVisibility='PUBLIC';
        addRessources(title,body,type,visibility);
        navigation.navigate('ResourceContent');

    };

    return(
                <View>
                        <View >

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#fefefe"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={text => setTitle(text)}
                                value={title}
                            />
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#fefefe"
                                secureTextEntry
                                onChangeText={text => setBody(text)}
                                value={body}
                            />
                        </View>
                        <Button title="Login"  onPress={() => addResource()}  />
                </View>

    );

};
export default AddResource;

