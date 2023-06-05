import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'


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
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Your Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <View>
                        <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={handleForgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.logInBtnText}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.frgtOrsignupContainer}>
                        <TouchableOpacity onPress={handleCreateAccount}>
                            <Text style={styles.forgotPasswordText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView>
    );
}


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
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: 40,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 5,
        color: 'black',
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
    frgtOrsignupContainer: {
        marginTop: 2,
        alignItems: 'center'
    },
    forgotPasswordText: {
        marginTop: 5,
        color: '#1c8adb',
        fontSize: 16
    }
});


export default LogIn;