import { View, Text ,Image, TextInput,StyleSheet, Alert} from 'react-native'
import React,{useState} from 'react'
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useCommentsService from '../../services/CommentsService'

interface IInput {
  postId:string
}

const Input = ({postId}:IInput) => {
const [newComment, setNewComment] = useState("")
const insets=useSafeAreaInsets()

const {onCreateComment} =useCommentsService(postId)
 // console.warn(postId)

  const onPost=async ()=>{
    onCreateComment(newComment)
    setNewComment("")
  }


  return (
    <View style={[styles.root,{paddingBottom:insets.bottom}]}>
      <Image source={{uri:"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg"}}
      style={styles.image}
      />
      <TextInput placeholder='Write your comment' value={newComment} style={styles.input}
    //   onChangeText={(text)=>setNewComment(text)}
      onChangeText={setNewComment}
      multiline

      />
      <Text onPress={onPost} style={[styles.button,{bottom:insets.bottom +7}]}>POST</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    image:{
        width:40,
        aspectRatio:1,
        borderRadius:20,
    },
    root:{
        flexDirection:'row',
        padding:5,
        borderTopWidth:1,
        borderColor: colors.border,
        alignItems:'flex-end',
    },
    input:{
        flex:1,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius:25,
        paddingVertical:5,
        paddingHorizontal:10,
        paddingRight:50,
        marginLeft:5,
    },
    button:{
        position:'absolute',
        right:15,
        fontSize: fonts.size.s,
        fontWeight:fonts.weight.full,
        color:colors.primary,
    }
})
export default Input