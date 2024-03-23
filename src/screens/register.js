import {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import {sendOTP} from '../constants/smsService';
import {Post as httpPost} from '../constants/httpService';
import {PrimaryButton} from '../components/buttons';

const Register = ({navigation}) => {
  const [users, setUsers] = useState({
    UsersId: 0,
    UserMobile: '',
    UserPassword: '',
    IsActive: true,
  });
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    navigation.navigate('login');
  };
  const handleSendOtp = () => {
    setLoading(true);
    httpPost('User/IsExists', {Mobile: users.UserMobile})
      .then(res => {
        console.log('User Is Exists ApI response', res.data);
        if (res.data === true) {
          Toast.show({
            type: 'error',
            text1: `User already exists! Please log in`,
            position: 'middle',
            visibilityTime: 3000,
            autoHide: true,
          });
        } else {
          // let otp = Math.floor(1000 + Math.random() * 9000);
          let otp = 1234;
          console.log(otp, 'Otp');
          sendOTP(otp, users.UserMobile)
            .then(response => {
              console.log(response.data, 'Response otp');
              if (response.status == 200) {
                navigation.navigate('registerVerifyOtp', {
                  mobile: users.UserMobile,
                  password: users.UserPassword,
                  verifyOtp: otp,
                });
              } else {
                Toast.show({
                  type: 'error',
                  text1: `${response.data}`,
                  position: 'bottom',
                  visibilityTime: 2000,
                  autoHide: true,
                });
              }
            })
            .catch(err => {
              console.error('Send Otp Error : ', err);
              let errorMessage = 'An unknown error occurred'; // Default error message
              if (err.response) {
                // If the error is related to a response from the server
                errorMessage = err.response.data || err.response.statusText;
              } else if (err.request) {
                // If the error occurred while making the request
                errorMessage =
                  'Network error. Please check your internet connection.';
              } else {
                // For other types of errors
                errorMessage = err.message;
              }

              Toast.show({
                type: 'error',
                text1: errorMessage,
                position: 'bottom',
                visibilityTime: 2000,
                autoHide: true,
              });
            });
        }
      })
      .catch(err => {
        // Handle error in case of a failed API call to 'User/IsExists'
        console.error('User/IsExists API Error: ', err);
        // Show an appropriate error toast message
        Toast.show({
          type: 'error',
          text1: 'An error occurred. Please try again later.',
          position: 'bottom',
          visibilityTime: 2000,
          autoHide: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
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
              value={users.UserMobile}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={text => setUsers({...users, UserMobile: text})}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: Colors.primary,
              paddingBottom: 8,
              marginBottom: 25,
            }}>
            <Icon
              name="lock"
              size={25}
              style={{
                marginRight: 8,
                marginLeft: 8,
                textAlignVertical: 'center',
              }}
            />
            <TextInput
              style={{
                flex: 1,
              }}
              placeholder="Password"
              value={users.UserPassword}
              onChangeText={text => setUsers({...users, UserPassword: text})}
              secureTextEntry={true}
            />
          </View>

          <PrimaryButton
            title="Send OTP"
            onPress={handleSendOtp}
            loading={loading}
          />
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={{marginTop: 5, color: '#1c8adb', fontSize: 16}}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </SafeAreaView>
    </ScrollView>
  );
};
export default Register;
