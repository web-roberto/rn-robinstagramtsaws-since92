import { View, Text, Alert } from 'react-native'
import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { CreateCommentMutation, CreateCommentMutationVariables, Post, UpdatePostMutation, UpdatePostMutationVariables, GetPostQuery, GetPostQueryVariables } from '../../API';
import { updatePost, createComment, getPost } from './queries';
import { useAuthContext } from '../../contexts/AuthContext';

const useCommentsService = (postId:string) => {
    const {userId}=useAuthContext()
    const {data:postData}=useQuery<GetPostQuery,GetPostQueryVariables>(getPost,{variables:{id:postId}})
    const [doUpdatePost] =useMutation<UpdatePostMutation,UpdatePostMutationVariables>(updatePost)
    const [doCreateComment] =useMutation<CreateCommentMutation,CreateCommentMutationVariables>(createComment)
    const post=postData?.getPost;

    const incrementNofComments =(amount:1|-1)=>{ //custom Hook que devuele la fción que hemos quitado de aqui
        // si se retrase la carga del Post en el useQuery, paramos la ejecución aquí
        if(!post) {Alert.alert('Failed to load post. Try again later'); return}
        doUpdatePost({
          variables:{
            input:{
            id: post?.id,
            _version:post?._version,
            nofComments: post?.nofComments + amount
            }}
        })
      }

      const onCreateComment=async (newComment:string)=>{
        // si se retrase la carga del Post en el useQuery, paramos la ejecución aquí
        if(!post) {Alert.alert('Failed to load post. Try again later'); return}
        try {
          await doCreateComment({
            variables:{input:{
              comment:newComment,
              userID:userId,
              postID:post.id,
            }}})
            incrementNofComments(1)
        } catch(e) {
          Alert.alert('Error submitting the post',(e as Error).message)
        }
        
      }


  return {
    onCreateComment,
  }
}

export default useCommentsService