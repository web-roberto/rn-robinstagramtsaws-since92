
import React, { useEffect, useState } from 'react'
import user from '../../assets/data/user.json'
import styles from './styles'
import Button from '../../components/Button'
import {Text, Image,View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {UserProfileNavigationProp} from '../../types/navigation'
import {Auth, Storage} from 'aws-amplify'
import { User } from '../../API';
import { DEFAULT_USER_IMAGE } from '../../config';
import { useAuthContext } from '../../contexts/AuthContext';
import UserImage from '../../components/UserImage';

interface IProfileHeader{
    user:User;

}


const ProfileHeader = ({user}:IProfileHeader) => {
    const [imageUri, setImageUri] = useState<string|null>(null)
    const navigation=useNavigation<UserProfileNavigationProp>()
    const {userId} =useAuthContext()

    navigation.setOptions({title:user?.username || 'Profile'})


    return (
      <View style={styles.root}>
          <View style={styles.headerRow}>
              {/* Profile image */}
              <UserImage imageKey={imageUri || undefined} width={100}/>
              {/* Posts, followers, following number */}
              <View style={styles.numberContainer}>
                  <Text style={styles.numberText}>{user.nofPosts}</Text>
                  <Text>Posts</Text>
              </View>
              <View style={styles.numberContainer}>
                  <Text style={styles.numberText}>{user.nofFollowers}</Text>
                  <Text>Followers</Text>
              </View>
              <View style={styles.numberContainer}>
                  <Text style={styles.numberText}>{user.nofFollowings}</Text>
                  <Text>Following</Text>
              </View>
  
          </View>
              <Text style={styles.name}>{user.name}</Text>
              <Text>{user.bio}</Text>
              {/* Buttons */}
              {userId===user.id && (
                <View style={{flexDirection:'row'}}>
                    <Button text="Edit" inline onPress={()=>navigation.navigate("EditProfile")}/>
                    {/* <Button text="Edit" inline onPress={()=>navigation.navigate('ProfileStackNavigator', { screen: 'EditProfile' })}/> */}
                    <Button text="Sign Out" inline onPress={()=> Auth.signOut()}/>
                </View>)
              }
        
          {/* Grid View Post */}
     
      </View>
    )
  }
  export default ProfileHeader