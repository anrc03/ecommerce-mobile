import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../Header/Header'

export default function HomeScreen({navigation}) {
  return (
    <ScrollView>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Header />
        <View style={styles.imageContainer}>
          <Text style={styles.bannerText}>THIS WEEKEND ONLY</Text>
          <Image source={require('/home/user/OFFLINE/BATCH14/MOBILE/Shopemart/assets/images/banner2.jpg')} style={styles.image}/>
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.bannerText}>LIMITED STOCK</Text>
          <Image source={require('/home/user/OFFLINE/BATCH14/MOBILE/Shopemart/assets/images/banner3.webp')} style={styles.image}/>
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.bannerText}>SPECIAL SALE</Text>
          <Image source={require('/home/user/OFFLINE/BATCH14/MOBILE/Shopemart/assets/images/banner4.webp')} style={styles.image}/>
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.bannerText}>STAY TUNED!</Text>
          <Image source={require('/home/user/OFFLINE/BATCH14/MOBILE/Shopemart/assets/images/banner5.jpg')} style={styles.image}/>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 350,
    height: 150,
    margin: 10
  },
  image: {
    flex:1,
    width: undefined, 
    height: undefined, 
    borderRadius: 5
  },
  bannerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24
  }
})