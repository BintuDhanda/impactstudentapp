import { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { sendOTP } from '../constants/smsService';

const Register = ({ navigation }) => {
    const [users, setUsers] = useState({ "UsersId": 0, "UserMobile": "", "UserPassword": "", "IsActive": true });
    const handleLogin = () => {
        navigation.navigate('login')
    }
    const handleSendOtp = () => {
        let otp = Math.floor(1000 + Math.random() * 9000);
        console.log(otp, "Otp")
        sendOTP(otp, users.UserMobile).then((res) => {
            console.log(res.data, "Response otp")
            if (res.status == 200) {
                navigation.navigate("registerVerifyOtp", { mobile: users.UserMobile, password: users.UserPassword, verifyOtp: otp })
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
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.background }}>
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
                            value={users.UserMobile}
                            keyboardType="numeric"
                            maxLength={10}
                            onChangeText={(text) => setUsers({ ...users, UserMobile: text })}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.primary, paddingBottom: 8, marginBottom: 25 }}>
                        <Icon name="lock" size={25} style={{ marginRight: 8, marginLeft: 8, textAlignVertical: 'center' }} />
                        <TextInput
                            style={{
                                flex: 1,
                            }}
                            placeholder="Password"
                            value={users.UserPassword}
                            onChangeText={(text) => setUsers({ ...users, UserPassword: text })}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: Colors.primary, padding: 15, borderRadius: 10, marginBottom: 20, }} onPress={handleSendOtp}>
                        <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff', }}>Send OTP</Text>
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity onPress={handleLogin}>
                            <Text style={{ marginTop: 5, color: '#1c8adb', fontSize: 16 }}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </SafeAreaView>
        </ScrollView>
    );
}
export default Register;