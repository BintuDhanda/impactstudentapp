import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import axios from 'axios';

const ProfileScreen = ({ route, navigation }) => {

    // const { userId, studentId } = route.params;
    const studentId = 2;
    const userId = 1;
    console.log(studentId == undefined ? 0 : studentId, "studentId")
    const [formData, setFormData] = useState({
        "Id": studentId == undefined ? 0 : studentId,
        "FirstName": "",
        "LastName": "",
        "FatherName": "",
        "MotherName": "",
        "Gender": "",
        "StudentHeight": "",
        "StudentWeight": "",
        "BodyRemark": "",
        "UserId": userId,
        "IsActive": true,
    });

    console.log(formData, "Formdata")
    useEffect(() => {
        if (formData.Id !== 0) {
            handleEditStudentDetails();
        }
    }, [])

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
            Gender: selectedGender,
        }));
        setShowGenderDropdown(false);
    };

    const handleEditStudentDetails = () => {
        axios.get(`http://192.168.1.7:5291/api/StudentDetails/getById?Id=${studentId}`)
            .then((result) => {
                console.log(result.data, "studentDetailsById");
                setFormData(
                    {
                        Id: result.data.id,
                        FirstName: result.data.firstName,
                        LastName: result.data.lastName,
                        FatherName: result.data.fatherName,
                        MotherName: result.data.motherName,
                        Gender: result.data.gender,
                        StudentHeight: result.data.studentHeight,
                        StudentWeight: result.data.studentWeight,
                        BodyRemark: result.data.bodyRemark,
                        UserId: result.data.userId,
                        IsActive: result.data.isActive
                    }
                );
            })
            .catch(err => console.error("Get By Id Error", err));
    };

    const handleSaveStudentDetails = async () => {
        try {
            if (formData.Id !== 0) {
                console.log(JSON.stringify(formData), "Form data request")
                await axios.put(`http://192.168.1.7:5291/api/StudentDetails/put`, JSON.stringify(formData), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            Alert.alert('Success', 'Update Student Successfully')
                            // setFormData({
                            //     "Id": studentId == undefined ? 0 : studentId,
                            //     "FirstName": "",
                            //     "LastName": "",
                            //     "FatherName": "",
                            //     "MotherName": "",
                            //     "Gender": "",
                            //     "StudentHeight": "",
                            //     "StudentWeight": "",
                            //     "BodyRemark": "",
                            //     "UserId": userId,
                            //     "IsActive": true,
                            // })
                            navigation.goBack();
                        }
                    })
                    .catch(err => console.error("Student Details update error : ", err));
            }
            else {
                await axios.post(`http://192.168.1.7:5291/api/StudentDetails/post`, JSON.stringify(formData), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            Alert.alert('Success', 'Add Student Details Successfully')
                            // setUser({
                            //     "Id": 0,
                            //     "FirstName": "",
                            //     "LastName": "",
                            //     "FatherName": "",
                            //     "MotherName": "",
                            //     "Gender": "",
                            //     "StudentHeight": "",
                            //     "StudentWeight": "",
                            //     "BodyRemark": "",
                            //     "UserId": userId,
                            //     "IsActive": true,
                            // })
                            navigation.navigate('Home')
                        }
                    })
                    .catch(err => console.error('Student Details Add error :', err));
            }
        }
        catch (error) {
            console.error('Error saving Student Detail:', error);
        }
    }

    const handleCancel = () => {
        navigation.goBack();
    }
    return (
        <View style={{ flex: 1, padding: 10, }}>
            <View style={{
                backgroundColor: Colors.background,
                borderRadius: 8,
                padding: 16,
                shadowColor: Colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
            }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, }}>Student Form</Text>
                    <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>First Name:</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: Colors.primary,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            marginBottom: 10,
                            fontSize: 16,
                        }}
                        value={formData.FirstName}
                        onChangeText={(value) => handleInputChange('FirstName', value)}
                        placeholder="Enter first name"
                    />

                    <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>Last Name:</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: Colors.primary,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            marginBottom: 10,
                            fontSize: 16,
                        }}
                        value={formData.LastName}
                        onChangeText={(value) => handleInputChange('LastName', value)}
                        placeholder="Enter last name"
                    />

                    <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>Father Name:</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: Colors.primary,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            marginBottom: 10,
                            fontSize: 16,
                        }}
                        value={formData.FatherName}
                        onChangeText={(value) => handleInputChange('FatherName', value)}
                        placeholder="Enter father name"
                    />

                    <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>Mother Name:</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: Colors.primary,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            marginBottom: 10,
                            fontSize: 16,
                        }}
                        value={formData.MotherName}
                        onChangeText={(value) => handleInputChange('MotherName', value)}
                        placeholder="Enter mother name"
                    />

                    <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>Gender:</Text>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: Colors.primary,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            marginBottom: 10,
                            position: 'relative',
                            zIndex: 1,
                        }}
                        onPress={toggleGenderDropdown}
                    >
                        <Text style={{ fontSize: 16, }}>{formData.Gender || 'Select gender'}</Text>
                        {showGenderDropdown && (
                            <View style={{
                                position: 'absolute',
                                top: 40,
                                left: 0,
                                right: 0,
                                borderWidth: 1,
                                borderColor: Colors.primary,
                                backgroundColor: Colors.background,
                                borderRadius: 5,
                                padding: 10,
                                marginTop: 5,
                            }}>
                                <TouchableOpacity
                                    style={{ paddingVertical: 8, }}
                                    onPress={() => selectGender('Male')}
                                >
                                    <Text style={{ fontSize: 16, }}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ paddingVertical: 8, }}
                                    onPress={() => selectGender('Female')}
                                >
                                    <Text style={{ fontSize: 16, }}>Female</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>

                    <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>Height:</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: Colors.primary,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            marginBottom: 10,
                            fontSize: 16,
                        }}
                        value={formData.StudentHeight.toString()}
                        onChangeText={(value) => setFormData({ ...formData, StudentHeight: isNaN(parseInt(value)) ? "" : parseInt(value) })}
                        placeholder="Enter height"
                        keyboardType="numeric"
                    />

                    <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>Weight:</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: Colors.primary,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            marginBottom: 10,
                            fontSize: 16,
                        }}
                        value={formData.StudentWeight.toString()}
                        onChangeText={(value) => setFormData({ ...formData, StudentWeight: isNaN(parseInt(value)) ? "" : parseInt(value) })}
                        placeholder="Enter weight"
                        keyboardType="numeric"
                    />

                    <Text style={{ fontSize: 16, marginBottom: 5, color: Colors.secondary }}>Body Remarks:</Text>
                    <TextInput
                        style={[{
                            borderWidth: 1,
                            borderColor: Colors.primary,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            marginBottom: 10,
                            fontSize: 16,
                        }, {height: 80, textAlignVertical: 'top',}]}
                        value={formData.BodyRemark}
                        onChangeText={(value) => handleInputChange('BodyRemark', value)}
                        placeholder="Enter body remarks"
                        multiline
                    />
                    <TouchableOpacity style={{
                        backgroundColor: Colors.primary,
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 10,
                        alignItems: 'center',
                    }} onPress={handleSaveStudentDetails}>
                        <Text style={{ color: Colors.background, fontSize: 16, fontWeight: 'bold', }}>{formData.Id !== 0 ? "Save" : "Add"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: '#f25252',
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 10,
                        alignItems: 'center',
                    }} onPress={handleCancel}>
                        <Text style={{ color: Colors.background, fontSize: 16, fontWeight: 'bold', }}>Cancel</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: Colors.secondary
