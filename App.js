import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from './src/screens/login';
import VerifyOTP from './src/screens/verifyotp'
import Register from './src/screens/register'

import DrawerNavigator from './src/navigation/DrawerNavigator';
import SetPassword from './src/screens/setPassword';
import ForgotPassword from './src/screens/forgotPassword';
import ForgotVerifyOtp from './src/screens/forgotVerifyOtp';
import ForgotSetPassword from './src/screens/forgotSetPassword';


let isLogedIn = true;

const Stack = createStackNavigator();

function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLogedIn ? (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
            <Stack.Screen name="StudentFormScreen" component={DrawerNavigator} />
          </Stack.Navigator>
        </NavigationContainer>)
        :
        (<NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={LogIn} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="setPassword" component={SetPassword} />
            <Stack.Screen name="forgotPassword" component={ForgotPassword} />
            <Stack.Screen name="forgotVerifyOtp" component={ForgotVerifyOtp} />
            <Stack.Screen name="forgotSetPassword" component={ForgotSetPassword} />
          </Stack.Navigator>
        </NavigationContainer>)
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default App;
