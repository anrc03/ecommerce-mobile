import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Utils/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {

    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")

    useEffect(() => {
        AsyncStorage.getItem("username").then(res => setUsername(res))
        /AsyncStorage.getItem("role").then(res => setRole(res))
    }, [])

    const handleLogout = () => { 
        let keys = ["username", "role", "token"]
        AsyncStorage.multiRemove(keys)
        navigation.navigate("Login")
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={{justifyContent: 'center', alignItems:'center'}}>
            <Image source={require('/home/user/OFFLINE/BATCH14/MOBILE/Shopemart/assets/images/pp.webp')} style={styles.pp} />
        </View>
      <Text style={{fontWeight: "bold"}}>{username}</Text>
      <Text>{role}</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pp: {
        height: 70,
        width: 70,
        borderRadius: 50
    },
    button: {
        backgroundColor: Colors.BLACK,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    logout: {
        textAlign: 'center', 
        fontSize: 17, 
        fontWeight: "bold", 
        color: Colors.WHITE,
    }
})