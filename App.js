import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './App/AuthScreen/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './App/HomeScreen/HomeScreen';
import RegisterScreen from './App/AuthScreen/RegisterScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabNavigation from './App/Navigations/TabNavigation';
import ProfileScreen from './App/ProfileScreen/ProfileScreen';
import ProductScreen from './App/ProductScreen/ProductScreen';
import ProductDetailScreen from './App/ProductScreen/ProductDetailScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderScreen from './App/OrderScreen/OrderScreen';
// import * as SecureStore from "expo-web-browser";

const Stack = createNativeStackNavigator();

export default function App() {

  // const [token, setToken] = useState("")
  // useEffect(() => {
  //   AsyncStorage.getItem("token")
  //     .then(res => setToken(res))
  //     console.log(token)
  // },[])

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name = "Login" component={LoginScreen} />
          <Stack.Screen name = "Register" component={RegisterScreen} />
          <Stack.Screen name = "Home" component={HomeScreen} />
          <Stack.Screen name = "Tab" component={TabNavigation} />
          <Stack.Screen name = "Profile" component={ProfileScreen} />
          <Stack.Screen name = "Products" component={ProductScreen} />
          <Stack.Screen name = "Product Details" component={ProductDetailScreen} />
          <Stack.Screen name = "Order" component={OrderScreen} />
          {/* {token? (
            <>
              <Stack.Screen name = "Tab" component={TabNavigation} />
              <Stack.Screen name = "Home" component={HomeScreen} />
              <Stack.Screen name = "Profile" component={ProfileScreen} />
              <Stack.Screen name = "Products" component={ProductScreen} />
              <Stack.Screen name = "Product Details" component={ProductDetailScreen} />
            </>
          )
          :
          (
            <>
              <Stack.Screen name = "Login" component={LoginScreen} />
              <Stack.Screen name = "Register" component={RegisterScreen} />
            </>
          )
          } */}
         </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
