import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Get as httpGet, GetStudentIdByUserId } from '../../constants/httpService';

const StudentQualificationScreen = ({ navigation }) => {
  const [qualificationList, setQualificationList] = useState([]);
  const [studentQualificationDeleteId, setStudentQualificationDeleteId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      GetStudentQualificationByStudentId();
    }, [])
  );

  const GetStudentQualificationByStudentId = async () => {
    const studentId = await GetStudentIdByUserId();
    httpGet(`StudentQualification/getStudentQualificationByStudentId?Id=${studentId.data.studentId}`)
      .then((response) => {
        setQualificationList(response.data);
      })
      .catch((error) => {
        console.error(error, "Get Student Qualification By Student Id Error");
        Toast.show({
          type: 'error',
          text1: `${error}`,
          position: 'bottom',
          visibilityTime: 2000,
          autoHide: true,
        });
      });
  }

  const DeleteStudentQualificationIdConfirm = (studentQualificationid) => {
    setStudentQualificationDeleteId(studentQualificationid);
  }

  const DeleteStudentQualificationIdConfirmYes = () => {
    httpGet(`StudentQualification/delete?Id=${studentQualificationDeleteId}`)
      .then((result) => {
        console.log(result);
        GetStudentQualificationByStudentId();
        setStudentQualificationDeleteId(0);
        setShowDelete(false);
      })
      .catch((error) => {
        console.error('Delete Student Qualification error', error);
        Toast.show({
          type: 'error',
          text1: `${error}`,
          position: 'bottom',
          visibilityTime: 2000,
          autoHide: true,
        });
      })
  }

  const DeleteStudentQualificationIdConfirmNo = () => {
    setStudentQualificationDeleteId(0);
    setShowDelete(false);
  }

  const handleAddQualificationNavigate = async () => {
    const studentId = await GetStudentIdByUserId();
    navigation.navigate('StudentQualificationFormScreen', { studentId: studentId.data.studentId })
  }

  const handleEditQualificationNavigate = async (qualificationId) => {
    const studentId = await GetStudentIdByUserId();
    navigation.navigate('StudentQualificationFormScreen', { studentId: studentId.data.studentId, qualificationId: qualificationId })
  }

  const renderQualificationCard = ({ item }) => (
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
        <Text style={{ fontSize: 16 }}>Qualification Name : </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{item.qualificationName}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16 }}>Subject : </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{item.subject}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16 }}>Maximum Marks : </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{item.maximumMark}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16 }}>Marks Obtain : </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{item.marksObtain}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16 }}>Percentage : </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{item.percentage}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16 }}>Grade : </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{item.grade}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity style={{ marginRight: 10, }} onPress={() => handleEditQualificationNavigate(item.studentQualificationId)}>
          <Icon name="pencil" size={20} color={'#5a67f2'} style={{ marginLeft: 8, textAlignVertical: 'center' }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { DeleteStudentQualificationIdConfirm(item.studentQualificationId); setShowDelete(true); }}>
          <Icon name="trash" size={20} color={'#f25252'} style={{ marginRight: 8, textAlignVertical: 'center' }} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{
        padding: 16,
        justifyContent: 'center'
      }}>
        <TouchableOpacity style={{
          backgroundColor: Colors.primary,
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginBottom: 20,
        }} onPress={handleAddQualificationNavigate}>
          <Text style={{
            color: Colors.background,
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>Add Qualification</Text>
        </TouchableOpacity>

        {showDelete && (
          <Modal transparent visible={showDelete}>
            <View style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View style={{
                backgroundColor: Colors.background,
                borderRadius: 10,
                padding: 28,
                shadowColor: Colors.shadow,
                width: '80%',
              }}>
                <Text style={{ fontSize: 18, marginBottom: 5, alignSelf: 'center', fontWeight: 'bold' }}>Are You Sure You Want To Delete</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                  <TouchableOpacity style={{
                    backgroundColor: Colors.primary,
                    borderRadius: 5,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    marginTop: 10,
                    marginRight: 3,
                  }} onPress={() => {
                    DeleteStudentQualificationIdConfirmYes();
                  }}>
                    <Text style={{ fontSize: 16, color: Colors.background }}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    backgroundColor: '#f25252',
                    borderRadius: 5,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    marginTop: 10,
                  }} onPress={() => {
                    DeleteStudentQualificationIdConfirmNo();
                  }}>
                    <Text style={{ fontSize: 16, color: Colors.background }}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}

        <FlatList
          data={qualificationList}
          keyExtractor={(item) => item.studentQualificationId.toString()}
          renderItem={renderQualificationCard}
        />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    </ScrollView>
  );
};

export default StudentQualificationScreen;

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
//   qualificationCard: {
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
//   qualificationName: {
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