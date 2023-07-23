import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { sendOTP } from '../constants/smsService';
import Colors from "../constants/Colors";
import Toast from 'react-native-toast-message';
import { Post as httpPost } from '../constants/httpService';

const ForgotPassword = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const handleLogin = () => {
        // Handle login logic
        navigation.navigate('login')
    };
    const handleSendOtp = () => {
        httpPost("User/IsExists", { Mobile: phone }).then((res) => {
            if (res.data == false) {
                Toast.show({
                    type: 'error',
                    text1: 'User dose not exist',
                    position: 'bottom',
                    visibilityTime: 2000,
                    autoHide: true,
                });
            }
            else {
                let otp = Math.floor(1000 + Math.random() * 9000);
                console.log(otp, "Otp")
                sendOTP(otp, phone).then((res) => {
                    console.log(res.data, "Response otp")
                    if (res.status == 200) {
                        navigation.navigate("forgotVerifyOtp", { mobile: phone, verifyOtp: otp })
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
        }).catch((err) => {
            console.error("IsExist Error : ", err)
            Toast.show({
                type: 'error',
                text1: `${err}`,
                position: 'bottom',
                visibilityTime: 2000,
                autoHide: true,
            });
        })
    }
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
                        <Icon name="mobile" style={{ marginRight: 8, marginLeft: 8, textAlignVertical: 'center' }} size={20} color="#666" />
                        <TextInput
                            style={{ flex: 1, paddingVertical: 0 }}
                            placeholder="Phone No."
                            value={phone}
                            keyboardType="numeric"
                            maxLength={10}
                            onChangeText={(text) => setPhone(text)}
                        />
                    </View>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: Colors.primary, padding: 15, borderRadius: 10, marginBottom: 20, }} onPress={handleSendOtp}>
                        <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff', }}>Send OTP</Text>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity onPress={handleLogin}>
                            <Text style={{ marginTop: 5, color: '#1c8adb', fontSize: 16 }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </SafeAreaView>
        </ScrollView>
    );
}

export default ForgotPassword;