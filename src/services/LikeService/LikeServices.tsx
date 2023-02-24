import { useMutation, useQuery } from "@apollo/client"
import { CreateLikeMutation, CreateLikeMutationVariables, DeleteLikeMutation, DeleteLikeMutationVariables, LikesForPostByUserQuery, LikesForPostByUserQueryVariables, Post, UpdatePostMutation, UpdatePostMutationVariables } from "../../API"
import { useAuthContext } from "../../contexts/AuthContext";
import { likesForPostByUser, updatePost } from './queries';
import { createLike, deleteLike } from './queries';

// creamos customs Hooks que se encargar de la 'logica de UI' y dejamos la 'logica de Bussiness'

const useLikeService =(post:Post)=>{
    const {userId} =useAuthContext()
    const {data:usersLikeData} = useQuery<LikesForPostByUserQuery,LikesForPostByUserQueryVariables>(likesForPostByUser,
        {variables:{postID:post.id, userID:{eq: userId}}})
    const [doUpdatePost] =useMutation<UpdatePostMutation,UpdatePostMutationVariables>(updatePost)
    const [doCreateLike]=useMutation<CreateLikeMutation,CreateLikeMutationVariables>(createLike,
          // despues del mutation (escritura), reejecutamos la lectura: refetchQueries:["LikesForPostByUser"]
        {variables:{input:{userID:userId,postID:post.id}},refetchQueries:["LikesForPostByUser"],})
        const [doDeleteLike]=useMutation<DeleteLikeMutation,DeleteLikeMutationVariables>(deleteLike)

        const userLike=(usersLikeData?.likesForPostByUser?.items ||[]).filter(like=> !like?._deleted)?.[0] 

    

  // en DYNAMODB el count(*) de registros de Likes es lento-> campo NofLikes en la Tabla de Post y tras crear o borrar
  //un registro en Likes, actualizamos del Post el campo NofLikes y tambien el _deleted de Like nivel 1
  const incrementNofLikes =(amount:1|-1)=>{ //custom Hook que devuele la fción que hemos quitado de aqui

    doUpdatePost({
      variables:{
        input:{
        id: post.id,
        _version:post._version,
        nofLikes: post.nofLikes + amount
        }
      }
    })
  }

  const onAddLike=()=>{
    doCreateLike();   
    incrementNofLikes(1)}
  
  const onDeleteLike=()=>{
    if (!userLike) {return}
    //delete userLike
    doDeleteLike({variables:{input:{id:userLike.id,_version:userLike?._version}}})
    incrementNofLikes(-1)}

    const toggleLike = () => {
        if (userLike){onDeleteLike()
        }else{ onAddLike()}
    }
 


    return {toggleLike,isLiked:!!userLike}
}
export default useLikeService