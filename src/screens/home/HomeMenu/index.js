import React from 'react';
import {FlatList, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {menus} from './constants';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../../constants/Colors';
const {width} = Dimensions.get('window');
const numColumns = parseInt(width / 110);

const HomeMenu = () => {
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation?.navigate(item?.path)}
        style={{
          marginRight: item?.marginRight || 0,
          borderRadius: 10,
          borderWidth: 0.8,
          borderColor: 'lightgray',
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
          size={25}
        />
        <Text
          style={{
            textAlign: 'center',
            flexWrap: 'nowrap',
            fontSize: 12,
            marginTop: 5,
            fontWeight: 'bold',
          }}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{alignItems: 'center'}}>
      <FlatList
        ListHeaderComponent={
          <View style={{margin: 5}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
              Quick Actions
            </Text>
          </View>
        }
        style={{
          padding: 10,
          backgroundColor: 'white',
          // elevation: 0.5,
          borderRadius: 10,
          width: width,
        }}
        contentContainerStyle={{flexGrow: 1}}
        data={menus}
        numColumns={numColumns}
        ItemSeparatorComponent={<View style={{height: 10}} />}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default HomeMenu;
