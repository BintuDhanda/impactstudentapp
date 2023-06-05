import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NewsPost = ({ imageUrl, text, likesCount, commentsCount }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon}>
          <Icon name="heart" size={20} color="red" />
          <Text style={styles.iconCount}>{likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name="comment" size={20} color="blue" />
          <Text style={styles.iconCount}>{commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    margin: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  iconCount: {
    marginLeft: 5,
  },
};

export default NewsPost;
