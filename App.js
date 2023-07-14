import React, { useEffect, useState } from 'react';
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
import LogIn from './src/screens/loginScreen';
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
import AddressFormScreen from './src/screens/address/addressFormScreen';
import AddressScreen from './src/screens/address/addressScreen';
import QualificationScreen from './src/screens/qualification/qualificationScreen';
import QualificationFormScreen from './src/screens/qualification/qualificationFormScreen';
import BatchScreen from './src/screens/studentBatch/batchScreen';
import NewsScreen from './src/screens/news/newsScreen';


let isLogedIn = true;

export const UserContext = React.createContext();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
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
          tabBarLabelStyle: { fontSize: 15 },
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
          tabBarLabelStyle: { fontSize: 15 },
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
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ color, size }) => (
            <Icon name="certificate" color={Colors.primary} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Address"
        component={AddressScreen}
        options={{
          tabBarLabel: 'Address',
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ color, size }) => (
            <Icon name="map-marker" color={Colors.primary} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Qualification"
        component={QualificationScreen}
        options={{
          tabBarLabel: 'Qualification',
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ color, size }) => (
            <Icon name="graduation-cap" color={Colors.primary} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Batch"
        component={BatchScreen}
        options={{
          tabBarLabel: 'Batch',
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ color, size }) => (
            <Icon name="users" color={Colors.primary} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const [user, setUser] = useState();
  const [isSpalsh, setIsSplash] = useState(true);

  useEffect(() => {
    getUser();
    setTimeout(() => {
      setIsSplash(false);
    }, 2000);
  }, [])

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        // We have data!!
        console.log(user);
        setUser(JSON.parse(user))
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }
  const showTab = false;
  return (
    <>
      {isSpalsh ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary }}>
        {/* <Image source={require('../assets/impact.png')} /> */}
        <Text style={{ fontSize: 60, color: Colors.background, fontWeight: 'bold' }}>IMPACT</Text>
        <Text style={{ fontSize: 60, color: Colors.background, fontWeight: 'bold' }}>ACADEMY</Text>
      </View>)
        :
        (<UserContext.Provider value={{ user, setUser }}>
          <SafeAreaView style={{ flex: 1 }}>
            {user ? (
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Main" component={MainTabNavigator} />
                  <Stack.Screen name="AddressForm" component={AddressFormScreen} />
                  <Stack.Screen name="QualificationForm" component={QualificationFormScreen} />
                </Stack.Navigator>
              </NavigationContainer>
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
          </SafeAreaView>
        </UserContext.Provider>)
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
