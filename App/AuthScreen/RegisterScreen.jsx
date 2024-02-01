import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../Utils/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

export default function RegisterScreen({navigation}) {

    const url = IP_URL + '/api/auth/register'; 

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("")

    const [showPassword, setShowPassword] = useState(false); 

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 

    const handleRegister = () => {
        if (password.length < 8) {
            Alert.alert("Password too short", "Cannot be less than 8 characters", [{ text: 'Try Again', onPress: () => setPassword("") }], { cancelable: false })
        }
        if (!email.includes('@')) {
            Alert.alert("Email invalid", "Please enter a valid email", [{ text: 'Try Again', onPress: () => setEmail("") }], { cancelable: false })
        }
        if (!phone.startsWith("08")) {
            Alert.alert("Phone number invalid", "Please enter a valid phone number", [{ text: 'Try Again', onPress: () => setPhone("") }], { cancelable: false })
        }
        if (username.length < 5 || username.length > 12) {
            Alert.alert("Username doesn't match requirement", "Must be more than 4 characters and not more than 12 characters", [{ text: 'Try Again', onPress: () => setUsername("") }], { cancelable: false })
        }
        if (name.length < 2) {
            Alert.alert("Name too short", "Must be at least 2 character", [{ text: 'Try Again', onPress: () => setName("") }], { cancelable: false })
        }
        if (name && username && password && phone && address && email) {
            axios.post(url, {
                username: username,
                password: password,
                fullName: name,
                mobilePhone: phone,
                address: address,
                email: email
            })
            .then((res) => {
                Alert.alert("Success", "Registration Successful", [{ text: 'Go to Login', onPress: () => navigation.navigate('Login') }], { cancelable: false }) 
            })
            .catch((err) => {
                Alert.alert("Failed", "Please fulfill the registration requirement", [{ text: 'Try Again', onPress: () => console.error("Registration Failed. Please try again") }], { cancelable: false })
                console.log(err.response.data)
            })   
        }
    }


  return (
    <ScrollView style={{backgroundColor:Colors.LIGHT_GREY}}>
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Register an Account</Text>
        <Text></Text>
        <View style={styles.inputView}>
            <TextInput style={styles.inputText} placeholder='Name' onChangeText={text => setName(text)} />
        </View>
        <View style={styles.inputView}>
            <TextInput style={styles.inputText} placeholder='Username' onChangeText={text => setUsername(text)} />
        </View>
        <View style={{...styles.inputView, flexDirection: "row", alignItems:"center",}}>
                <TextInput style={styles.inputText} placeholder='Password' secureTextEntry={!showPassword} onChangeText={text => setPassword(text)}/>
                <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} 
                        size={18} 
                        color="#aaa"
                        style={styles.icon} 
                        onPress={toggleShowPassword} 
                />
        </View> 
        <View style={styles.inputView}>
            <TextInput style={styles.inputText} placeholder='Phone' onChangeText={text => setPhone(text)} />
        </View>
        <View style={styles.inputView}>
            <TextInput style={styles.inputText} placeholder='Address' onChangeText={text => setAddress(text)} />
        </View>
        <View style={styles.inputView}>
            <TextInput style={styles.inputText} placeholder='Email' onChangeText={text => setEmail(text)} />
        </View>
        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>Already Have an Account?  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.login}>   Login  </Text>
            </TouchableOpacity>
        </Text>
        </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.LIGHT_GREY,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: Colors.BLACK,
        padding:30
    },
    inputView: {
        width: "80%",
        backgroundColor: Colors.WHITE,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        height: 50,
        color: Colors.BLACK
    },
    registerButton: {
        width: "80%",
        backgroundColor: Colors.BLACK,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    registerText: {
        color: Colors.WHITE
    },
    footerText : {
        textAlign: "center",
        color : Colors.BLACK,
    },
    login : {
        color : Colors.WHITE,
        backgroundColor: Colors.BLACK,
        fontSize : 13,
        borderRadius: 10
    },
    icon: { 
        marginLeft: 185,
        height: 20
    }, 
})