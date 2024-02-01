import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductDetailScreen = ({ route, navigation }) => {

    const { name } = route.params
    const { description } = route.params
    const { price } = route.params
    const { stock } = route.params
    const { storeName } = route.params
    const { address } = route.params
    const { phone } = route.params

  return (
    <View style={styles.container}>
      <Text style={{justifyContent:"center", alignItems:"center", fontSize:24, fontWeight:"bold", marginBottom:5}}>Product Details</Text>
      <Image
                source={require('/home/user/OFFLINE/BATCH14/MOBILE/Shopemart/assets/images/product1.jpg')}
                style={{width:250, height:250, borderRadius:10}}
                resizeMode='contain'
        />
        <View style= {{justifyContent: "center", alignItems:"center"}}>
            <View style= {{justifyContent: "center", alignItems:"center", margin:10}}>
                <Text style={{fontWeight: "bold", fontSize:21}}>{name.toUpperCase()}</Text>
                <Text>Description: {description}</Text>
                <Text>Rp. {price}</Text>
                <Text>Stock: {stock}</Text>
            </View>
            <View style= {{justifyContent: "center", alignItems:"center", margin:10}}>
                <Text style={{fontWeight: "bold", fontSize:18}}>{storeName}</Text>
                <Text>{address}</Text>
                <Text>{phone}</Text>
            </View>
        </View>
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
})