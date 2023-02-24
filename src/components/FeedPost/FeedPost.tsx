import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable, Alert} from 'react-native';
import colors from '../../theme/colors';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import Comment from '../Comment';
import DoublePressable from '../DoublePressable'
import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer';
import { useNavigation } from '@react-navigation/native';
import {FeedNavigationProp} from '../../types/navigation'
import { Post} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config'
import PostMenu from './PostMenu';
import useLikeService from '../../services/LikeService';
import dayjs from 'dayjs'
import Content from './Content';
import { Storage } from 'aws-amplify';
import UserImage from '../UserImage';
import Userimage from '../UserImage/UserImage';

interface IFeedPost {
  //post: IPost;
  post: Post;
  isVisible?:boolean
}

const FeedPost = ({post,isVisible}: IFeedPost) => {

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const {toggleLike,isLiked}=useLikeService(post) //custom Hook que devuele la fción que hemos quitado de aqui
  const {id, image,images,video, createdAt, description, User, nofComments, nofLikes, Comments} = post;

    // deseamos actualizar automáticamente post.Likes al crear un Like o al borrar un Like (que esté en caché
    // estos campos porque se leen en un Query -> Apollo actualiza en pantalla desde la caché.)
    // Solucion: graphql profundizamos Like a Post y a Like hasta que abarque post.Likes en likesForPostByUser
    const postLikes = post.Likes?.items.filter(like=> !like?._deleted) || []

  const navigation=useNavigation<FeedNavigationProp>()
 


  const navigateToUser=()=>{
    if (User) {
    navigation.navigate("UserProfile",{userId:User?.id}) //el usuario de este post
  }}
  const navigateToComments =()=>{
    //a todos los comentarios de este post (Click en 'View all comments')
    navigation.navigate("Comments",{postId:id}) 
    
  }
   const navigateToLikes=()=>{
    navigation.navigate("PostLikes",{id:post.id}) 
   }

  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded(v => !v); //UPDATE inmediatamente y no usa la variable del state
  };



  return(
    <View style={styles.post}>

      {/* Header */}
      <View style={styles.header}>
          <Userimage imageKey={User?.image || undefined} />
        <Text onPress={navigateToUser} style={styles.userName}>{User?.username && User.username}</Text>
        <PostMenu post={post}/>
    
      </View>

     {/* Content  */}
     <DoublePressable onDoublePress={toggleLike}>
      <Content post={post} isVisible={isVisible}/>
     </DoublePressable>
     
     {/* Footer */}
     <View style={styles.footer}>
      <View style={styles.iconContainer}>
         <Pressable onPress={toggleLike}>
          <AntDesign name={isLiked?'heart':'hearto'} size={24} style={styles.icon} color={isLiked?colors.accent:colors.black}/>
          </Pressable>
          <Ionicons name="chatbubble-outline" size={24} style={styles.icon}  color={colors.black}/>
          <Feather name="send" size={24} style={styles.icon}  color={colors.black}/>
          <Feather name="bookmark" size={24} style={{marginLeft:'auto'}}  color={colors.black}/>
      </View>
      {/* Likes */}

      {/* {nofLikes <=0 ? */}
      {postLikes?.length === 0 ? 
      (<Text>Be the first to like the post</Text>):(
            <Text style={styles.text} onPress={navigateToLikes}>
              Liked by{' '} 
              <Text style={styles.bold}>{postLikes[0]?.User?.username} {' '} </Text> 
              {postLikes.length > 1 && (<>{' '}and <Text style={styles.bold}>{nofLikes -1} others</Text></>)}
               
            </Text>
      )
      }
  
      </View>
      {/* Post descritption */}
      <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 0 : 3}>
        <Text style={styles.bold}>{User?.username}</Text>
        {description}
      </Text>
      <Text onPress={toggleDescriptionExpanded}>{isDescriptionExpanded? 'less':'more'}</Text>

      {/* Comments */}
      <Text onPress={navigateToComments}> View all {nofComments} comment </Text> 
        {(Comments?.items||[]).map((comment)=>(comment && <Comment key={comment.id} comment={comment} />))}
      {/* Posted date */}
      <Text>{dayjs(createdAt).fromNow()}</Text> 
    </View>
  );


};
export default FeedPost;
