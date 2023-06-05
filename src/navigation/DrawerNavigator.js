
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './DrawerContent';
import HomeScreen from '../screens/home';
import StudentFormScreen from '../screens/studentFormScreen';
import ProfileScreen from '../screens/profileScreen';
import QualificationScreen from '../screens/qualificationScreen';
import AddressScreen from '../screens/addressScreen';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
   
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
        <Drawer.Screen name="StudentFormScreen" component={StudentFormScreen} />
        <Drawer.Screen name="QualificationScreen" component={QualificationScreen} />
        <Drawer.Screen name="AddressScreen" component={AddressScreen} />
      </Drawer.Navigator>
  );
};

export default DrawerNavigator;