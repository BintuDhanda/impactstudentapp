import React, { useEffect, useRef, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Animated, ActivityIndicator, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Post as httpPost, GetStudentIdByUserId } from '../../constants/httpService';
import { UserContext } from '../../../App';

const NoficationsScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const moveToRight = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [isEndReached, setIsEndReached] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      GetNotificationList();
    }, [])
  );

  const GetNotificationList = () => {
    setLoading(true);
    const filter = { "Take": take, "Skip": skip, "UserId": user.userId }
    httpPost("User/getAllNotification", filter)
      .then((result) => {
        console.log(result.data, "Notification")
        setLoading(false);
        if (result.data.length >= 0) {
          setIsEndReached(false);
          setNotificationList([...notificationList, ...result.data])
          setSkip(skip + 10)
        }
        if (result.data.length === 0) {
          setIsEndReached(true);
          Toast.show({
            type: 'info',
            text1: 'No records found',
            position: 'bottom',
            visibilityTime: 2000,
            autoHide: true,
          });
        }
      })
      .catch(err => console.error('Get Notification error :', err))
  }

  const handleLoadMore = async () => {
    console.log("Execute Handle More function")
    if (!isEndReached) {
      GetNotificationList();
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const renderNotificationCard = ({ item }) => (
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
        <Text style={{ fontSize: 16 }}>Title : </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{item.title}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16 }}>Body : </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{item.body}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, }}>
        <Animated.View style={{ flex: 1, position: 'absolute', top: 0, padding: 16, right: 0, left: 0, bottom: 0, backgroundColor: Colors.background, transform: [{ scale: scale }, { translateX: moveToRight }] }}>
          <FlatList
            data={notificationList}
            keyExtractor={(item) => item.userSendNotificationId.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderNotificationCard}
            ListFooterComponent={renderFooter}
            onEndReached={() => {
              handleLoadMore();
            }}
            onEndReachedThreshold={0.1}
          />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </Animated.View>
      </View>
    </ScrollView >
  );
};

export default NoficationsScreen;

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
//   addressCard: {
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
//   addressName: {
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