import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView,Alert,} from 'react-native';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {NewPasswordNavigationProp} from '../../../types/navigation';
import {Auth} from  'aws-amplify'
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type NewPasswordType = {
  email: string;
  code: string;
  password: string;
};

const NewPasswordScreen = () => {
  const {control, handleSubmit} = useForm<NewPasswordType>();

  const navigation = useNavigation<NewPasswordNavigationProp>();
  const [loading, setLoading] = useState(false)


  const onSubmitPressed = async ({email,code,password}: NewPasswordType) => {

    if (loading) return; //la  2ª llamada, la 3ª...
    setLoading(true)
    try{
      const response = await Auth.forgotPasswordSubmit(email,code,password)
      navigation.navigate("SignIn");
      // Save user datain context
      //console.log(response);
    } catch(e){
     Alert.alert("Oopps",(e as Error).message)
      }
    finally{setLoading(false)}
    // console.warn(data);
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <FormInput
          placeholder="Email"
          name="email"
          control={control}
          rules={{required: 'Email is required',
          pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
      
        }}
        />

        <FormInput
          placeholder="Code"
          name="code"
          control={control}
          rules={{required: 'Code is required'}}
        />

        <FormInput
          placeholder="Enter your new password"
          name="password"
          control={control}
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default NewPasswordScreen;
