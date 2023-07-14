import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from "../constants/Colors";

const ForgotVerifyOtp = ({ navigation }) => {
    const [otp, setOtp] = useState('');
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

    const handleLogin = (value) => {
        navigation.navigate('login');
    };

    const handleConfirmOtp = () => {
        navigation.navigate('forgotSetPassword')
    };

    const handleResendOtp = () => {
        setTimer(60);
        setShowResend(false);
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
                        <Icon name="key" style={{ marginRight: 5 }} size={20} color="#666" />
                        <TextInput
                            style={{ flex: 1, paddingVertical: 0 }}
                            placeholder="Enter OTP"
                            value={otp}
                            onChangeText={(text) => setOtp(text)}
                        />
                    </View>
                    {
                        showResend ?
                            (<TouchableOpacity style={{flex: 1, backgroundColor: Colors.primary, padding: 15, borderRadius: 10, marginBottom: 20, }} onPress={handleResendOtp}>
                                <Text style={{ textAlign: 'center',  fontSize: 16, color: '#fff', }}>Resend OTP</Text>
                            </TouchableOpacity>) : (
                                <TouchableOpacity style={{flex: 1, backgroundColor: Colors.primary, padding: 15, borderRadius: 10, marginBottom: 20, }} onPress={handleConfirmOtp}>
                                    <Text style={{ textAlign: 'center',  fontSize: 16, color: '#fff', }}>Confirm OTP</Text>
                                </TouchableOpacity>
                            )
                    }
                    <Text style={{alignSelf: 'center'}}>or resend in {timer} Seconds.</Text>
                    <TouchableOpacity style={{alignItems: 'center', marginBottom: 20}} onPress={handleLogin}>
                        <Text style={{ marginTop: 5, color: '#1c8adb', fontSize: 16}}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default ForgotVerifyOtp