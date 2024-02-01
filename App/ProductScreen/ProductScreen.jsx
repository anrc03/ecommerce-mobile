import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import axios from '../Utils/AxiosInterceptor'
import { IP_URL } from '../Constant/Url'
import axios from 'axios'
import Header from '../Header/Header'

const ProductScreen = ({navigation}) => {

    const url = IP_URL + "/api/v1/products"

    const [productList, setProductList] = useState([])

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setProductList(response)
            })
            .catch(err => console.error(err.response.data))
    }, [])

    console.log(productList.data)


  return (
    <SafeAreaView style={styles.container}>
        <Header />
        <Text style={{justifyContent:"center", alignItems:"center", fontSize:24, fontWeight:"bold", marginTop: 10}}>Our Products</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={productList.data}
        style={{padding: 10}}
        renderItem={({ item, index }) => (
            <TouchableOpacity style={{margin:10, borderWidth: 1, borderRadius: 5}} onPress={() => {
                navigation.navigate('Product Details', {
                    priceId: item.productPriceId,
                    name: item.productName,
                    description: item.description,
                    price: item.price,
                    stock: item.stock,
                    storeName: item.store.storeName,
                    address: item.store.address,
                    phone: item.store.phone
                })
            }}>
                <Image
                source={require('/home/user/OFFLINE/BATCH14/MOBILE/Shopemart/assets/images/product1.jpg')}
                style={{width:150, height:150, borderRadius: 5}}
                resizeMode='contain'
                />
                <View style= {{justifyContent: "center", alignItems:"center"}}>
                    <Text>{item.productName}</Text>
                    <Text>{item.store.storeName.toUpperCase()}</Text>
                    <Text>Rp. {item.price}</Text>
                </View>
            </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{justifyContent:"center", alignItems:"center", flex: 1}}>No Product Available</Text>}
        />
    </SafeAreaView>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})