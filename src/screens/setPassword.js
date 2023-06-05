import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState } from 'react';

const SetPassword = ({ navigation }) => {
    const [password, setPassword] = useState({ "Password": "", "ConfirmPassword": "" });
    const handleLogin = () => {
        // Handle login logic
        navigation.navigate('login')
    };
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
                        placeholder="Password"
                        value={password.Password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={password.ConfirmPassword}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.logInBtnText}>Create Account</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleLogin}>
                            <Text style={styles.forgotPasswordText}>Log In</Text>
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

export default SetPassword;