import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import Colors from '../constants/Colors';
import {Post as httpPost} from '../constants/httpService';

const ForgotSetPassword = ({route, navigation}) => {
  const {mobile} = route.params;
  const [password, setPassword] = useState({
    Mobile: mobile,
    Password: '',
    ConfirmPassword: '',
  });
  const handleLogin = () => {
    // Handle login logic
    navigation.navigate('login');
  };
  const handleSave = () => {
    if (password.Password === '' && password.ConfirmPassword === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Fill Password And Confirm Password',
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
      });
    } else if (password.Password !== password.ConfirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Please Password And Confirm Password Fill Same',
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
      });
    } else {
      httpPost('User/ForgotPassword', password)
        .then(res => {
          console.log('Forgot', res.data);
          if (res.data === 'true') {
            Alert.alert(
              'Save Password',
              'Password Save SuceesFully',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('login'),
                },
              ],
              {cancelable: false},
            );
          } else {
            Toast.show({
              type: 'error',
              text1: 'Something Error!',
              position: 'bottom',
              visibilityTime: 2000,
              autoHide: true,
            });
          }
        })
        .catch(err => {
          console.error('ForgotPassword error :', err);
          Toast.show({
            type: 'error',
            text1: `${err}`,
            position: 'bottom',
            visibilityTime: 2000,
            autoHide: true,
          });
        });
    }
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1}}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: Colors.background,
        }}>
        <View style={{paddingHorizontal: 25}}>
          <View style={{alignItems: 'center'}}>
            <Image source={require('../assets/impact.png')} />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 30,
                alignItems: 'center',
              }}>
              Welcome Back!
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: Colors.primary,
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}>
            <Icon
              name="lock"
              style={{
                marginRight: 8,
                marginLeft: 8,
                textAlignVertical: 'center',
              }}
              size={20}
              color="#666"
            />
            <TextInput
              style={{flex: 1, paddingVertical: 0}}
              placeholder="Password"
              value={password.Password}
              onChangeText={text => setPassword({...password, Password: text})}
              secureTextEntry={true}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: Colors.primary,
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}>
            <Icon
              name="lock"
              style={{
                marginRight: 8,
                marginLeft: 8,
                textAlignVertical: 'center',
              }}
              size={20}
              color="#666"
            />
            <TextInput
              style={{flex: 1, paddingVertical: 0}}
              placeholder="Confirm Password"
              value={password.ConfirmPassword}
              onChangeText={text =>
                setPassword({...password, ConfirmPassword: text})
              }
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: Colors.primary,
              padding: 15,
              borderRadius: 10,
              marginBottom: 20,
            }}
            onPress={handleSave}>
            <Text style={{textAlign: 'center', fontSize: 16, color: '#fff'}}>
              Save Password
            </Text>
          </TouchableOpacity>

          <View style={{alignItems: 'center', marginBottom: 20}}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={handleLogin}>
              <Text style={{marginTop: 5, color: '#1c8adb', fontSize: 16}}>
                Go Back To Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default ForgotSetPassword;
