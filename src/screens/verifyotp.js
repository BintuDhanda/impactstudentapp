import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Post as httpPost, Get as httpGet } from '../constants/httpService';
import Toast from 'react-native-toast-message';
import { sendOTP } from '../constants/smsService';
import Colors from "../constants/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../App';
import { useContext } from 'react';

const VerifyOTP = ({ navigation, route }) => {
    const { verifyOtp, mobile, password } = route.params;
    const [otp, setOtp] = useState('');
    const [count, setCount] = useState(1)
    const [timer, setTimer] = useState(60);
    const [showResend, setShowResend] = useState(false);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setShowResend(true);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const handleOtpChange = (value) => {
        setOtp(value);
    };

    const handleConfirmOtp = () => {
        console.log(otp, verifyOtp)
        if (otp == verifyOtp) {
            // get user token api call
            console.log("Is Mobile Confirmed", mobile)
            httpGet("User/IsMobileConfirmed?userMobile="+mobile).then((response) => {
                console.log("Is Mobile Confirmed Response",response.data)
                if (response.data == true) {
                    httpPost("User/userlogin", { userMobile: mobile, userPassword: password }).then((response) => {
                        console.log(response.data, "Response")
                        if (response.data === 0 || response.data.userId===0) {
                            Toast.show({
                                type: 'error',
                                text1: "Invalid Password or Phone No. Try Again!",
                                position: 'bottom',
                                visibilityTime: 2000,
                                autoHide: true,
                            });
                        }                      
                        else {
                            AsyncStorage.setItem('user', JSON.stringify(response.data));
                            setUser(response.data);
                        }
                    }).catch((err) => {
                        console.error("UserLogin error :", err)
                        Toast.show({
                            type: 'error',
                            text1: `${err}`,
                            position: 'bottom',
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                    })
                }
            }).catch((err) => {
                console.error("IsMobileConfirmed Error:", err)
                Toast.show({
                    type: 'error',
                    text1: `${err}`,
                    position: 'bottom',
                    visibilityTime: 2000,
                    autoHide: true,
                });
            })
        }
        else {
            Toast.show({
                type: 'error',
                text1: "Invalid Otp!",
                position: 'bottom',
                visibilityTime: 2000,
                autoHide: true,
            });
        }
    };

    const handleResendOtp = () => {
        setCount(count + 1)
        console.log(count, "Count")
        if (count >= 3) {
            Toast.show({
                type: 'error',
                text1: 'No Send More Otp You Reached Limit already',
                position: 'bottom',
                visibilityTime: 2000,
                autoHide: true,
            });
        }
        else {
            sendOTP(verifyOtp, mobile).then((res) => {
                console.log(res.data, "Response otp")
                if (res.status == 200) {
                    setTimer(60);
                    setShowResend(false);
                }
            }
            ).catch((err) => {
                console.error("Send Otp Error : ", err)
                Toast.show({
                    type: 'error',
                    text1: `${err}`,
                    position: 'bottom',
                    visibilityTime: 2000,
                    autoHide: true,
                });
            })
        }
    };
    const handleLogin = () => {
        navigation.navigate('login');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: Colors.background }}>
                <View style={{ paddingHorizontal: 25 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../assets/impact.png')} />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            marginBottom: 30,
                            alignItems: 'center'
                        }}>Welcome Back!</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        borderBottomColor: Colors.primary,
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 25
                    }}>
                        <Icon name="key" style={{ marginRight: 8, marginLeft: 8, textAlignVertical: 'center' }} size={20} color="#666" />
                        <TextInput
                            style={{ flex: 1, paddingVertical: 0 }}
                            placeholder="Enter OTP"
                            value={otp}
                            keyboardType='numeric'
                            onChangeText={(text) => setOtp(text)}
                        />
                    </View>
                    {
                        showResend ?
                            (<TouchableOpacity style={{ flex: 1, backgroundColor: Colors.primary, padding: 15, borderRadius: 10, marginBottom: 20, }} onPress={handleResendOtp}>
                                <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff', }}>Resend OTP</Text>
                            </TouchableOpacity>) : (
                                <TouchableOpacity style={{ flex: 1, backgroundColor: Colors.primary, padding: 15, borderRadius: 10, marginBottom: 20, }} onPress={handleConfirmOtp}>
                                    <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff', }}>Confirm OTP</Text>
                                </TouchableOpacity>
                            )
                    }
                    <Text style={{ alignSelf: 'center' }}>or resend in {timer} Seconds.</Text>
                    <TouchableOpacity style={{ alignItems: 'center', marginBottom: 20 }} onPress={handleLogin}>
                        <Text style={{ marginTop: 5, color: '#1c8adb', fontSize: 16 }}>Log In</Text>
                    </TouchableOpacity>
                </View>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </SafeAreaView>
        </ScrollView>
    );
}

export default VerifyOTP;