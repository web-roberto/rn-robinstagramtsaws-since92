import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts'

export default StyleSheet.create({
  post:{
  },
  image:{
    width:'100%',
    aspectRatio:1,
  },
  userAvatar:{
    width:50,
    height:50,
    borderRadius:25,
    marginRight:10,

  },
  header:{
    flexDirection: 'row',
    padding:10,
    alignItems:'center'
  },
  userName:{
    fontWeight: fonts.weight.bold,
    color: colors.black
  },

  iconContainer:{
    flexDirection: 'row',
    marginBotton: 5,   
  },
  footer:{
    padding:10,
  },
  text:{
    color:colors.black,
    lineHeight:18,
  },
  bold:{
    fontWeight:fonts.weight.bold,
  },
  icon:{
    marginHorizontal:5,
  },

})