//     },
//     card: {
//         backgroundColor: 'white',
//         borderRadius: 8,
//         padding: 16,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//         elevation: 2,
//     },
//     cardTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: Colors.primary,
//         borderRadius: 5,
//         paddingHorizontal: 10,
//         paddingVertical: 8,
//         marginBottom: 10,
//         fontSize: 16,
//     },
//     textArea: {
//         height: 80,
//         textAlignVertical: 'top',
//     },
//     dropdownContainer: {
//         borderWidth: 1,
//         borderColor: Colors.primary,
//         borderRadius: 5,
//         paddingHorizontal: 10,
//         paddingVertical: 8,
//         marginBottom: 10,
//         position: 'relative',
//         zIndex: 1,
//     },
//     dropdownText: {
//         fontSize: 16,
//     },
//     dropdown: {
//         position: 'absolute',
//         top: 40,
//         left: 0,
//         right: 0,
//         borderWidth: 1,
//         borderColor: Colors.primary,
//         backgroundColor: '#fff',
//         borderRadius: 5,
//         padding: 10,
//         marginTop: 5,
//     },
//     dropdownOption: {
//         paddingVertical: 8,
//     },
//     dropdownOptionText: {
//         fontSize: 16,
//     },
//     submitButton: {
//         backgroundColor: Colors.primary,
//         padding: 10,
//         borderRadius: 5,
//         marginTop: 10,
//         alignItems: 'center',
//     },
//     cancelButton: {
//         backgroundColor: '#f25252',
//         padding: 10,
//         borderRadius: 5,
//         marginTop: 10,
//         alignItems: 'center',
//     },
//     submitButtonText: {
//         color: Colors.background,
//         fontSize: 16,
//         fontWeight: 'bold',
//     }
// });

export default ProfileScreen;