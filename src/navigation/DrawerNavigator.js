
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profileScreen';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (

    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;