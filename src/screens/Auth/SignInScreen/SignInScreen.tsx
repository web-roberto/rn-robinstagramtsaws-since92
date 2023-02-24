import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {SignInNavigationProp} from '../../../types/navigation';
import {Auth} from  'aws-amplify'
import { useState } from 'react';
//import {useAuthContext} from '../../../contexts/AuthContext'

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type SignInData = {
  email: string;
  password: string;
};

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation<SignInNavigationProp>();
  const [loading, setLoading] = useState(false)
 // const {setUser}=useAuthContext()

  const {control, handleSubmit,reset } = useForm<SignInData>();

  const onSignInPressed = async ({email,password}: SignInData) => {
    if (loading) return; //la  2ª llamada, la 3ª...
    setLoading(true)
    try{
      //const cognitoUser = await Auth.signIn(email,password)
      await Auth.signIn(email,password)
     // setUser(cognitoUser) pq se hace en checkUser que se ejecuta en el evento 'signIn'

      // Save user datain context
      // console.log(response);
    } catch(e){
      // si el error es que el usuario no está confirmado, puede ser porque
      // se ha cerrado la app despues de registrar y antes de enviar el codigo 
      // enviado al email.
      if ((e as Error).name==='UserNotConfirmedException') {
        navigation.navigate("Confirmemail",{email});
      }
      else{Alert.alert("Oopps",(e as Error).message)}
      }
    finally{setLoading(false); reset() //limpia los campos tras el submit
    }


    // validate user
    // navigation.navigate('Home');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("Forgotpassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <FormInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{required: 'Email is required',
          pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},

        }}
        />

        <FormInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        <CustomButton text={loading?"Loading....":"Sign In"} onPress={handleSubmit(onSignInPressed)} />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 80,
  },
});

export default SignInScreen;
