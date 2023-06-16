import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import Colors from '../constants/Colors';

const TokenScreen = () => {
  const [token, setToken] = useState({ "Id": 0, "StudentId": "", "IsActive": true, "BatchId": "" });
  const [courseCategoryList, setCourseCategoryList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [tokenList, setTokenList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [courseValue, setCourseValue] = useState(null);
  const [batchValue, setBatchValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  console.log(courseCategoryList, "CourseCategoryList")
  useEffect(() => {
    GetCounseCategoryList();
  }, []);

  const GetCounseCategoryList = () => {
    axios.get('http://192.168.1.7:5291/api/CourseCategory/get', {
      headers: {
        'Content-Type': 'application/json', // Example header
        'User-Agent': 'react-native/0.64.2', // Example User-Agent header
      },
    })
      .then((response) => {
        console.log(response.data);
        setCourseCategoryList(response.data);
      })
      .catch((error) => {
        console.log(error, "Get CourseCategory List Error");
      });
  }

  const fetchCourseByCourseCategoryId = async (courseCategoryId) => {
    try {
        console.log(courseCategoryId, "courseCategoryId")
      const response = await axios.get(`http://192.168.1.7:5291/api/Course/getCourseByCourseCategoryId?Id=${courseCategoryId}`, {
        headers: {
          'Content-Type': 'application/json', // Example header
          'User-Agent': 'react-native/0.64.2', // Example User-Agent header
        },
      });
      setCourseList(response.data);
    } catch (error) {
      console.error('Error fetching Course:', error);
    }
  };

  const fetchBatchByCourseId = async (courseId) => {
    try {
        console.log(courseId, "courseCategoryId")
      const response = await axios.get(`http://192.168.1.7:5291/api/Batch/getBatchByCourseId?Id=${courseId}`, {
        headers: {
          'Content-Type': 'application/json', // Example header
          'User-Agent': 'react-native/0.64.2', // Example User-Agent header
        },
      });
      setBatchList(response.data);
    } catch (error) {
      console.error('Error fetching Batch:', error);
    }
  };
  const handleCourseCategorySelect = (courseCategory) => {
    setValue(courseCategory.id);
    fetchCourseByCourseCategoryId(courseCategory.id);
  };
  
  const handleCourseSelect = (course) => {
    setCourseValue(course.id);
    fetchBatchByCourseId(course.id);
  };


  const handleAddToken = () => {
    setToken({
      Id: 0,
      StudentId: "",
      IsActive: true,
      BatchId: ""
    });
    setModalVisible(true);
  };

  const handleEditToken = (id) => {
    axios.get(`http://192.168.1.7:5291/api/Token/getById?Id=${id}`)
      .then((result) => {
        console.log(result);
        setToken(
          {
            Id: result.data.id,
            StudentId: result.data.studentId,
            BatchId: result.data.batchId,
            IsActive: result.data.isActive
          }
        );
      })
      .catch(err => console.error("Get By Id Error", err));
    setModalVisible(true);
  };

  const handleDeleteToken = (id) => {
    axios.delete(`http://192.168.1.7:5291/api/Token/delete?Id=${id}`)
      .then((result) => {
        console.log(result);
        fetchTokensByAccCategoryId(result.data.accCategoryId)
      })
      .catch(err => console.error("Delete Error", err));
  }

  const handleSaveToken = async () => {
    try {
      if (token.Id !== 0) {
        await axios.put(`http://192.168.1.7:5291/api/StudentToken/put`, JSON.stringify(token), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            if (response.status === 200) {
              fetchTokensByAccCategoryId(response.data.accCategoryId);
              Alert.alert('Sucess', 'StudentToken Update successfully');
              setToken({
                "Id": 0,
                "StudentId": "",
                "BatchId": "",
                "IsActive": true
              });
            }
          })
          .catch(err => console.error("Post error in Token", err));
      } else {
        await axios.post('http://192.168.1.7:5291/api/StudentToken/post', JSON.stringify(token), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            if (response.status === 200) {
              fetchTokensByAccCategoryId(response.data.accCategoryId);
              Alert.alert('Sucess', 'StudentToken is Added Successfully')
              setToken({
                "Id": 0,
                "StudentId": "",
                "BatchId": "",
                "IsActive": true
              });
            }
          })
      }
      setModalVisible(false);
    } catch (error) {
      console.log('Error saving Token:', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };


  const renderTokenCard = ({ item }) => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Colors.background,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      marginTop: 10,
      shadowColor: Colors.shadow,
      shadowOffset: { width: 10, height: 2 },
      shadowOpacity: 4,
      shadowRadius: 10,
      elevation: 10,
      borderWidth: 0.5,
      borderColor: Colors.primary,
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}>{item.tokenName}</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{
          backgroundColor: '#5a67f2',
          borderRadius: 5,
          paddingVertical: 8,
          paddingHorizontal: 12,
          marginRight: 10,
        }} onPress={() => handleEditToken(item.id)}>
          <Text style={{
            color: Colors.background,
            fontSize: 14,
            fontWeight: 'bold',
          }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: '#f25252',
          borderRadius: 5,
          paddingVertical: 8,
          paddingHorizontal: 12,
        }} onPress={() => handleDeleteToken(item.id)}>
          <Text style={{
            color: Colors.background,
            fontSize: 14,
            fontWeight: 'bold',
          }}>Delete</Text>
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
        }} onPress={handleAddToken}>
          <Text style={{
            color: Colors.background,
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>Apply Token</Text>
        </TouchableOpacity>
        <FlatList
          data={tokenList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTokenCard}
        />

        {modalVisible && (
          <Modal transparent visible={modalVisible}>
            <View style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View style={{
                backgroundColor: Colors.background,
                borderRadius: 10,
                padding: 20,
                width: '80%',
              }}>
                <Dropdown
                  style={[{
                    height: 50,
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 8,
                    marginBottom: 10,
                  }, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={{ fontSize: 16, }}
                  selectedTextStyle={{ fontSize: 16, }}
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
                  labelField= "courseCategoryName"
                  valueField= "id"
                  placeholder={!isFocus ? 'Select Token Category' : '...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={handleCourseCategorySelect}
                />
                <Dropdown
                  style={[{
                    height: 50,
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 8,
                    marginBottom: 10
                  }, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={{ fontSize: 16, }}
                  selectedTextStyle={{ fontSize: 16, }}
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
                  labelField= "courseName"
                  valueField= "id"
                  placeholder={!isFocus ? 'Select Token Category' : '...'}
                  searchPlaceholder="Search..."
                  value={courseValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={handleCourseSelect}
                />
                <Dropdown
                  style={[{
                    height: 50,
                    borderColor: Colors.primary,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 8,
                  }, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={{ fontSize: 16, }}
                  selectedTextStyle={{ fontSize: 16, }}
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
                  labelField= "batchName"
                  valueField= "id"
                  placeholder={!isFocus ? 'Select Token Category' : '...'}
                  searchPlaceholder="Search..."
                  value={batchList.id}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(value) => (setToken({...token, BatchId: value}))}
                />
                <View style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                  <TouchableOpacity style={{
                    backgroundColor: Colors.primary,
                    borderRadius: 5,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                  }} onPress={handleSaveToken}>
                    <Text style={{
                      color: Colors.background,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>{token.Id === 0 ? 'Add' : 'Save'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    backgroundColor: '#f25252',
                    borderRadius: 5,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    marginLeft: 10
                  }} onPress={handleCloseModal}>
                    <Text style={{
                      color: Colors.background,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ScrollView>
  );
};

export default TokenScreen;

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
//   tokenCard: {
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
//   tokenName: {
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