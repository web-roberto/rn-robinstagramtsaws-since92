import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackNavigatorParamList} from '../types/navigation';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ConfirmEmailScreen from '../screens/Auth/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/Auth/NewPasswordScreen';

const Stack = createNativeStackNavigator<AuthStackNavigatorParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Confirmemail" component={ConfirmEmailScreen} />
      <Stack.Screen name="Forgotpassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Newpassword" component={NewPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
