import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Utils/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IP_URL } from '../Constant/Url';

const LoginScreen = ({navigation}) => {

    const url = IP_URL + '/api/auth/login'; 

    const [username, setUsername] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [token, setToken] = useState("")

    useEffect(() => {
        if (token) {
            navigation.navigate("Tab")
        } else {
            navigation.navigate("Login")
        }
    }, [token])

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 

    const handleLogin = () => {
        axios.post(url, {
            username: username,
            password: passwordInput
        })
        .then((res) => {
            console.log(res.data.message)
            console.log(res.data.data)
            const storeData = async () => {
                try {
                  await AsyncStorage.setItem("token", res.data.data.token);
                  setToken(res.data.data.token)
                  console.log(res.data.data.token)
                  await AsyncStorage.setItem("role", res.data.data.role);
                  await AsyncStorage.setItem("username", username);
                  console.log("success storing data")
                } catch (e) {
                  console.log(e)
                }
            };
            axios.defaults.headers.common = {Authorization: `Bearer ${res.data.data.token}`}
            storeData()
            Alert.alert("Login Success", "OK", [{ text: 'Get Started' }], { cancelable: false }) 
        })
        .catch((err) => {
            console.error(err)
            Alert.alert("Login Failed", "Wrong Combination", [{ text: 'Try Again', onPress: () => console.error("Login Failed. Please try again") }], { cancelable: false })
        })
    }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={{textAlign: "center", fontSize: 24, color: Colors.BLACK, fontWeight: "bold"}}>SHOPEMART</Text>
        <Text style={{textAlign: "center", fontSize: 16, color: Colors.BLACK, marginBottom: 20}}>Find All You Need in One App</Text>
        <Image source={require('/home/user/OFFLINE/BATCH14/MOBILE/Shopemart/assets/images/greyshop.jpg')} style={{width:90, height:80, marginBottom:40}} alt='logo'/>
        <Text style={{textAlign: "center", fontSize: 20, color: Colors.BLACK, fontWeight: "bold"}}>Start Shopping</Text>
        <View style={styles.inputBox}>
                <TextInput style={{margin: 5}} placeholder='Username' onChangeText={text => setUsername(text)}/>    
        </View>
        <View style={styles.inputBox}>
            <View style={{flexDirection: "row", alignItems:"center",}}>
                <TextInput style={{margin: 5}} placeholder='Password' secureTextEntry={!showPassword} onChangeText={text => setPasswordInput(text)}/>
                <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} 
                        size={21} 
                        color="#aaa"
                        style={styles.icon} 
                        onPress={toggleShowPassword} 
                />
            </View> 
        </View>
        <View>
        </View>
        <View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={{textAlign: 'center', fontSize: 17, fontWeight: "bold", color: Colors.WHITE}}>LOGIN</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>Don't Have Account? <TouchableOpacity onPress={() => navigation.navigate("Register")}><Text style={styles.signup}>   Sign Up  </Text></TouchableOpacity></Text>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.LIGHT_GREY,
    },
    inputBox: {
        width: '60%',
        borderRadius: 10,
        height: 40,
        marginTop: 20,
        justifyContent: 'center',
        backgroundColor: Colors.WHITE,
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
    footerText : {
        textAlign: "center",
        color : Colors.BLACK,
    },
    signup : {
        color : Colors.WHITE,
        backgroundColor: Colors.BLACK,
        fontSize : 13,
        borderRadius: 10
    },
    icon: { 
        marginLeft: 125 
    }, 
})