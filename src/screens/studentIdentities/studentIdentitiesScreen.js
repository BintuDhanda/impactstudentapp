import { UserContext } from '../../../App';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Modal, Alert, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from '../../constants/Colors';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { Get as httpGet, Post as httpPost } from '../../constants/httpService';

const StudentIdentitiesScreen = ({ route, navigation }) => {
    const { user, setUser } = useContext(UserContext);
    const { studentBatchid } = route.params;
    const [identitiesList, setIdentitiesList] = useState([]);
    const [studentIdentities, setStudentIdentities] = useState({ "StudentIdentitiesId": 0, "StudentBatchId": studentBatchid, "IdentityTypeId": 0, "StringStatus": "In-Active", "IsActive": true, "CreatedAt": null, "CreatedBy": user.userId, "LastUpdatedBy": null, });
    const [identityTypeList, setIdentityTypeList] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [studentIdentitiesDeleteId, setStudentIdentitiesDeleteId] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const toggleStatusDropdown = () => {
        setShowStatusDropdown(!showStatusDropdown);
    };

    const selectStatus = (selectedStatus) => {
        setStudentIdentities((prevStudentIdentities) => ({
            ...prevStudentIdentities,
            StringStatus: selectedStatus,
        }));
        setShowStatusDropdown(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            GetStudentIdentitiesByStudentId();
        }, [])
    );

    const GetStudentIdentitiesByStudentId = () => {
        httpGet(`StudentIdentities/getStudentIdentitiesByStudentBatchId?Id=${studentBatchid}`)
            .then((response) => {
                console.log(response.data);
                setIdentitiesList(response.data);
            })
            .catch((error) => {
                console.error(error, "Get Student Identities By Student Batch Id Error");
                Toast.show({
                    type: 'error',
                    text1: `${error}`,
                    position: 'bottom',
                    visibilityTime: 2000,
                    autoHide: true,
                });
            });
    }

    const convertToIndianTimee = (datetimeString) => {
        const utcDate = new Date(datetimeString);

        // Convert to IST (Indian Standard Time)
        // utcDate.setMinutes(utcDate.getMinutes() + 330); // IST is UTC+5:30

        const istDate = new Intl.DateTimeFormat('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true, // Use 12-hour format with AM/PM
        }).format(utcDate);

        return istDate;
    }

    const renderIdentitiesCard = ({ item }) => (
        <View style={{
            justifyContent: 'space-between',
            backgroundColor: Colors.background,
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
            shadowColor: Colors.shadow,
            shadowOffset: { width: 10, height: 2 },
            shadowOpacity: 4,
            shadowRadius: 10,
            elevation: 10,
            borderWidth: 1.5,
            borderColor: Colors.primary,
        }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Identities Name : </Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{item.identityTypeName}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Student Batch Name : </Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{item.studentBatchName}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Status : </Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{item.stringStatus}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 16 }}>Date & Time : </Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{convertToIndianTimee(item.createdAt)}</Text>
            </View>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{
                padding: 16,
                justifyContent: 'center'
            }}>
                <FlatList
                    data={identitiesList}
                    keyExtractor={(item) => item.studentIdentitiesId.toString()}
                    renderItem={renderIdentitiesCard}
                />
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
        </ScrollView>
    );
};

export default StudentIdentitiesScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     padding: 16,
//     justifyContent: 'center'
//   },
//   dropdown: {
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//   },
//   addButton: {
//     backgroundColor: '#5a67f2',
//     borderRadius: 5,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     marginTop: 10,
//     alignSelf: 'flex-start',
//   },
//   addButtonText: {
//     color: '#ffffff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
//   identitiesCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#ccc',
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 10,
//     marginTop: 10,
//     shadowColor: '#000000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   identitiesName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//   },
//   editButton: {
//     backgroundColor: '#5a67f2',
//     borderRadius: 5,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     marginRight: 10,
//   },
//   deleteButton: {
//     backgroundColor: '#f25252',
//     borderRadius: 5,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     padding: 20,
//     width: '80%',
//   },
//   modalTextInput: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 8,
//     padding: 8,
//     marginBottom: 20,
//   },
//   modalButtonContainer: {
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   modalSaveButton: {
//     backgroundColor: '#5a67f2',
//     borderRadius: 5,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   modalCancelButton: {
//     backgroundColor: '#f25252',
//     borderRadius: 5,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     marginLeft: 10
//   },
//   modalButtonText: {
//     color: '#ffffff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });