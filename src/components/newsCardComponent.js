import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserContext} from '../../App';
import {useContext} from 'react';
import {Post as httpPost} from '../constants/httpService';
import {News_URL} from '../constants/constant';

const NewsCardComponent = ({item, navigation}) => {
  const {user, setUser} = useContext(UserContext);
  const [cardNews, SetCardNews] = useState(item.item);
  const {width, height} = Dimensions.get('window');

  const handleNewsLike = newsId => {
    httpPost('NewsLike/post', {
      NewsId: newsId,
      CreatedBy: user.userId,
      IsActive: true,
    })
      .then(response => {
        SetCardNews({
          ...cardNews,
          isLiked: !cardNews.isLiked,
          totalLikes: response.data.totalLikes,
        });
      })
      .catch(err => console.error('News Like Error', err));
  };

  const handleNewsCommentNavigate = newsId => {
    navigation.navigate('NewsCommentScreen', {newsId: newsId});
  };

  const handleNewsLikeNavigate = newsId => {
    navigation.navigate('NewsLikeScreen', {newsId: newsId});
  };

  console.log('News Image', cardNews.newsImage);
  return (
    <>
      <View
        style={{
          justifyContent: 'space-between',
          backgroundColor: Colors.background,
          borderRadius: 10,
          //   padding: 10,
          paddingVertical: 8,
          marginBottom: 10,
          shadowColor: Colors.shadow,
          shadowOffset: {width: 5, height: 1},
          shadowOpacity: 1,
          shadowRadius: 50,
          elevation: 1,
          //   borderWidth: 1,
          //   borderColor: Colors.primary,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 16,
              paddingHorizontal: 10,
              fontWeight: 'bold',
              marginBottom: 8,
            }}>
            {cardNews.newsTitle}
          </Text>
        </View>
        {cardNews.newsImage !== null && cardNews.newsImage !== '' && (
          <Image
            source={{uri: News_URL + cardNews.newsImage}}
            style={{
              //   width: width * 0.8,
              width: '100%',
              height: (width * 0.8) / 1.5,
              resizeMode: 'cover',
              borderRadius: 1,
              alignSelf: 'center',
            }}
          />
        )}
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 16,
              paddingHorizontal: 10,
              fontWeight: 'bold',
              marginBottom: 8,
            }}>
            {' '}
            {cardNews.newsText}{' '}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignContent: 'center'}}
            onPress={() => handleNewsLike(cardNews.newsId)}>
            {cardNews.isLiked ? (
              <Icon name="heart" size={20} color="red" />
            ) : (
              <Icon name="heart-o" size={20} color="red" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => handleNewsLikeNavigate(cardNews.newsId)}>
            <Text style={{marginLeft: 5}}>{cardNews.totalLikes} Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignContent: 'center'}}
            onPress={() => handleNewsCommentNavigate(cardNews.newsId)}>
            {cardNews.isCommented ? (
              <Icon name="comment" size={20} color="blue" />
            ) : (
              <Icon name="comment-o" size={20} color="blue" />
            )}
            <Text style={{marginLeft: 5}}>
              {cardNews.totalComments} Comments
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default NewsCardComponent;
