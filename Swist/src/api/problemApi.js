import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {BASE_URL} from "./apiKeys";


export const getProblemCategories = async (token) => {
  const locale = await AsyncStorage.getItem('locale')
  return axios.get(`${BASE_URL}/api/v1/problem/category`, {
    headers: {
      'Authorization': token,
      'language': locale
    },
  }).then((response) => {
    return response.data.data
  }).catch((error) => {
    console.log(error)
  });
}

export const getCategoryProblems = async (token, category) => {
  const locale = await AsyncStorage.getItem('locale')
  return axios.get(`${BASE_URL}/api/v1/problem/items?category=${category}`, {
    headers: {
      'Authorization': token,
      'language': locale
    },
  }).then((response) => {
    return response.data.data
  }).catch((error) => {
    console.log(error)
  });
}

export const sendMessage = async (token, {image, text}) => {
  let name = image?.uri?.split('/')?.pop()
  let match = /\.(\w+)$/.exec(name);
  let type = match ? `image/${match[1]}` : `image`;
  const formData = new FormData();
  
  if (image) {
    formData.append('image', {
      name: name,
      type: type,
      uri: image?.uri
    })
  }
  console.log('image', {
    name: name,
    type: type,
    uri: image?.uri
  })
  formData.append('text', text)
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/api/v1/chat/messages/send`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token,
      'language': locale
    },
  }).then((response) => {
    console.log('new message', response.data)
    return response.data.data
  }).catch((error) => {
    console.log(error)
  });
}