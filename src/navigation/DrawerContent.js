import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <StatusBar backgroundColor="green" />
      <View style={{ flex: 1, width: '100%' }}>
        <View style={{ flex: 0.2, paddingTop: 10, paddingHorizontal: 25, backgroundColor: '#FF0D0D', justifyContent: 'center' }}>
          <Image
            source={require('../icons/user.png')}
            style={{ height: 80, width: 80 }}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Guest, Welcome !</Text>
        </View>
        <View style={{ flex: 0.5 }}>
          <View style={styles.container}>

            <View style={styles.drawerItem}>
              <Icon name="rocket" size={20} color="#900" />
              <TouchableOpacity onPress={() => props.navigation.navigate('HomeScreen')}>
                <Text style={styles.title}>Home</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.drawerItem}>
              <Icon name="rocket" size={20} color="#900" />
              <TouchableOpacity onPress={() => props.navigation.navigate('ProfileScreen')}>
                <Text style={styles.title}>Profile</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.drawerItem}>
              <Icon name="rocket" size={20} color="#900" />
              <TouchableOpacity onPress={() => props.navigation.navigate('StudentFormScreen')}>
                <Text style={styles.title}>Student</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.drawerItem}>
              <Icon name="rocket" size={20} color="#900" />
              <TouchableOpacity onPress={() => props.navigation.navigate('QualificationScreen')}>
                <Text style={styles.title}>Qualification</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.drawerItem}>
              <Icon name="rocket" size={20} color="#900" />
              <TouchableOpacity onPress={() => props.navigation.navigate('AddressScreen')}>
                <Text style={styles.title}>Address</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.drawerItem}>
              <Icon name="rocket" size={20} color="#900" />
              <TouchableOpacity onPress={() => navigateToScreen('Home')}>
                <Text style={styles.title}>Coures</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>
        <View style={{ flex: 0.3, backgroundColor: '#ECC73D' }}>
          <View style={styles.container}>

            <View style={styles.drawerItem}>
              <Icon name="phone" size={20} color="#900" />
              <TouchableOpacity onPress={() => navigateToScreen('Home')}>
                <Text style={styles.title}>FAQ</Text>
              </TouchableOpacity>
            </View>


            <View style={styles.drawerItem}>
              <Icon name="rocket" size={20} color="#900" />
              <TouchableOpacity onPress={() => navigateToScreen('Home')}>
                <Text style={styles.title}>Privary</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </DrawerContentScrollView >
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  drawerItem: {
    padding: 20,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 15,
    marginLeft: 10
  }
});


export default DrawerContent;
