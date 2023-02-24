import { Text,StyleSheet, Alert } from 'react-native'
import React from 'react'
import { Menu, MenuOption, MenuOptions, MenuTrigger,renderers } from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import {useMutation} from '@apollo/client'
import {deletePost} from './queries'
import { DeletePostMutation, Post, DeletePostMutationVariables } from '../../API';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { FeedNavigationProp } from '../../types/navigation';
import { Storage } from 'aws-amplify';

interface IPostMenu{
  post:Post;
}

const PostMenu= ({post}:IPostMenu ) => {
  const [doDeletePost] = useMutation<DeletePostMutation,DeletePostMutationVariables>(deletePost,{variables:{input:{id:post.id, _version:post._version}}})
  const navigation =useNavigation<FeedNavigationProp>() //'Feed' el la 1ª screen de HomeStackNavigator donde est 'UpdatePost'
  const {userId} =useAuthContext()
  const isMyPost=(userId===post.userID)

  const startDeletingPost =async()=>{
    if (post.image){ await Storage.remove(post.image)}
    if (post.video){ await Storage.remove(post.video)}
    if (post.images){ await Promise.all(post.images.map(img=>Storage.remove(img)))}

   
    try  {
      await doDeletePost()
    }catch(e){
      Alert.alert('Failed to delete post',(e as Error).message)
    }
// tambies pueden definirse aqui las variables    const response= await doDeletePost({variables:{input:{id:post.id, _version:post._version}}})
    console.log('---------------startDeletingPost------------------',JSON.stringify(response, null, 2));
  }

  const onDeleteOptionPressed =()=>{
    Alert.alert('Are you sure?','Deleting a post is permanent',[
      {text:'Cancel',style:'cancel',},
      {text:'Delete post',style:'destructive',onPress: startDeletingPost},
    ])
  }
 
  const onEditOptionPressed=()=>{
    navigation.navigate('UpdatePost',{id:post.id})
  }
  
  return (
    <Menu renderer={renderers.SlideInMenu}  style={styles.threeDots}>
    <MenuTrigger>
      <Entypo name="dots-three-horizontal"
          size={16}
         />
    </MenuTrigger>
    <MenuOptions>
      <MenuOption onSelect={() => Alert.alert(`Reporting`)}>
        <Text style={styles.optionText}>Report</Text>
      </MenuOption>
    {isMyPost && (<>
      <MenuOption onSelect={onDeleteOptionPressed} >
      <Text style={[styles.optionText,{color: 'red'}]}>Delete</Text>
      </MenuOption>
      <MenuOption onSelect={onEditOptionPressed}>
      <Text style={styles.optionText}>Edit</Text>
      </MenuOption>
      </>)
    }
     
    
    </MenuOptions>
  </Menu>
  )
}
const styles = StyleSheet.create({
  threeDots:{
    marginLeft:'auto'
  },
  optionText:{
    textAlign:'center',
    fontSize:20,
    padding:10,
  }
})

export default PostMenu