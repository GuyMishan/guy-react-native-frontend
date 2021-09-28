import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { ChatRoom } from "../types";
import ChatListItem from '../components/ChatComponents/ChatListItem';
import chatRooms from '../data/ChatRooms';
import Header from '../components/Header';


const Chats = () => {
    return (
        <SafeAreaView style={styles.safaAreaStyle}>
            <Header />
            <View style={styles.container}>
                <FlatList
                    style={{ width: '100%' }}
                    data={chatRooms}
                    renderItem={({ item }) => <ChatListItem chatRoom={item} />}
                    keyExtractor={(item) => item.id}
                />

            </View>
        </SafeAreaView>
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
    safaAreaStyle: {
        marginHorizontal : 10 , 
        flex: 1 
    }

});
