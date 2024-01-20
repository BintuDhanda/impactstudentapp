import React from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {menus} from './constants';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../../constants/Colors';

const HomeMenu = () => {
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation?.navigate(item?.path)}
        style={{
          marginRight: 5,
          borderRadius: 10,
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 5,
          maxWidth: 110,
          width: 110,
        }}>
        <FontAwesome
          style={{
            backgroundColor: '#991d1d73',
            padding: 10,
            borderRadius: 10,
            color: Colors.primary,
          }}
          name={item?.icon}
          size={30}
        />
        <Text
          style={{
            textAlign: 'center',
            flexWrap: 'nowrap',
            fontSize: 16,
            marginTop: 5,
            fontWeight: 'bold',
          }}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      style={{
        margin: 5,
        marginTop: 10,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        elevation: 1.5,
        borderRadius: 5,
      }}
      contentContainerStyle={{flexGrow: 1}}
      data={menus}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

export default HomeMenu;
