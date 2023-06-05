import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import {useState} from 'react';

const ForgotPassword = ({navigation}) => {
    const [phone, setPhone] = useState('');
    const handleLogin = () => {
        // Handle login logic
        navigation.navigate('login')
    };
    const handleSendOtp=()=>{
        navigation.navigate('forgotVerifyOtp')
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View>
                    <Image source={require('../assets/impact.png')} />
                </View>
                <View style={styles.inputContainer}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>Welcome Back!</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone No."
                        value={phone}
                        keyboardType="numeric"
                        maxLength={10}
                        onChangeText={(text) => setPhone(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
                        <Text style={styles.sendOtpBtnText}>Send OTP</Text>
                    </TouchableOpacity>
                    <View style={styles.logInContainer}>
                        <TouchableOpacity onPress={handleLogin}>
                            <Text style={styles.logInText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        borderRadius: 0,
        borderWidth: 0,
        borderColor: 'black',
        width: '80%',
        marginBottom: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        alignItems:'center'
    },
    input: {
        width: '100%',
        height: 40,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 5,
        color: 'black',
        marginLeft: 8,
        paddingHorizontal: 20,
        marginTop: 5
    },
    button: {
        backgroundColor: '#e60000',
        width: '100%',
        borderRadius: 5,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    sendOtpBtnText: {
        color: 'white',
        fontSize: 16,
        alignItems: 'center'
    },
    logInContainer: {
        marginTop: 2,
       alignItems: 'center'
    },
    logInText: {
        marginTop: 5,
        color: '#1c8adb',
        fontSize: 16
    }
})
