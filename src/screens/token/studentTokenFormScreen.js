import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import Colors from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-element-dropdown';
import {UserContext} from '../../../App';
import {useContext} from 'react';
import {Get as httpGet, Post as httpPost} from '../../constants/httpService';

const StudentTokenFormScreen = ({route, navigation}) => {
  const {user, setUser} = useContext(UserContext);
  const {studentId} = route.params || {};
  const [studentToken, setStudentToken] = useState({
    StudentTokenId: 0,
    StudentId: studentId,
    BatchId: '',
    IsActive: true,
    CreatedBy: user.userId,
  });
  const [courseCategoryList, setCourseCategoryList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [batchList, setBatchList] = useState([]);

  const [value, setValue] = useState(null);
  const [courseValue, setCourseValue] = useState(null);
  const [batchValue, setBatchValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (courseCategoryList.length === 0) {
      GetCourseCategoryList();
    }
  }, []);

  const handleSaveStudentToken = async () => {
    console.log(studentToken, 'studentToken');
    await httpPost('StudentToken/post', {
      ...studentToken,
      StudentId: studentToken?.CreatedBy,
    })
      .then(response => {
        if (response.status === 200) {
          response.data.message == null || response.data.message == ''
            ? Alert.alert('Success', response.data.message)
            : Alert.alert('Exists', response.data.message);
          setStudentToken({
            StudentTokenId: 0,
            StudentId: studentId,
            BatchId: '',
            IsActive: true,
            CreatedBy: user.userId,
          });
          navigation.goBack();
        }
      })
      .catch(err => {
        console.error('Token Add error :', err);
        Toast.show({
          type: 'error',
          text1: `${err}`,
          position: 'bottom',
          visibilityTime: 2000,
          autoHide: true,
        });
      });
  };

  const GetCourseCategoryList = () => {
    httpGet('CourseCategory/get')
      .then(response => {
        console.log(response.data);
        setCourseCategoryList(response.data);
      })
      .catch(error => {
        console.error(error, 'Get CourseCategory List Error', error);
        Toast.show({
          type: 'error',
          text1: `${error}`,
          position: 'bottom',
          visibilityTime: 2000,
          autoHide: true,
        });
      });
  };

  const fetchCourseByCourseCategoryId = async courseCategoryId => {
    try {
      console.log(courseCategoryId, 'courseCategoryId');
      const response = await httpGet(
        `Course/getCourseByCourseCategoryId?Id=${courseCategoryId}`,
      );
      setCourseList(response.data);
    } catch (error) {
      console.error('Error fetching Course:', error);
      Toast.show({
        type: 'error',
        text1: `${error}`,
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const fetchBatchByCourseId = async courseId => {
    try {
      console.log(courseId, 'courseCategoryId');
      const response = await httpGet(`Batch/getBatchByCourseId?Id=${courseId}`);
      setBatchList(response.data);
    } catch (error) {
      console.error('Error fetching Batch:', error);
      Toast.show({
        type: 'error',
        text1: `${error}`,
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };
  const handleCourseCategorySelect = courseCategory => {
    setValue(courseCategory.courseCategoryId);
    fetchCourseByCourseCategoryId(courseCategory.courseCategoryId);
  };

  const handleCourseSelect = course => {
    setCourseValue(course.courseId);
    fetchBatchByCourseId(course.courseId);
  };

  const handleBatchSelect = batch => {
    setStudentToken({...studentToken, BatchId: batch.batchId});
    setBatchValue(batch.batchId);
  };

  const handleCancel = () => {
    setStudentToken({
      StudentTokenId: 0,
      StudentId: studentId,
      BatchId: '',
      IsActive: true,
      CreatedBy: user.userId,
    });
    navigation.goBack();
  };
  return (
    <View style={{flex: 1, padding: 10, justifyContent: 'center'}}>
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
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 16}}>
            Token Form
          </Text>
          <Text
            style={{fontSize: 16, marginBottom: 5, color: Colors.secondary}}>
            Select Course Category :
          </Text>
          <Dropdown
            style={[
              {
                height: 50,
                borderColor: Colors.primary,
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 8,
                marginBottom: 10,
              },
              isFocus && {borderColor: 'blue'},
            ]}
            placeholderStyle={{fontSize: 16}}
            selectedTextStyle={{fontSize: 16}}
            inputSearchStyle={{
              height: 40,
              fontSize: 16,
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            data={courseCategoryList}
            search
            maxHeight={300}
            labelField="courseCategoryName"
            valueField="courseCategoryId"
            placeholder={!isFocus ? 'Select Course Category' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={handleCourseCategorySelect}
          />

          <Text
            style={{fontSize: 16, marginBottom: 5, color: Colors.secondary}}>
            Select Course :
          </Text>
          <Dropdown
            style={[
              {
                height: 50,
                borderColor: Colors.primary,
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 8,
                marginBottom: 10,
              },
              isFocus && {borderColor: 'blue'},
            ]}
            placeholderStyle={{fontSize: 16}}
            selectedTextStyle={{fontSize: 16}}
            inputSearchStyle={{
              height: 40,
              fontSize: 16,
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            data={courseList}
            search
            maxHeight={300}
            labelField="courseName"
            valueField="courseId"
            placeholder={!isFocus ? 'Select Course' : '...'}
            searchPlaceholder="Search..."
            value={courseValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={handleCourseSelect}
          />

          <Text
            style={{fontSize: 16, marginBottom: 5, color: Colors.secondary}}>
            Select Batch :
          </Text>
          <Dropdown
            style={[
              {
                height: 50,
                borderColor: Colors.primary,
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 8,
              },
              isFocus && {borderColor: 'blue'},
            ]}
            placeholderStyle={{fontSize: 16}}
            selectedTextStyle={{fontSize: 16}}
            inputSearchStyle={{
              height: 40,
              fontSize: 16,
            }}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            data={batchList}
            search
            maxHeight={300}
            labelField="batchName"
            valueField="batchId"
            placeholder={!isFocus ? 'Select Batch' : '...'}
            searchPlaceholder="Search..."
            value={batchValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={handleBatchSelect}
          />
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
              alignItems: 'center',
            }}
            onPress={handleSaveStudentToken}>
            <Text
              style={{
                color: Colors.background,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {studentToken.StudentTokenId !== 0 ? 'Save' : 'Add'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#f25252',
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
              alignItems: 'center',
            }}
            onPress={handleCancel}>
            <Text
              style={{
                color: Colors.background,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Toast ref={ref => Toast.setRef(ref)} />
      </View>
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

export default StudentTokenFormScreen;
