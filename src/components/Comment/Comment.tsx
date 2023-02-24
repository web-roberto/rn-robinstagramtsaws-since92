import { View, Text,StyleSheet,Image, Pressable } from 'react-native'
import React,{useState} from 'react';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Comment as CommenType } from '../../API';
import dayjs from 'dayjs'
import UserImage from '../UserImage';


interface ICommentProps { //un objeto que contiene un comment
  comment:CommenType;
  includeDetails?:boolean;
  isNew?:boolean;
}
const Comment = ({comment,includeDetails=false,isNew=false}:ICommentProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(v => !v);
  };
  

  return (
    <View style={styles.comment}>
      {includeDetails && (
          <UserImage imageKey={comment?.User?.image || undefined} width={40}/>
          )}
      <View  style={styles.middleColumn}>
        <Text style={styles.commentText}>
          <Text style={styles.bold}>{comment.User?.username}</Text>
          {comment.comment}
        </Text>
        {includeDetails &&(<View style={styles.footer}>
          {isNew && <Text style={styles.new}>new</Text>}
          
          <Text style={styles.footerText}>{dayjs(comment.createdAt).fromNow()}</Text>
          <Text style={styles.footerText}>5 likes</Text>
          <Text style={styles.footerText}>Reply</Text>
        </View>)}
      </View>
    <Pressable onPress={toggleLike} hitSlop={5}>
      <AntDesign name={isLiked?'heart':'hearto'} size={14} style={styles.icon} color={isLiked?colors.accent:colors.black}/>
    </Pressable>
  </View>
  )
}
const styles = StyleSheet.create({
  avatar:{
    width:40,
    aspectRatio:1,
    borderRadius:25,
    marginRight:5,
  },
  icon:{
    marginHorizontal:5,
  },
  comment:{
    flexDirection: 'row',
    alignItems:'center',
  },
  commentText:{
    color:colors.black,    
    lineHeight:18,
  },
  bold:{
    fontWeight:fonts.weight.bold,
  },
  footer:{
    flexDirection:'row',
    marginBottom:10,

  },
  footerText:{
    marginRight:10,
  },
  middleColumn:{
    flex:1,
  },
  new:{
    backgroundColor:colors.primary,
    color:colors.white,
    paddingHorizontal:5,
    marginRight:5,
    borderRadius:5,
    overflow:'hidden',
  }
})

export default Comment
