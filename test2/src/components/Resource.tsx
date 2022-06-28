import * as React from "react";
import  {useContext, useState} from 'react';
import {Button,Text,FlatList, Image, StyleSheet, View, ScrollView,SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import Spinner from './Spinner';
import Setting from "./Setting";
import {getPublicResources} from '../services/ressource.service'



function Resource ({route,navigation})  {



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    image: {
        width: '90%',
        height: '50%',
        resizeMode: 'contain',
    },
    buttonGroup: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
});
export default Resource;
