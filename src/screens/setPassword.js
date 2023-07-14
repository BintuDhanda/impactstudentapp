import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from "../constants/Colors";

const SetPassword = ({ navigation }) => {
    const [password, setPassword] = useState({ "Password": "", "ConfirmPassword": "" });
    const handleLogin = () => {
        // Handle login logic
        navigation.navigate('login')
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
                        <Icon name="lock" style={{ marginRight: 5 }} size={20} color="#666" />
                        <TextInput
                            style={{ flex: 1, paddingVertical: 0 }}
                            placeholder="Password"
                            value={password.Password}
                            onChangeText={(text) => setPassword(text)}
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
                            placeholder="Confirm Password"
                            value={password.ConfirmPassword}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: Colors.primary, padding: 15, borderRadius: 10, marginBottom: 20, }} onPress={handleLogin}>
                        <Text style={{ textAlign: 'center', fontSize: 16, color: '#fff', }}>Create Account</Text>
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleLogin}>
                            <Text style={{ marginTop: 5, color: '#1c8adb', fontSize: 16 }}>Log In</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default SetPassword;