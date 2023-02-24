import React from 'react'
//import user from '../../assets/data/user.json'
import ProfileHeader from './ProfileHeader'
import FeedGridView from '../../components/FeedGridView'
import {useRoute, useNavigation } from '@react-navigation/native';
import {UserProfileNavigationProp,UserProfileRouteProp,MyProfileNavigationProp,MyProfileRouteProp} from '../../types/navigation'
import { getUser } from './queries';
import {useQuery} from '@apollo/client'
import ApiErrorMessage from '../../components/ApiErrorMessage';
import { GetUserQuery, GetUserQueryVariables } from '../../API';
import { ActivityIndicator } from 'react-native';
import { useAuthContext } from '../../contexts/AuthContext';



const ProfileScreen=()=>{
    const route=useRoute<UserProfileRouteProp|MyProfileRouteProp>()
    const navigation= useNavigation<UserProfileNavigationProp|MyProfileNavigationProp>()
    const {userId : AuthUserId} =useAuthContext()
    // if do not exists 'userId' We will show myProfile
    const userId = route.params?.userId || AuthUserId;

    const {data, loading, error, refetch} =useQuery<GetUserQuery,GetUserQueryVariables>(getUser,
        {variables:{id:userId}} ) 
       const user =data?.getUser

    if (loading) { return <ActivityIndicator />}
    if (error ||!user) { return <ApiErrorMessage title='Error fetching users' message={error?.message || "User not found"} 
    onRetry={()=>refetch()}/>}

    return(
        <FeedGridView
        data={user.Posts?.items ||[]}
        ListHeaderComponent={()=><ProfileHeader user={user}/>} 
        refetch={refetch}
        loading={loading}
        />

    )
}
export default ProfileScreen