import * as React from 'react';
import { MonoText } from '../components/StyledText';
import {instance} from '../modules/Instance.js';
import JWT from 'expo-jwt';
import { TextInput, StyleSheet, View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';

Login.navigationOptions = {
    header: null,
};

export default function Login({navigation, route}){

    const [username, onUserChangeText] = React.useState("Username");
    const [password, onPasswordChangeText] = React.useState("Password");

    async function MakeLogin(){
        const resp = await instance.get('/api/login', {
            auth: {
                username: username,
                password: password
            }
        }).then((resp)=>{
            return resp;
        });
        let token = await resp.data['login'];
        let data = await JWT.decode(token, "mRo48tU4ebP6jIshqaoNf2HAnesrCGHm");
        instance.defaults.headers.common['Token'] = token;
        for (const key in data) {
            if(typeof(data[key]) == "string" || typeof(data[key]) == "number" || typeof(data[key]) == "bool")
                await AsyncStorage.setItem(String(key), String(data[key]));
        };
        await AsyncStorage.setItem('token', token);
        navigation.replace('Home');
    }

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image style={styles.img} source={require('../assets/images/logo.png')}/>
                <Text style={styles.logoText}>NewApp</Text>
            </View>
            <TextInput value={username} onFocus={()=>{if(username==="Username")onUserChangeText("")}} onChangeText={text => onUserChangeText(text)} style={styles.input}/>
            <TextInput value={password} onFocus={()=>{if(password==="Password")onPasswordChangeText("")}} onChangeText={text => onPasswordChangeText(text)} style={styles.input}/>
            <View style={styles.login}>
                <TouchableOpacity title="Login" style={styles.button} onPress={() => MakeLogin()}>
                    <Text style={{color: 'white'}}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: '#efefef',
        borderWidth: 0,
        marginTop: 10,
        borderRadius: 40,
        paddingLeft: 10,
        paddingRight: 10
    },
    container: {
        padding: 20,
        marginTop: 100,
        alignContent: "center",
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column'
    },
    logo: {
        alignSelf: 'center',
        marginBottom: 70
    },
    img: {
        height: 160,
        width: 140,
        resizeMode: 'stretch'
    },
    logoText: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "200",
        marginTop: 10
    },
    login: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: "#007aff",
        padding: 8,
        borderRadius: 30,
        alignItems: "center",
    }
});