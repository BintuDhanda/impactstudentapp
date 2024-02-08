import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Colors from '../constants/Colors';
import Toast from 'react-native-toast-message';
import {Post as httpPost, Get as httpGet} from '../constants/httpService';
import {sendOTP} from '../constants/smsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../App';
import {useContext} from 'react';

const LogIn = ({navigation}) => {
  const {user, setUser} = useContext(UserContext);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic
    httpPost(`User/IsExists`, {Mobile: phone})
      .then(res => {
        if (res.data == false) {
          Toast.show({
            type: 'error',
            text1: 'User dose not exist',
            position: 'bottom',
            visibilityTime: 2000,
            autoHide: true,
          });
        } else {
          //send otp
          //navigatin with otp
          httpGet(`User/IsVerified?userMobile=${phone}`)
            .then(response => {
              if (response.data == false) {
                Toast.show({
                  type: 'error',
                  text1: 'Mobile is not Verified',
                  position: 'bottom',
                  visibilityTime: 2000,
                  autoHide: true,
                });
                // let otp = Math.floor(1000 + Math.random() * 9000);
                let otp = 1234;
                console.log(otp, 'Otp');
                sendOTP(otp, phone)
                  .then(res => {
                    console.log(res.data, 'Response otp');
                    if (res.status == 200) {
                      setPhone('');
                      setPassword('');
                      navigation.navigate('VerifyOTP', {
                        mobile: phone,
                        password: password,
                        verifyOtp: otp,
                      });
                    }
                  })
                  .catch(err => {
                    console.error('Send Otp Error : ', err);
                    Toast.show({
                      type: 'error',
                      text1: `${err}`,
                      position: 'bottom',
                      visibilityTime: 2000,
                      autoHide: true,
                    });
                  });
              } else {
                httpPost('User/userlogin', {
                  userMobile: phone,
                  userPassword: password,
                })
                  .then(response => {
                    console.log(response.data, 'Response');
                    if (response.data.userId === 0) {
                      Toast.show({
                        type: 'error',
                        text1: 'Invalid Password or Phone No. Try Again!',
                        position: 'bottom',
                        visibilityTime: 2000,
                        autoHide: true,
                      });
                    } else {
                      AsyncStorage.setItem(
                        'user',
                        JSON.stringify(response.data),
                      );
                      setUser(response.data);
                    }
                  })
                  .catch(err => {
                    console.error('UserLogin error :', err);
                    Toast.show({
                      type: 'error',
                      text1: `${err}`,
                      position: 'bottom',
                      visibilityTime: 2000,
                      autoHide: true,
                    });
                  });
              }
            })
            .catch(err => {
              console.error('IsVerified Error :', err);
              Toast.show({
                type: 'error',
                text1: `${err}`,
                position: 'bottom',
                visibilityTime: 2000,
                autoHide: true,
              });
            });
        }
      })
      .catch(err => {
        console.error('IsExist Error : ', err);
        Toast.show({
          type: 'error',
          text1: `${err}`,
          position: 'bottom',
          visibilityTime: 2000,
          autoHide: true,
        });
      });
    // navigation.navigate('VerifyOTP')
  };

  const handleCreateAccount = () => {
    navigation.navigate('register');
  };
  const handleForgotPassword = () => {
    navigation.navigate('forgotPassword');
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.background}}>
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
              name="mobile"
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
              placeholder="Phone No."
              value={phone}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={text => setPhone(text)}
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
              placeholder="Enter Your Password"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{alignItems: 'flex-end'}}
              onPress={handleForgotPassword}>
              <Text
                style={{
                  marginTop: 5,
                  color: '#1c8adb',
                  fontSize: 16,
                  marginBottom: 20,
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: Colors.primary,
              padding: 15,
              borderRadius: 10,
              marginBottom: 20,
            }}
            onPress={handleLogin}>
            <Text style={{textAlign: 'center', fontSize: 16, color: '#fff'}}>
              Login
            </Text>
          </TouchableOpacity>

          <View style={{alignItems: 'center', marginBottom: 20}}>
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={{marginTop: 5, color: '#1c8adb', fontSize: 16}}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default LogIn;
