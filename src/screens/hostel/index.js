import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import Colors from '../../constants/Colors';
import Toast from 'react-native-toast-message';
import {UserContext} from '../../../App';
import {useContext} from 'react';
import {Get as httpGet, Post as httpPost} from '../../constants/httpService';

const StudentHostelRoomBadRentScreen = () => {
  const {user, setUser} = useContext(UserContext);

  const [hostelRoomBadStudentList, setHostelRoomBadStudentList] = useState([]);

  useEffect(() => {
    GetHostelRoomBadStudentList();
  }, []);
  const GetHostelRoomBadStudentList = () => {
    httpGet('StudentHostelRoomBadRent/get?id=' + user?.userId)
      .then(result => {
        setHostelRoomBadStudentList(result.data);
      })
      .catch(err => {
        console.log('Get HostelRoomBadStudent error :', err);
        Toast.show({
          type: 'error',
          text1: `${err}`,
          position: 'bottom',
          visibilityTime: 2000,
          autoHide: true,
        });
      });
  };

  const renderHostelRoomBadStudentCard = ({item}) => {
    if (item?.dueAmount <= 0) {
      return null;
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
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
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Hostel due
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: item?.dueAmount > 0 ? 'red' : 'gray',
            }}>
            {item?.displayMessage}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              maxWidth: '85%',
            }}>
            H/R/B {item?.hostelName}/{item?.roomNo}/{item?.badNo}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{}}>
      <FlatList
        style={{padding: 5}}
        data={hostelRoomBadStudentList}
        renderItem={renderHostelRoomBadStudentCard}
        keyExtractor={item => item.hostelName.toString()}
      />
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default StudentHostelRoomBadRentScreen;
