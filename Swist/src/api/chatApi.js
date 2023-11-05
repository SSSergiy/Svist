import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {BASE_URL} from "./apiKeys";

export const getChat=async (token,page) => {
  console.log('chat',page)
  const locale = await AsyncStorage.getItem('locale')
  return axios.get(`${BASE_URL}/api/v1/chat/messages?page=${page}`, {
    headers: {
      'Authorization': token,
      'language': locale
    },
  }).then((response) => {
    
    return response.data
  }).catch((error) => {
    console.log('getMessages:', error?.response)
  });
}
export const sendMessage = async (token, text, image) => {
  const locale = await AsyncStorage.getItem('locale')
  let name = image?.uri?.split('/')?.pop()
  let match = /\.(\w+)$/.exec(name);
  let type = match ? `image/${match[1]}` : `image`;
  const formData = new FormData();
  formData.append('text', text)
  !!image&&formData.append('image', {
    name: name,
    type: type,
    uri: image?.uri
  })
  return axios.post(`${BASE_URL}/api/v1/chat/messages/send`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'access-token': token,
      'language': locale
    },
  }).then((response) => {
    
    return response.data
  }).catch((error) => {
    return error
  });
}
