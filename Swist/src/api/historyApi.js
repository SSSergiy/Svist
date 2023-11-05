import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {BASE_URL} from "./apiKeys";

export const getRideHistory = async (token,page) => {
  const locale = await AsyncStorage.getItem('locale')
  return axios.get(`${BASE_URL}/api/v1/history?page=${page}`, {
    headers: {
      'Authorization': token,
      'language': locale
    },
  }).then((response) => {

    return response?.data?.data
  }).catch((error) => {
    console.log('getHistory:', error.response.data)
  });
}
