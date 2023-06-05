import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'

const ForgotVerifyOtp = ({navigation}) => {
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
        <View style={styles.container}>
            <View>
                <Image source={require('../assets/impact.png')} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Welcome Back!</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter OTP"
                    value={otp}
                    onChangeText={(text) => setOtp(text)}
                />
                {
                    showResend ?
                        (<TouchableOpacity style={styles.button} onPress={handleResendOtp}>
                            <Text style={styles.buttonText}>Resend OTP</Text>
                        </TouchableOpacity>) : (
                            <TouchableOpacity style={styles.button} onPress={handleConfirmOtp}>
                                <Text style={styles.buttonText}>Confirm OTP</Text>
                            </TouchableOpacity>
                        )
                }
                <Text>or resend in {timer} Seconds.</Text>
            </View>
            <TouchableOpacity style={styles.logIn} onPress={handleLogin}>
                <Text style={styles.logInText}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
        alignItems: 'center',
        padding: 10,
    },
    input: {
        width: '100%',
        height: 40,
        fontSize: 16,
        marginLeft: 10,
        borderWidth: 1,
        borderRadius: 5,
        color: 'black'
    },
    button: {
        backgroundColor: '#e60000',
        borderRadius: 5,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems:'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    logIn: {
        marginTop: 20,
    },
    logInText: {
        color: '#1c8adb',
        fontSize: 16,
    }
});


export default ForgotVerifyOtp