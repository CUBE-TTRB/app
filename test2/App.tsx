import * as React from "react";
import {useCallback, useContext, useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import Login from './src/components/Login';
import {AuthContext} from './src/context/AuthContext';
import * as Keychain from 'react-native-keychain';
import Dashboard from './src/components/Dashboard';
import Spinner from './src/components/Spinner';
import Register from "./src/components/Register";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Setting from "./src/components/Setting";
import {Resource} from "./src/components/ResourceContent";
import AddResource from "./src/components/AddResource";




const Stack = createNativeStackNavigator();
const Tab=createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function Root () {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
}

function MyDrawer () {
    return(
        <Drawer.Navigator >
            <Drawer.Screen name="Root" component={Root}/>
            <Drawer.Screen name="Dashboard" component={Dashboard}/>
            <Drawer.Screen name="Setting" component={Setting}/>
            <Drawer.Screen name="Register" component={Register} />
            <Drawer.Screen name="Resource" component={Resource}/>
            <Drawer.Screen name="AddResource" component={AddResource}/>
        </Drawer.Navigator>
    );
};

function App (){
    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState('loading');

    const loadJWT = useCallback(async () => {
        try {
            const value = await Keychain.getGenericPassword();
            // @ts-ignore
            if ("password" in value) {
                const jwt = JSON.parse(value.password);
            }

            authContext.setAuthState({
                accessToken: jwt.accessToken !== null,

            });
            setStatus('success');
        } catch (error) {
            setStatus('error');
            console.log(`Keychain Error: ${error.message}`);
            authContext.setAuthState({
                accessToken: null,

            });
        }
    }, []);

    useEffect(() => {
        loadJWT();
    }, [loadJWT]);



    // @ts-ignore
    // @ts-ignore
    return(
      // @ts-ignore
        <NavigationContainer>

                {authContext?.authState?.authenticated===false ?(
                    <Stack.Screen name="Login" component={Login}/>
                ):(
                    <MyDrawer />
                )}
                <Stack.Screen name="Register" component={Register}/>

        </NavigationContainer>

    )

};


export default  App;


