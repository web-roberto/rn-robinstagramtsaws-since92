import { Image } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import logo from '../assets/images/logo.png';
import {HomeStackNavigatorParamList} from '../types/navigation'
import UpdatePostScreen from '../screens/UpdatePostScreen'
import PostLikesScreen from '../screens/PostLikesScreen/PostLikesScreen';

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();


const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
            <Stack.Screen name="Feed" component={HomeScreen} options={{headerTitle:HeaderTitle,headerTitleAlign:'center'}}/>
            <Stack.Screen name="UserProfile" component={ProfileScreen} options={{title:'Profile'}}/>
            <Stack.Screen name="UpdatePost" component={UpdatePostScreen} options={{title:'Update Post'}}/>
            <Stack.Screen name="PostLikes" component={PostLikesScreen} options={{title:'Post Likes',headerTitleAlign:'center'}}/>

    </Stack.Navigator> 

  )
}
const HeaderTitle=()=> {
    return (
      <Image source={logo} resizeMode="cover" style={{width:'70%',height:44, maxWidth: 300,maxHeight: 70,}}/>
    )
  }   
export default HomeStackNavigator