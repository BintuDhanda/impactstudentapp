import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ProfileScreen = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        fatherName: '',
        motherName: '',
        gender: '',
        height: '',
        weight: '',
        bodyRemarks: '',
      });
      const handleInputChange = (name, value) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);
    const toggleGenderDropdown = () => {
        setShowGenderDropdown(!showGenderDropdown);
    };

    const selectGender = (selectedGender) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            gender: selectedGender,
          }));
        setShowGenderDropdown(false);
    };
    const handleFormSubmit = () => {
        // Handle form submission logic here
    };
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Text style={styles.cardTitle}>Student Form</Text>
                    <Text style={styles.label}>First Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.firstName}
                        onChangeText={(value) => handleInputChange('firstName', value)}
                        placeholder="Enter first name"
                    />

                    <Text style={styles.label}>Last Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.lastName}
                        onChangeText={(value) => {'lastName',value}}
                        placeholder="Enter last name"
                    />

                    <Text style={styles.label}>Father Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.fatherName}
                        onChangeText={(value) => {'fatherName',value}}
                        placeholder="Enter father name"
                    />

                    <Text style={styles.label}>Mother Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.motherName}
                        onChangeText={(value) => {'motherName',value}}
                        placeholder="Enter mother name"
                    />

                    <Text style={styles.label}>Gender:</Text>
                    <TouchableOpacity
                        style={styles.dropdownContainer}
                        onPress={toggleGenderDropdown}
                    >
                        <Text style={styles.dropdownText}>{formData.gender || 'Select gender'}</Text>
                        {showGenderDropdown && (
                            <View style={styles.dropdown}>
                                <TouchableOpacity
                                    style={styles.dropdownOption}
                                    onPress={() => selectGender('Male')}
                                >
                                    <Text style={styles.dropdownOptionText}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.dropdownOption}
                                    onPress={() => selectGender('Female')}
                                >
                                    <Text style={styles.dropdownOptionText}>Female</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.label}>Height:</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.height}
                        onChangeText={(value) =>{'height',value}}
                        placeholder="Enter height"
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Weight:</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.weight}
                        onChangeText={(value) =>{'weight',value}}
                        placeholder="Enter weight"
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Body Remarks:</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={formData.bodyRemarks}
                        onChangeText={(value) => {'bodyRemarks',value}}
                        placeholder="Enter body remarks"
                        multiline
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color:'black'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 10,
        fontSize: 16,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 10,
        position: 'relative',
        zIndex: 1,
    },
    dropdownText: {
        fontSize: 16,
    },
    dropdown: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
    dropdownOption: {
        paddingVertical: 8,
    },
    dropdownOptionText: {
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default ProfileScreen;