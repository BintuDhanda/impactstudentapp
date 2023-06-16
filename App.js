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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogIn from './src/screens/login';
import VerifyOTP from './src/screens/verifyotp'
import Register from './src/screens/register'

import DrawerNavigator from './src/navigation/DrawerNavigator';
import SetPassword from './src/screens/setPassword';
import ForgotPassword from './src/screens/forgotPassword';
import ForgotVerifyOtp from './src/screens/forgotVerifyOtp';
import ForgotSetPassword from './src/screens/forgotSetPassword';
import HomeScreen from './src/screens/home';
import ProfileScreen from './src/screens/profileScreen';
import Colors from './src/constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import TokenScreen from './src/screens/tokenScreen';


let isLogedIn = true;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {

  return (
    <>
      {isLogedIn ? (
        <NavigationContainer>
          <Tab.Navigator screenOptions={{
          tabBarActiveTintColor: Colors.accent,
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: Colors.background,
            borderTopWidth: 1,
            borderTopColor: 'lightgray',
          },
        }}>
          <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {fontSize: 15},
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={Colors.primary} size={30} />
            ),
          }}
        />
         <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {fontSize: 15},
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" color={Colors.primary} size={30} />
            ),
          }}
        />
         <Tab.Screen
          name="Token"
          component={TokenScreen}
          options={{
            tabBarLabel: 'Token',
            tabBarLabelStyle: {fontSize: 15},
            tabBarIcon: ({ color, size }) => (
              <Icon name="certificate" color={Colors.primary} size={30} />
            ),
          }}
        />
            {/* <Tab.Screen name='Profile' component={ProfileScreen} /> */}
          </Tab.Navigator>
        </NavigationContainer>

        // <NavigationContainer>
        //   <Stack.Navigator screenOptions={{ headerShown: false }}>
        //     <Stack.Screen name="Home" component={DrawerNavigator} />          
        //   </Stack.Navigator>
        // </NavigationContainer>
        )
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
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
