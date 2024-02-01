import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Utils/Colors'
import { IP_URL } from '../Constant/Url'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const OrderScreen = ({ route, navigation }) => {

    const orderUrl = IP_URL + "/api/v1/order"
    const getCustomerUrl = IP_URL + "/customer"

    const [customerList, setCustomerList] = useState([])
    const [userId, setUserId] = useState("")

    useEffect(() => {
        AsyncStorage.getItem("userId").then(res => setUserId(res))
    }, [])

    const { name } = route.params
    const { price } = route.params
    const { priceId } = route.params
    const { stock } = route.params
    const { storeName } = route.params

    const [quantity, setQuantity] = useState(0)

    increaseCount = () => {
        if (quantity <= stock)
        setQuantity(quantity+1)
    }

    decreaseCount = () => {
        setQuantity(quantity-1)
    }

    useEffect(() => {
        axios.get(getCustomerUrl)
            .then((response) => {
                setCustomerList(response.data)
            })
            .catch(err => console.error(err.response.data))
    }, [])

    const customers = customerList.filter(customer => customer.userCredential)
    const filteredCustomers = customers.filter(customer => customer.userCredential.id === userId)
    console.log(filteredCustomers)
    const currentCustomerId = filteredCustomers[0]["id"]
    console.log(currentCustomerId)

    const handleOrder = () => {
        axios.post(orderUrl, {
            "customerId" : currentCustomerId,
            "orderDetails" : [
                {
                    "productPriceId" : priceId,
                    "quantity" : quantity
                }
            ]
        }).then(resp => {
            console.log(resp.data.message)
            Alert.alert(resp.data.message, "Thank you for shopping with us!")
            navigation.navigate("Tab")
        }).catch(err => console.error(err))
    }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={{justifyContent:"center", alignItems:"center", fontSize:30, fontWeight:"bold", marginBottom:20}}>CHECKOUT</Text>
        <View style= {{justifyContent: "center", alignItems:"center"}}>
            <View style= {{justifyContent: "center", alignItems:"center", margin:10}}>
                <Text style={{fontWeight: "bold", fontSize:27}}>{name.toUpperCase()}</Text>
                <Image
                    source={require('/home/user/OFFLINE/BATCH14/MOBILE/Shopemart/assets/images/product1.jpg')}
                    style={{width:200, height:200, borderRadius:10, margin:10}}
                    resizeMode='contain'
                />
                <Text style={{fontSize:23}}>{storeName}</Text>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize:23}}>Rp. {price}</Text>
                    <Text style={{fontSize:23}}>Stock: {stock}</Text>
                </View>
            </View>
            <Text style={{fontSize:23}}>Quantity</Text>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={decreaseCount}>
                    <Text style={{borderWidth: 2, textAlign:"center", fontWeight:"bold", margin:5, justifyContent:'center', alignItems:'center', fontSize:23}}>-</Text>
                </TouchableOpacity>
                <Text style={{textAlign:"center", fontWeight:"bold", margin:5, justifyContent:'center', alignItems:'center', fontSize:23}}>{quantity}</Text>
                <TouchableOpacity onPress={increaseCount}>
                    <Text style={{borderWidth: 2, textAlign:"center", fontWeight:"bold", margin:5, justifyContent:'center', alignItems:'center' , fontSize:23}}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', margin:50}}>
                <Text style={{fontWeight:"bold", fontSize: 21, textAlign:"center"}}>Total: </Text>
                <Text style={{fontWeight:"bold", fontSize: 21, textAlign:"center"}}>Rp. {price * quantity}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleOrder}>
                <Text style={{fontSize: 24, color: Colors.WHITE}}>Confirm</Text>
            </TouchableOpacity>
            <Text style={{alignItems: "center", fontWeight: "bold"}}>WARNING!</Text>
            <Text style={{alignItems: "center"}}>There will be no more confirmation after you click the confirm button</Text>
        </View>
    </SafeAreaView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1
    },
    button: {
        backgroundColor: Colors.BLACK,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
})