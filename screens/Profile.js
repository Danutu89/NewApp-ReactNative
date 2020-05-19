import * as React from 'react';
import { View, StyleSheet, Image, AsyncStorage, Text, TouchableOpacity } from 'react-native';

export default class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: null,
            realname: null,
            avatar: null
        }
        this.update();
    }

    update = async()=>{
        let value = await AsyncStorage.multiGet(['name','realname','avatar']).then((value)=>{
            if(value != null){
                return value;
            };
        });
        this.setState({name: value[0][1], realname: value[1][1], avatar: value[2][1]});
        
    };

    logout = async()=>{
        AsyncStorage.clear();
        AsyncStorage.setItem('auth', 'false');
        this.props.navigation.navigate('Login');
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <View>
                        <Image style={styles.avatar} source={{uri: this.state.avatar}}/>
                    </View>
                    <View>
                        <Text style={styles.realname}>{this.state.realname}</Text>
                        <Text style={styles.name}>@{this.state.name}</Text>
                    </View>
                </View>
                <View style={styles.logout}>
                    <TouchableOpacity title="Login" style={styles.button} onPress={() => this.logout()}>
                        <Text style={{color: 'white'}}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    
}



const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 20
    },
    card: {
        padding: 10,
        display: "flex",
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: 'gray',
        elevation: 20,
        shadowOpacity: 3,
        shadowRadius: 30,
        shadowOffset: {
            height: 0,
            width: 0
        },
        borderRadius: 25
    },
    avatar: {
        height: 50,
        width: 50,
        resizeMode: 'stretch',
        borderRadius: 50
    },
    realname: {
        fontSize: 18,
        fontWeight: "600"
    },
    name: {
        fontWeight: "400",
        fontSize: 13
    },
    logout: {
        flex: 0,
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: "#007aff",
        padding: 8,
        borderRadius: 30,
        alignItems: "center",
    }
});