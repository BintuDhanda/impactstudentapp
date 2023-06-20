
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import HomeScreen from '../screens/home';
import StudentFormScreen from '../screens/studentFormScreen';
import ProfileScreen from '../screens/profileScreen';
import QualificationScreen from '../screens/qualification/qualificationScreen';
import AddressScreen from '../screens/address/addressFormScreen';


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