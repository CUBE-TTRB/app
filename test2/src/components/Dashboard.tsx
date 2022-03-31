




import React, {useContext, useState} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import Spinner from './Spinner';

const Dashboard = ({navigation}) => {
    const axiosContext = useContext(AxiosContext);
    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState('idle');
    const [name, setName]=useState('');

    const loadname = async () => {
        setStatus('loading');
        try {
            const response = await axiosContext.authAxios.get('/users');
            setName(response.data.name);
            console.log(response.data.name);
            setStatus('success');
        } catch (error) {
            setStatus('error');
        }
    };



    return (
        <View style={styles.container}>


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
