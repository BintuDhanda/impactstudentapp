import { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet } from 'react-native';

const Register = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const handleLogin = () => {
        navigation.navigate('login')
    }
    const handleSendOtp=()=>{
        navigation.navigate('VerifyOTP')
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View>
                    <Image source={require('../assets/impact.png')} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Welcome Back!</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone No."
                        value={phone}
                        keyboardType="numeric"
                        maxLength={10}
                        onChangeText={(text) => setPhone(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
                        <Text style={styles.logInBtnText}>Send OTP</Text>
                    </TouchableOpacity>

                    <View style={{marginTop:10}}>
                        <TouchableOpacity onPress={handleLogin}>
                            <Text style={styles.forgotPasswordText}>Log In</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView>
    );
}
export default Register;

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
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
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
    logInBtnText: {
        color: 'white',
        fontSize: 16,
        alignItems: 'center'
    },
    forgotPasswordText: {
        color: '#1c8adb',
        fontSize: 16,
    }
});