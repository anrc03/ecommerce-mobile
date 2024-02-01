import React from 'react'
import { Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../Utils/Colors';
import HomeScreen from '../HomeScreen/HomeScreen';
import ProductScreen from '../ProductScreen/ProductScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.BLACK
        }}
    >
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
            tabBarLabel:({color}) => (
                <Text style={{color: color, fontSize: 12, marginTop: -7}}>Home</Text>
            ),
            tabBarIcon:({color, size}) => (
                <FontAwesome name="home" size={27} color={color} />
            )
        }}
      />
      <Tab.Screen name="Product" component={ProductScreen}
         options={{
            tabBarLabel:({color}) => (
                <Text style={{color: color, fontSize: 12, marginTop: -7}}>Products</Text>
            ),
            tabBarIcon:({color, size}) => (
                <Fontisto name="shopping-store" size={27} color={color} />
            )
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} 
         options={{
            tabBarLabel:({color}) => (
                <Text style={{color: color, fontSize: 12, marginTop: -7}}>Profile</Text>
            ),
            tabBarIcon:({color, size}) => (
                <FontAwesome name="user" size={24} color={color} />
            )
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation