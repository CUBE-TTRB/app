
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Login from './src/components/Login';
import {AuthContext} from './src/context/AuthContext';
import * as Keychain from 'react-native-keychain';
import Dashboard from './src/components/Dashboard';
import Spinner from './src/components/Spinner';
import Register from "./src/components/Register";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const Stack = createNativeStackNavigator();
const Tab=createNativeStackNavigator();
/*
function StackScreen({navigation}){
    return(

        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{
                title:'Login',
                headerStyle:{
                    backgroundColor:'#f4511e',
                },
                headerTintColor:'#fff',
                headerTitleStyle:{
                    fontWeight:'bold',
                },
            }}
            />
            <Stack.Screen name="Spinner" component={Spinner} options={{
                title:'Spinner',
                headerStyle:{
                    backgroundColor:'#f4511e',
                },
                headerTintColor:'#fff',
                headerTitleStyle:{
                    fontWeight:'bold',
                },
            }}
            />
            <Stack.Screen name="Register" component={Register} options={{
                title:'Register',
                headerStyle:{
                    backgroundColor:'#f4511e',
                },
                headerTintColor:'#fff',
                headerTitleStyle:{
                    fontWeight:'bold',
                },
            }}
            />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{
                title:'Dashboard',
                headerStyle:{
                    backgroundColor:'#f4511e',
                },
                headerTintColor:'#fff',
                headerTitleStyle:{
                    fontWeight:'bold',
                },
            }}
            />
        </Stack.Navigator>

    )
}
*/

const App = ({navigation}) => {
    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState('loading');

    const loadJWT = useCallback(async () => {
        try {
            const value = await Keychain.getGenericPassword();
            const jwt = JSON.parse(value.password);

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


   /* if (authContext?.authState?.authenticated === false) {
        return (
            <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login}/>

            </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Dashboard" component={Dashboard}/>

            </Stack.Navigator>
            </NavigationContainer>
        );
    }*/
    // @ts-ignore
    return(
<NavigationContainer>
            <Stack.Navigator>
                {authContext?.authState?.authenticated===false ?(
                    <Stack.Screen name="Login" component={Login}/>
                ):(
                    <Stack.Screen name="Dashboard" component={Dashboard}/>
                )}
                <Stack.Screen name="Register" component={Register}/>
            </Stack.Navigator>
</NavigationContainer>

    )

};
export default App;
