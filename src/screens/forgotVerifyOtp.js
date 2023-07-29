import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { sendOTP } from '../constants/smsService';
import Colors from "../constants/Colors";

const ForgotVerifyOtp = ({ route, navigation }) => {
    const { verifyOtp, mobile } = route.params;
    const [otp, setOtp] = useState('');
    const [count, setCount] = useState(1)
    const [timer, setTimer] = useState(60);
    const [showResend, setShowResend] = useState(false);

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

    const handleLogin = () => {
        navigation.navigate('login');
    };

    const handleConfirmOtp = () => {
        if (otp == verifyOtp) {
            navigation.navigate('forgotSetPassword', { mobile: mobile })
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

export default ForgotVerifyOtp