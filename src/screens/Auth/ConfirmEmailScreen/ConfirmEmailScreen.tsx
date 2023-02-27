import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView,Alert} from 'react-native';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {
  ConfirmEmailNavigationProp,
  ConfirmEmailRouteProp,
} from '../../../types/navigation';
import {useRoute} from '@react-navigation/native';
import {Auth} from  'aws-amplify'

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type ConfirmEmailData = {
  email: string;
  code: string;
};

const ConfirmEmailScreen = () => {
  const route = useRoute<ConfirmEmailRouteProp>();
  const {control, handleSubmit,watch} = useForm<ConfirmEmailData>({
    defaultValues: {email: route.params.email},
  });

  const navigation = useNavigation<ConfirmEmailNavigationProp>();
  const email=watch("email") //hace una copia de username del formulario
  const [loading, setLoading] = useState(false)


  const onConfirmPressed = async({email, code}: ConfirmEmailData) => {
    if (loading) return; //la  2ª llamada, la 3ª...
    setLoading(true)
    try{
      console.warn('----------onConfirmPressed----email:---',email);
      console.warn('----------onConfirmPressed----code:---',code);
      const response = await Auth.confirmSignUp(email,code)
      console.warn('----------onConfirmPressed---tras---confirmSignUp---',JSON.stringify(response, null, 2));

      // Save user datain context
      navigation.navigate("SignIn");
      //console.log(response);
    } catch(e){Alert.alert("Oopps",(e as Error).message)}
    finally{setLoading(false)}

  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onResendPress = async () => {
    if (loading) return; //la  2ª llamada, la 3ª...
    setLoading(true)
    try{
      const response = await Auth.resendSignUp(email) //usamos la copia de 'username'
      // Save user datain context
      navigation.navigate("SignIn");
      //console.log(response);
    } catch(e){Alert.alert("Oopps",(e as Error).message)}
    finally{setLoading(false)}


    console.warn('onResendPress');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <FormInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />

        <FormInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />

        <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

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

export default ConfirmEmailScreen;
