import {RouteProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

export type RootNavigatorParamList={
    Home:undefined;
    Comments:{postId:string};
    Auth:undefined;
    EditProfile:undefined;
  }


export type BottomTabNavigatorParamList={
    HomeStack:undefined;
    Search:undefined;
    Upload:undefined;
    Notifications:undefined;
    MyProfile:undefined;
  }
  export type SearchTabNavigatorParamList={
    Users:undefined;
    Posts:undefined;
  }

  export type UploadStackNavigatorParamList={
    Camera:undefined;
    Create:{
      image?:string;
      images?:string[];
      video?:string;
    };
  }
  export type CameraNavigationProp=NativeStackNavigationProp<UploadStackNavigatorParamList,'Camera'>
  export type CreateNavigationProp=NativeStackNavigationProp<UploadStackNavigatorParamList,'Create'>
  export type CreateRouteProp=RouteProp<UploadStackNavigatorParamList,'Create'>
  export type CommentsRouteProp=RouteProp<RootNavigatorParamList,'Comments'>


  export type MyProfileRouteProp=RouteProp<BottomTabNavigatorParamList,'MyProfile'>
  export type MyProfileNavigationProp=BottomTabNavigationProp<BottomTabNavigatorParamList,'MyProfile'>



  export type HomeStackNavigatorParamList={
    Feed:undefined;
    UserProfile:{userId:string};
    UpdatePost:{id:string};
    PostLikes:{id:string}; //id of a Post
  }
  export type UserProfileNavigatorParamList=NativeStackNavigationProp<HomeStackNavigatorParamList,'UserProfile'>
  export type UserProfileRouteProp=RouteProp<HomeStackNavigatorParamList,'UserProfile'>
  export type UpdatePostRouteProp=RouteProp<HomeStackNavigatorParamList,'UpdatePost'>
  export type PostLikesRouteProp=RouteProp<HomeStackNavigatorParamList,'PostLikes'>

 
 
  

  
  // inside <> is its parent and the route:
  // lo usamos en los 'navigation.navigate'
  export type FeedNavigationProp=NativeStackNavigationProp<HomeStackNavigatorParamList,'Feed'>
  export type ProfileStackNavigatorParamList={
    Profile:undefined;
    EditProfile:undefined;
  }
  export type UserProfileNavigationProp=NativeStackNavigationProp<ProfileStackNavigatorParamList,'Profile'>
// Auth Stack Navigator
export type AuthStackNavigatorParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Confirmemail: {email?: string};
  Forgotpassword: undefined;
  Newpassword: undefined;
};

export type SignInNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  "SignIn"
>;

export type SignUpNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  "SignUp"
>;

export type ConfirmEmailNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  "Confirmemail"
>;
export type ConfirmEmailRouteProp = RouteProp<
  AuthStackNavigatorParamList,
  "Confirmemail"
>;

export type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  "Forgotpassword"
>;

export type NewPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  "Newpassword"
>;
