import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {BASE_URL} from "./apiKeys";

export const getPromoCodes = async (token) => {
  const locale = await AsyncStorage.getItem('locale')
  return axios.get(`${BASE_URL}/api/v1/promocode`, {
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

export const getPromoMinutes = async (token) => {
  return axios.get(`${BASE_URL}/api/v1/promocode/get-total-minutes`, {
    headers: {
      'Authorization': token
    },
  }).then((response) => {
    return response.data.data
  }).catch((error) => {
    console.log(error)
  });
}


export const activatePromoCode = async (token, promoId) => {
  return axios.post(`${BASE_URL}/api/v1/promocode/activate`, {data: [promoId]}, {
    headers: {
      'Authorization': token
    },
  }).then((response) => {
    return response.data.data
  }).catch((error) => {
    console.log(error)
  });
}

export const findPromoCode = async (token, promoCode) => {
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/api/v1/promocode/find`, {name: promoCode}, {
    headers: {
      'Authorization': token,
      'language': locale
    },
  }).then((response) => {
    console.log('response.data', response.data)
    return response.data.data
  }).catch((error) => {
    return error
  });
}
