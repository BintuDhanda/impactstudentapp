import {BASE_URL} from './constant';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {convertToForm} from '../helpers';

const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user !== null) {
      // We have data!!
      let u = JSON.parse(user);
      console.log('my user', u.userId);
      return u.userId;
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
    return 0;
  }
};

const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

const headers = {
  'Content-Type': 'application/json',
  accept: 'application/json',
  Authorization: 'Bearer ' + getTokenFromStorage(),
};

export const Post = async (EndPoint, data, type = 'application/json') => {
  let payload = {
    ...data,
  };
  // if (type == 'multipart/form-data') {
  //   payload = convertToForm(data);
  // }
  return await axios.post(BASE_URL + EndPoint, payload, {
    ...headers,
    // 'Content-Type': type,
  });
};
export const Put = async (EndPoint, data) => {
  return await axios.put(BASE_URL + EndPoint, JSON.stringify(data), {headers});
};
export const Delete = async EndPoint => {
  return await axios.delete(BASE_URL + EndPoint, {headers});
};
export const Get = async EndPoint => {
  return await axios.get(BASE_URL + EndPoint, {headers});
};
export const GetById = async EndPoint => {
  return await axios.get(BASE_URL + EndPoint, {headers});
};
export const GetStudentIdByUserId = async () => {
  let usersId = await getUser();
  return await axios.get(
    BASE_URL + `User/getStudentIdByUserId?UserId=${usersId}`,
  );
};
