import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import {UserContext} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import {Post as httpPost, Get as httpGet} from '../constants/httpService';
import {News_URL} from '../constants/constant';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {PrimaryButton} from '../components/buttons';
import Toast from 'react-native-toast-message';

const ProfileScreen = ({route}) => {
  const navigation = useNavigation();
  const {user, setUser} = useContext(UserContext);
  // const { userId, studentId } = route.params;
  const fromStack = route?.params?.stack;
  const callback = route?.params?.callback;
  const userId = user == null ? 0 : user.userId;
  const [studentDetails, setStudentDetails] = useState({
    StudentId: 0,
    StudentImage: null,
    FirstName: '',
    LastName: '',
    FatherName: '',
    MotherName: '',
    Gender: '',
    BodyRemark: '',
    UserId: userId,
    IsActive: true,
    CreatedAt: null,
    CreatedBy: user == null ? 0 : user.userId,
    LastUpdatedBy: null,
  });

  useFocusEffect(
    React.useCallback(() => {
      if (studentDetails.Id !== 0) {
        GetStudentDetailsByUserId();
      }
    }, []),
  );

  const handleInputChange = (name, value) => {
    setStudentDetails(prevStudentDetails => ({
      ...prevStudentDetails,
      [name]: value,
    }));
  };
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const toggleGenderDropdown = () => {
    setShowGenderDropdown(!showGenderDropdown);
  };

  const selectGender = selectedGender => {
    setStudentDetails(prevStudentDetails => ({
      ...prevStudentDetails,
      Gender: selectedGender,
    }));
    setShowGenderDropdown(false);
  };

  const GetStudentDetailsByUserId = () => {
    httpGet(`StudentDetails/getStudentDetailsByUserId?UserId=${userId}`)
      .then(result => {
        setStudentDetails({
          StudentId: result.data.studentId ? result.data.studentId : 0,
          StudentImage: result.data.studentImage
            ? result.data.studentImage
            : null,
          FirstName: result.data.firstName ? result.data.firstName : '',
          LastName: result.data.lastName ? result.data.lastName : '',
          FatherName: result.data.fatherName ? result.data.fatherName : '',
          MotherName: result.data.motherName ? result.data.motherName : '',
          Gender: result.data.gender ? result.data.gender : '',
          BodyRemark: result.data.bodyRemark ? result.data.bodyRemark : '',
          UserId: result.data.userId ? result.data.userId : userId,
          IsActive: result.data.isActive ? result.data.isActive : true,
          CreatedAt: result.data.createdAt ? result.data.createdAt : null,
          CreatedBy: result.data.createdBy
            ? result.data.createdBy
            : user == null
            ? 0
            : user.userId,
          LastUpdatedBy: user == null ? 0 : user.userId,
        });
      })
      .catch(err => console.error('Get Student Details By User Id Error', err));
  };
  const [loading, setLoading] = useState(false);
  const handleSaveStudentDetails = async () => {
    if (
      !studentDetails?.FirstName ||
      !studentDetails?.FatherName ||
      !studentDetails?.MotherName ||
      !studentDetails?.BodyRemark ||
      !studentDetails?.Gender
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all details',
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    setLoading(true);
    await httpPost('StudentDetails/post', studentDetails, 'multipart/form-data')
      .then(response => {
        if (response.status === 200) {
          response.data.message == null || response.data.message == ''
            ? Alert.alert('Success', response.data.message)
            : Alert.alert('Exists', response.data.message);
          !fromStack && navigation.goBack();
          callback && callback();
        }
      })
      .catch(err => console.error('Student Details Add error :', err))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogOut = async () => {
    try {
      const savedUser = await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
    setUser(null);
  };

  const handleCancel = () => {
    fromStacknavigation.goBack();
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PrimaryButton
            onPress={handleLogOut}
            title="Logout"
            style={{backgroundColor: 'white', width: 100, padding: 5}}
            labelStyle={{color: '#1c8adb'}}
          />
        );
      },
    });
  }, []);
  return (
    <View style={{flex: 1, padding: 10}}>
      <View
        style={{
          backgroundColor: Colors.background,
          borderRadius: 8,
          padding: 16,
          shadowColor: Colors.shadow,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <Image
            source={
              studentDetails.StudentImage == null
                ? require('../icons/user.png')
                : {uri: News_URL + studentDetails.StudentImage}
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
          <Text
            style={{fontSize: 16, marginBottom: 5, color: Colors.secondary}}>
            First Name:
          </Text>
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
            value={studentDetails.FirstName}
            onChangeText={value => handleInputChange('FirstName', value)}
            placeholder="Enter first name"
            editable={studentDetails.StudentId == 0 ? true : false}
          />

          <Text
            style={{fontSize: 16, marginBottom: 5, color: Colors.secondary}}>
            Last Name:
          </Text>
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
            value={studentDetails.LastName}
            onChangeText={value => handleInputChange('LastName', value)}
            placeholder="Enter last name"
            editable={studentDetails.StudentId == 0 ? true : false}
          />

          <Text
            style={{fontSize: 16, marginBottom: 5, color: Colors.secondary}}>
            Father Name:
          </Text>
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
            value={studentDetails.FatherName}
            onChangeText={value => handleInputChange('FatherName', value)}
            placeholder="Enter father name"
            editable={studentDetails.StudentId == 0 ? true : false}
          />

          <Text
            style={{fontSize: 16, marginBottom: 5, color: Colors.secondary}}>
            Mother Name:
          </Text>
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
            value={studentDetails.MotherName}
            onChangeText={value => handleInputChange('MotherName', value)}
            placeholder="Enter mother name"
            editable={studentDetails.StudentId == 0 ? true : false}
          />

          <Text
            style={{fontSize: 16, marginBottom: 5, color: Colors.secondary}}>
            Gender:
          </Text>
          {studentDetails.StudentId == 0 ? (
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
              onPress={toggleGenderDropdown}>
              <Text style={{fontSize: 16}}>
                {studentDetails.Gender || 'Select gender'}
              </Text>
              {showGenderDropdown && (
                <View
                  style={{
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
                    style={{paddingVertical: 8}}
                    onPress={() => selectGender('Male')}>
                    <Text style={{fontSize: 16}}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{paddingVertical: 8}}
                    onPress={() => selectGender('Female')}>
                    <Text style={{fontSize: 16}}>Female</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{paddingVertical: 8}}
                    onPress={() => selectGender('Other')}>
                    <Text style={{fontSize: 16}}>Other</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ) : (
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
              value={studentDetails.Gender}
              onChangeText={value => handleInputChange('MotherName', value)}
              placeholder="Enter mother name"
              editable={studentDetails.StudentId == 0 ? true : false}
            />
          )}

          <Text
            style={{fontSize: 16, marginBottom: 5, color: Colors.secondary}}>
            Body Remarks:
          </Text>
          <TextInput
            style={[
              {
                borderWidth: 1,
                borderColor: Colors.primary,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 8,
                marginBottom: 10,
                fontSize: 16,
              },
              {height: 80, textAlignVertical: 'top'},
            ]}
            value={studentDetails.BodyRemark}
            onChangeText={value => handleInputChange('BodyRemark', value)}
            placeholder="Enter body remarks"
            multiline
            editable={studentDetails.StudentId == 0 ? true : false}
          />
          {studentDetails.StudentId === 0 ? (
            <>
              <PrimaryButton
                title={studentDetails.StudentId !== 0 ? 'Save' : 'Add'}
                onPress={handleSaveStudentDetails}
                style={{padding: 10, borderRadius: 5}}
                loading={loading}
              />
              {!fromStack && (
                <PrimaryButton
                  title={'Cancel'}
                  onPress={handleCancel}
                  style={{
                    padding: 10,
                    borderRadius: 5,
                    backgroundColor: '#f25252',
                  }}
                />
              )}
            </>
          ) : null}
        </ScrollView>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

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
