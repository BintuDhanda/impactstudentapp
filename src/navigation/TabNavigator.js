import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/home';
import StudentTokenScreen from '../screens/token/studentTokenScreen';
import AddressScreen from '../screens/address/studentAddressScreen';
import StudentQualificationScreen from '../screens/qualification/studentQualificationScreen';
import StudentBatchScreen from '../screens/studentBatch/studentBatchScreen';
import ProfileScreen from '../screens/profileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView, View} from 'react-native'; // Import ScrollView
import NoficationsScreen from '../screens/notfications/notificationsScreen';
import {getGreeting} from '../helpers';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'white', paddingBottom: '17%'}}
      screenOptions={{
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          paddingBottom: 10,
          backgroundColor: Colors.background,
          borderTopWidth: 1,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          borderTopColor: 'lightgray',
          height: '9%',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: `Hi, ${getGreeting()} !`,
          headerTitleStyle: {color: Colors.primary},
          tabBarLabel: 'Home',
          tabBarLabelStyle: {fontSize: 15},
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={Colors.primary} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Tokens"
        component={StudentTokenScreen}
        options={{
          tabBarLabel: 'Tokens',
          tabBarLabelStyle: {fontSize: 15},
          tabBarIcon: ({color, size}) => (
            <Icon name="certificate" color={Colors.primary} size={25} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Addresses"
        component={AddressScreen}
        options={{
          tabBarLabel: 'Addresses',
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ color, size }) => (
            <Icon name="map-marker" color={Colors.primary} size={25} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Qualifications"
        component={StudentQualificationScreen}
        options={{
          tabBarLabel: 'Qualifications',
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ color, size }) => (
            <Icon name="graduation-cap" color={Colors.primary} size={25} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Batches"
        component={StudentBatchScreen}
        options={{
          tabBarLabel: 'Batches',
          tabBarLabelStyle: {fontSize: 15},
          tabBarIcon: ({color, size}) => (
            <Icon name="users" color={Colors.primary} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Nofications"
        component={NoficationsScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarLabelStyle: {fontSize: 15},
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" color={Colors.primary} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {fontSize: 15},
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={Colors.primary} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
