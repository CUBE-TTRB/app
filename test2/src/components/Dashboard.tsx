import * as React from "react";
import  {useContext, useState} from 'react';
import {Button,Text,FlatList, Image, StyleSheet, View, ScrollView,SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import Spinner from './Spinner';
import Setting from "./Setting";

function Dashboard ({route,navigation})  {
    const axiosContext = useContext(AxiosContext);
    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState('idle');
    const [name, setName]=useState('');
    let [response, setResponse]=useState([]);
    const loadname = async () => {
        setStatus('loading');
        try {
             setResponse = await axiosContext.authAxios.get('/users');
            setName(response.data.name);
            console.log(response.data.name);
            setStatus('success');
        } catch (error) {
            setStatus('error');
        }
    };

    let listViewItemSeparator = () => {
        return (
          <View
            style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
          />
        );
    };


    let ListReponse= (item) =>{
        return(
          <View
                key={item.id}
                style={{backgroundColor: 'white', padding :20}}>
              <Text style={{color: 'black'}}>Id: {item.id}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Email: {item.email}</Text>

    </View>
        );
    };


    return (

        <View style={styles.container}>
            <Text style={{color: 'black'}}>Info</Text>
            <Text style={{color: 'black'}}>Id: {name}</Text>
            <FlatList
            data={response}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item})=> ListReponse(item)}
            />
            <View style={styles.buttonGroup}>
                <Button title="Logout" onPress={() => authContext.logout()} />
            </View>
        </View>

    );
};

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
export default Dashboard;
