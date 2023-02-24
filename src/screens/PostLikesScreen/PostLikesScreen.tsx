import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import {likesForPostByUser} from './queries'
import { LikesForPostByUserQuery, LikesForPostByUserQueryVariables } from '../../API'
import { useQuery } from '@apollo/client'
import { useRoute } from '@react-navigation/native';
import { PostLikesRouteProp } from '../../types/navigation'
import ApiErrorMessage from '../../components/ApiErrorMessage'
import UserListItem from '../../components/UserListItem'

// count(*) del nº de likes es LENTO EN DYNAMODB, llevar nosotros la cuenta aqui

const PostLikesScreen = () => {
    const route =useRoute<PostLikesRouteProp>()
    const {id}=route.params
    const {data,loading,error,refetch} = useQuery<LikesForPostByUserQuery,LikesForPostByUserQueryVariables>(likesForPostByUser,
        {variables:{postID:id}})

    if(loading){return <ActivityIndicator />}
    if(error){return (<ApiErrorMessage title='Error fetching likes' message={error.message}/>)}
    const likes=data?.likesForPostByUser?.items.filter(like=>!like?._deleted) ||[]
    console.log('----------PostLikesScreen-------------------------data-----',JSON.stringify(data?.likesForPostByUser?.items, null, 2));
    console.log('----------PostLikesScreen-------------------------likes-----',JSON.stringify(likes, null, 2));
  return (
    <FlatList data={likes} renderItem={({item})=><UserListItem user={item?.User}/>}
   refreshing={loading} onRefresh={refetch} />

  )
}

export default PostLikesScreen