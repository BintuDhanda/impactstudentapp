import React, {useEffect, useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Colors from '../../constants/Colors';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
  Get as httpGet,
  GetStudentIdByUserId,
} from '../../constants/httpService';
import {FlatList} from '../../components/flatlist';

const StudentTokenScreen = ({navigation}) => {
  const [tokenList, setTokenList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      GetStudentTokenByStudentId();
    }, []),
  );

  const GetStudentTokenByStudentId = async () => {
    try {
      const studentId = await GetStudentIdByUserId();
      const sId = studentId?.data?.id;
      console.log(studentId?.data);
      if (!sId) {
        return;
      }
      const response = await httpGet(
        `StudentToken/getStudentTokenByStudentId?StudentId=${sId}`,
      );
      console.log(response.data, 'response');
      setTokenList(response.data);
    } catch (error) {
      console.error('Error fetching Student Token List:', error);
      Toast.show({
        type: 'error',
        text1: `${error}`,
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const handleAddStudentTokenNavigate = async () => {
    const studentIds = await GetStudentIdByUserId();
    navigation.navigate('StudentTokenFormScreen', {
      studentId: studentIds?.data?.studentId,
    });
  };

  // const handleEditStudentTokenNavigate = (tokenId, batchName) => {
  //   navigation.navigate('StudentTokenFormScreen', { studentId: studentId, tokenId: tokenId, batchName: batchName })
  // }

  const getFormattedDate = datestring => {
    const datetimeString = datestring;
    const date = new Date(datetimeString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const convertToIndianTimee = datetimeString => {
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
  };

  const renderTokenCard = ({item}) => (
    <View
      style={{
        justifyContent: 'space-between',
        backgroundColor: Colors.background,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: Colors.shadow,
        shadowOffset: {width: 10, height: 2},
        shadowOpacity: 4,
        shadowRadius: 10,
        elevation: 10,
        borderWidth: 1.5,
        borderColor: Colors.primary,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 16}}>Batch Name : </Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
          {item.batchName}
        </Text>
      </View>
      {item.validFrom === null ? null : (
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16}}>Valid From : </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
            {convertToIndianTimee(item.validFrom)}
          </Text>
        </View>
      )}
      {item.validUpto === null ? null : (
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16}}>Valid UpTo : </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
            {convertToIndianTimee(item.validUpto)}
          </Text>
        </View>
      )}
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 16}}>Token Fee : </Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
          xxxx -/Rs
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 16}}>Token Status : </Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
          {item.tokenStatus === true ? 'Active' : 'InActive'}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 16}}>Token Number : </Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
          {item.studentTokenId}
        </Text>
      </View>
      {/* <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16 }}>Is Valid For Admission : </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{item.isValidForAdmissionNonMapped == "False" ? "No" : "Yes"}</Text>
      </View> */}
    </View>
  );

  return (
    <View
      style={{
        padding: 16,
        justifyContent: 'center',
      }}>
      <FlatList
        data={tokenList}
        ListHeaderComponent={
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginBottom: 20,
            }}
            onPress={handleAddStudentTokenNavigate}>
            <Text
              style={{
                color: Colors.background,
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Click Here to Apply For Token
            </Text>
          </TouchableOpacity>
        }
        keyExtractor={item => item.studentTokenId.toString()}
        renderItem={renderTokenCard}
      />
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default StudentTokenScreen;

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
