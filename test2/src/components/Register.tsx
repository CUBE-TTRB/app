import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Button,
    Alert,
} from 'react-native';
import * as React from "react";
import {useState, useContext} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext} from "../context/AuthContext";
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from "../context/AxiosContext";
import Spinner from "./Spinner";
import Login from "./Login";

const Register = ({navigation}) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName]=useState('');
    const authContext = useContext(AuthContext);
    const {publicAxios} = useContext(AxiosContext);

    const onRegister = async  () => {
        try {
            console.log("test");
            const response = await publicAxios.post('/users', {
                user: { "name":name, "email":email }, auth: { "password":password },
            });
            console.log(response.data);

            const auth = await publicAxios.post('/sessions', {
                email, password,
            });
            console.log(auth.data);
            const {accessToken, refreshToken} = auth.data;
            authContext.setAuthState({
                accessToken,
                refreshToken,
                authenticated: true,
            });

            await Keychain.setGenericPassword(
                'token',
                JSON.stringify({
                    accessToken,
                    refreshToken,
                }),
            );
            return (navigation.navigate('Dashboard'));
        } catch (error){
            Alert.alert('Register failed', error.response.data.message);
        }
    };


    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.logo}>Re</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#fefefe"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    />

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#fefefe"
                    onChangeText={text => setName(text)}
                    value={name}
                    />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#fefefe"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
            </View>
            <Button title="Register" style={styles.button} onPress={() => onRegister()} />
            <Button title="Go to login" style={styles.button} onPress={() => navigation.navigate('Login')}  />
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    logo: {
        fontSize: 60,
        color: '#fff',
        margin: '20%',
    },
    form: {
        width: '80%',
        margin: '10%',
    },
    input: {
        fontSize: 20,
        color: '#fff',
        paddingBottom: 10,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        marginVertical: 20,
    },
    button: {},
});

export default Register;
