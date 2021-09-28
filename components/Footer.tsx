import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from "react-native";

import { Images } from "../constants";
import argonTheme from '../constants/Theme';

import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { api } from '../config.json'
import { useNavigation } from '@react-navigation/core';

import { Ionicons } from '@expo/vector-icons';

const Footer = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState<any>([])

    async function Getuserbytoken() {
        var gettoken
        try {
            gettoken = await AsyncStorage.getItem('user_id_token')
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

    function handleProfilePress() {
        return (navigation.navigate('Profile', { userid: user._id, }))
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
                <TouchableOpacity activeOpacity={.5} onPress={() => handleProfilePress()}>
                    <Image
                        source={{ uri: Images.ProfilePicture }}
                        style={styles.avatar} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="home" size={30} color="black" onPress={handleHomePress} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="search" size={30} color="black" onPress={handleSearchPress} />
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