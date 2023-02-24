//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../theme/colors'
import HomeStackNavigator from './HomeStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import {BottomTabNavigatorParamList} from '../types/navigation'
import SearchTabNavigator from './SearchTabNavigator';
import CameraScreen from '../screens/CameraScreen';
import UploadStackNavigator from './UploadStackNavigator';

const Tab=createBottomTabNavigator<BottomTabNavigatorParamList>()
// create a component
const BottomTabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={{tabBarShowLabel:false,tabBarActiveTintColor:colors.primary,tabBarInactiveTintColor:colors.black}}>
        <Tab.Screen name="HomeStack" component={HomeStackNavigator}
        options={{headerShown:false,tabBarIcon: ({color, size}) => (<MaterialIcons name="home-filled" size={size} color={color} />)}}/>
        <Tab.Screen name="Search" component={SearchTabNavigator} 
        options={{headerShown:false, tabBarIcon: ({color, size}) => (<MaterialIcons name="search" size={size} color={color} />)}}/>
        <Tab.Screen name="Upload" component={UploadStackNavigator}
        options={{headerShown:false,
        tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="plus-circle-outline" size={size} color={color}/>)}}/>
        <Tab.Screen name="Notifications" component={CameraScreen}
        options={{tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="heart-outline" size={size} color={color}/>)}}/>
        <Tab.Screen name="MyProfile" component={ProfileStackNavigator}
        options={{headerShown:false,tabBarIcon: ({color, size}) => (<FontAwesome name="user-circle-o" size={size} color={color} />)}}/>

      </Tab.Navigator>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default BottomTabNavigator;
