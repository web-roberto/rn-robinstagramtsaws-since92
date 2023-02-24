import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CommentsScreen from '../screens/CommentsScreen/CommentsScreen';
import {RootNavigatorParamList} from '../types/navigation'
import AuthStackNavigator from './AuthStackNavigator';
import {useAuthContext} from './../contexts/AuthContext'
import { useQuery } from '@apollo/client';
import { getUser } from './queries';
import { GetUserQuery, GetUserQueryVariables } from '../API';
import { ActivityIndicator, View } from 'react-native';
import EditProfileScreen from '../screens/EditProfileScreen';


const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const Navigation=()=>{
    const {user,userId}=useAuthContext()
    const {data,loading,error} = useQuery<GetUserQuery,GetUserQueryVariables>(getUser,{variables:{id:userId}})
    const userData=data?.getUser; //se llama automáticamente, pero ahora leemos el resultado
    //console.log('--userData en NAVIGATION ES: ',userData)

    if (user===undefined || loading){
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator />
        </View>
    )}

    let stackScreens=null;
    if(!user){
     stackScreens=(<Stack.Screen name="Auth" component={AuthStackNavigator} options={{headerShown:false}} />)
    } else if (!userData?.username){
        stackScreens=(<Stack.Screen name="EditProfile" component={EditProfileScreen} options={{title:"Setup Profile" }} />)
    } else{
        stackScreens=(
            <>
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{headerShown:false}} />
            <Stack.Screen name="Comments" component={CommentsScreen} options={{title:'Profile'}}/>  
            </> 
        );
    }





    return(
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:true}}>
          {stackScreens}
        </Stack.Navigator>    
    </NavigationContainer>
    )
}






export default Navigation;