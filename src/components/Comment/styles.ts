import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts'

export default StyleSheet.create({
  icon:{
    marginHorizontal:5,
  },
  comment:{
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor:'red'

  },
  commentText:{
    color:colors.black,    
    backgroundColor:'blue',
    flex:1
  },
  text:{
    color:colors.black,
    lineHeight:18,
  },
  bold:{
    fontWeight:fonts.weight.bold,
  },
})
