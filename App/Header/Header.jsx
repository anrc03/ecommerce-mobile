import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Utils/Colors';

function Header() {

    const [username, setUsername] = useState("")

    useEffect(() => {
        AsyncStorage.getItem("username").then(res => setUsername(res))
    }, [username])

  return (
    <View style={styles.container}>
        <View style={styles.profileContainer}>
            <Image 
                source = {require('/home/user/OFFLINE/BATCH14/MOBILE/Shopemart/assets/images/pp.webp')}
                style = {styles.userImage}
            />
            <View>
                <Text style={{color:Colors.WHITE, fontSize: 15}}>Welcome</Text>
                <Text style={{color:Colors.WHITE, fontWeight:'bold', fontSize: 24}}>{username}!</Text>
            </View>
        </View>

        <View style={styles.searchBarContainer}>
            <TextInput placeholder='Search' style={styles.textInput}/>
            <FontAwesome5 name="search" size={24} color={Colors.LIGHT_GREY} style={styles.searchBtn} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 99
    },
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.BLACK,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchBarContainer: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
        marginTop: 20
    },
    textInput: {
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        width: '85%',
        fontSize: 16
    },
    searchBtn: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: Colors.WHITE
    }
})

export default Header