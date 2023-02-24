import { View, Text,Image,ActivityIndicator, Alert } from 'react-native'
import React,{useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import { GetUserQuery, GetUserQueryVariables, UpdateUserMutation, UpdateUserMutationVariables, DeleteUserMutation, DeleteUserMutationVariables, UsersByUsernameQuery, UsersByUsernameQueryVariables } from '../../API';
import { getUser, updateUser,deleteUser,usersByUsername } from './queries';
import { useQuery,useMutation,useLazyQuery } from '@apollo/client';
import { useAuthContext } from '../../contexts/AuthContext';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import { DEFAULT_USER_IMAGE } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { Storage } from 'aws-amplify'
import styles from './styles'
import CustomInput,{IEditableUSer} from './CustomInput';
import {v4 as uuidv4} from 'uuid'


const URL_REGEX =
/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;

const EditProfileScreen = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<null | Asset>(null)
    // control={control} en cada Input
    //y onPress={handleSubmit(onSubmit)}
    const {control,handleSubmit,setValue}=useForm<IEditableUSer>();
    const navigation =useNavigation()

    const {userId,user:authUser} = useAuthContext()
    const {data,loading,error} = useQuery<GetUserQuery,GetUserQueryVariables>(getUser,{variables:{id:userId}})
    const user =data?.getUser;
    const [getUsersByUsername] = useLazyQuery<UsersByUsernameQuery,UsersByUsernameQueryVariables>(usersByUsername)
    const [doUpdateUser,{loading:updateLoading,error: updateError}] =useMutation<UpdateUserMutation,UpdateUserMutationVariables>(updateUser)
    const [doDelete,{loading:deleteLoading,error: deleteError}] =useMutation<DeleteUserMutation,DeleteUserMutationVariables>(deleteUser)

    useEffect(() => {
      if(user){
        setValue('name',user.name);
        setValue('username',user.username);
        setValue('bio',user.bio);
        setValue('website',user.website);
        console.log('---- EditProfileScreen--useEffect-- user is: ',JSON.stringify(user, null, 2));
      //  console.log('dentro del useEffect, -user- vale:',user)
      }
    }, [user,setValue])
    

    const onSubmit =async (formData:IEditableUSer)=>{
        const input={id:userId,...formData,_version:user?._version}

        if (selectedPhoto?.uri){
            input.image= await uploadMedia(selectedPhoto.uri)

        }
        await doUpdateUser({variables:{input}})
        if(navigation.canGoBack()) {navigation.goBack()}
    // console.warn('submit de edit user',data)
    }

    const uploadMedia=async(uri:string)=>{
        try {
            //get the blob of the file from uri
            const response=await fetch(uri)
            const blob=await response.blob()
            const uriParts=uri.split('.')
            const extension=uriParts[uriParts.length-1]
    
            //upload the file (blob) to S3
            const s3Response = await Storage.put(`${uuidv4()}.${extension}`,blob)
            return s3Response.key
        }
        catch (e){
            Alert.alert('Error uploading the file')
        }
       }

    const confirmDelete=()=>{
        Alert.alert('Are you sure?','Deleting your user profile is permanent',[
            {
                text:'Cancel',
                style:'cancel',
            },
            {
                text:'Yes,delete',
                style:'destructive',
                onPress:startDeleting,
            },
        ])
    }
    const startDeleting=async ()=>{
        if (!user) {return}
   //firstly we have to delete from Cognito. On the contrary there is a token not valid and it is not deleted from cognito
   authUser?.deleteUser(err=>{
    if (err) {console.log(err)
        Alert.alert('COGNITO:: USER NOT DELETED. ERROR')
    }
    })
        //delete from  DB
        await doDelete({
            variables:{input:{id:userId, _version:user?._version}}
        })
     
        Auth.signOut()
    }

    const onChangePhoto=()=>{
        launchImageLibrary({mediaType:'photo'},({didCancel,errorCode,assets})=>{
            if (!didCancel && !errorCode && assets && assets.length>0){
                setSelectedPhoto(assets[0])        
                }
        });
    }

    const validateUsername=async(username:string)=>{
        try{
            const response= await getUsersByUsername({variables:{username}})
            if (response.error){
                Alert.alert('Failed to search username')
                return 'Failed to search username'
            }
            const users=response.data?.usersByUsername?.items
            if (users && users.length > 0 && users?.[0]?.id!==userId){
              //  Alert.alert('Username is already taken')
                return 'Username is already taken'
            }

        }catch(e){
            Alert.alert('Failed to search username')
        }
        return true;
    }

    if (loading) { return <ActivityIndicator />}
    if (error || updateError || deleteError) { return <ApiErrorMessage title='Error fetching or updating the user' message={error?.message || updateError?.message || deleteError?.message|| "User not found"}/>}
    
  return (
    <View style={styles.page}>
        <Image source={{uri:selectedPhoto?.uri || user?.image || DEFAULT_USER_IMAGE}} style={styles.avatar}/>
      <Text onPress={onChangePhoto} style={styles.textButton}>Change profile photo</Text>
      <CustomInput label="Name" name="name" control={control} rules={{required:"The Name is required"}}/>      
      <CustomInput label="Username" name="username" control={control} 
      rules={{required:"The Username is required", minLength:{value:3,message:"Must be more than 3 characters"},validate:validateUsername}}/>
      <CustomInput label="Website" name="website" control={control} rules={{required:"The Website is required",
    pattern:{value: URL_REGEX,message:"The email is invalid"}}}/>
      <CustomInput label="Bio" name="bio" control={control} multiline 
      rules={{maxLength:{value:200,message:"Bio must be more less than 200 characters"}}}/>
      <Text onPress={handleSubmit(onSubmit)} style={styles.textButton}>{updateLoading ? "Submitting...": "Submit"}</Text>
      <Text onPress={confirmDelete} style={styles.textButtonDanger}>{deleteLoading ? "Deleting...": "DELETE USER"}</Text>

    </View>
  )
}


export default EditProfileScreen