import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/AntDesign';

const LogIn = ({ navigation }) => {

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic
        navigation.navigate('VerifyOTP')
    };

    const handleCreateAccount = () => {
        navigation.navigate('register')
    }
    const handleForgotPassword = () => {
        navigation.navigate('forgotPassword')
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
                        <Icon name="phone" style={{ marginRight: 5 }} size={20} color="#666" />
                        <TextInput
                            style={{ flex: 1, paddingVertical: 0 }}
                            placeholder="Phone No."
                            value={phone}
                            keyboardType="numeric"
                            maxLength={10}
                            onChangeText={(text) => setPhone(text)}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        borderBottomColor: Colors.primary,
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 25
                    }}>
                        <Icon name="lock" style={{ marginRight: 5 }} size={20} color="#666" />
                        <TextInput
                            style={{ flex: 1, paddingVertical: 0 }}
                            placeholder="Enter Your Password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={handleForgotPassword}>
                            <Text style={{marginTop: 5, color: '#1c8adb', fontSize: 16, marginBottom: 20}}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{flex: 1, backgroundColor: Colors.primary, padding: 15, borderRadius: 10, marginBottom: 20, }} onPress={handleLogin}>
                        <Text style={{ textAlign: 'center',  fontSize: 16, color: '#fff', }}>Login</Text>
                    </TouchableOpacity>

                    <View style={{alignItems: 'center', marginBottom: 20}}>
                        <TouchableOpacity onPress={handleCreateAccount}>
                            <Text style={{ marginTop: 5, color: '#1c8adb', fontSize: 16}}>Create Account</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default LogIn;