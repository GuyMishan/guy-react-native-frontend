import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
    Alert,
    View,
    Image,
    Text,
    TouchableOpacity
} from "react-native";

import { Images } from "../constants";
import Icon from './Icon';
import argonTheme from '../constants/Theme';

import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { api } from '../config.json'
import { CommonActions } from '@react-navigation/native';

const Footer = ({ navigation }) => {
    const [user, setUser] = useState([])

    async function Getuserbytoken() {
        try {
            var gettoken = await AsyncStorage.getItem('user_id_token')
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
        axios.post(`${api}/api/getuserbyid`, { userid: gettoken })
            .then(response => {
                setUser(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleHomePress = () => {
        return (navigation.navigate('Home'));
    }

    function handleProfilePress (){
        return(navigation.navigate('Profile',{userid:user._id,}))
    }

    const handleSearchPress = () => {
        return (navigation.navigate('PersonSearch'));
    }

    useEffect(() => {
        Getuserbytoken()
    }, [])

    return (
        <View style={{ flexDirection: "row", height: 55, backgroundColor: "#FFFF", alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={.5} onPress={()=>handleProfilePress()}>
                    <Image
                        source={{ uri: Images.ProfilePicture }}
                        style={styles.avatar} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Icon
                    name={"home"} family="entypo"
                    size={30} onPress={handleHomePress}
                    color={argonTheme.COLORS.ICON} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Icon
                    name={"search"} family="Ionicons"
                    size={30} onPress={handleSearchPress}
                    color={argonTheme.COLORS.ICON} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 60,
        borderWidth: 0
    },
});

export default Footer;