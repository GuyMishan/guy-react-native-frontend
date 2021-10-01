import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, Dimensions } from 'react-native';
import { ChatRoom } from "../types";
import ChatListItem from '../components/ChatComponents/ChatListItem';
import chatRooms from '../data/ChatRooms';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { Images, argonTheme } from "../constants";
import { useNavigation } from '@react-navigation/core';

const { width, height } = Dimensions.get("screen");

const Chats = () => {
    const navigation = useNavigation();

    const OnTextInputFoccus = () => {
        navigation.navigate('ChatPersonSearch')
    };
    return (
        <>
            <Header />
            <TextInput
                right
                style={styles.search}
                placeholder="Who are you looking for?"
                placeholderTextColor={'#8898AA'}
                onFocus={() => OnTextInputFoccus()}
            />
            <View style={styles.container}>
                <FlatList
                    style={{ width: '100%' }}
                    data={chatRooms}
                    renderItem={({ item }) => <ChatListItem chatRoom={item} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </>
    );
}

export default Chats;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: argonTheme.COLORS.BORDER
    },

});
