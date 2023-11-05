import axios from "axios";
import { BASE_URL } from "./apiKeys";
import * as RNFS from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getScooters = (token) => {
  const locale = AsyncStorage.getItem("locale").then((res) => {
    return res;
  });
  return axios
    .get(`${BASE_URL}/api/v1/dashboard/get-scooters`, {
      headers: {
        Authorization: token,
        language: locale,
      },
    })
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      console.log("getScooters:", error?.response?.data);
    });
};
export const getPolygons = async (token, coordinates) => {
  const locale = await AsyncStorage.getItem("locale");
  const params = {
    latitude: coordinates.latitude,
    latitudeDelta: coordinates.latitudeDelta,
    longitude: coordinates.longitude,
    longitudeDelta: coordinates.longitudeDelta,
  };
  return axios
    .get(`${BASE_URL}/api/v1/polygons-by-rectangle`, {
      params,
      headers: {
        "access-token": token,
        language: locale,
      },
    })
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      console.log("getPolygons:", error?.response?.data);
    });
};
export const getCurrentTrip = async (token) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .get(`${BASE_URL}/api/v1/get-current-trip`, {
      headers: {
        Authorization: token,
        language: locale,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return error?.response?.data?.errors[0]?.message;
    });
};
export const createTrip = async (token, name) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .post(
      `${BASE_URL}/api/v1/create-trip`,
      {
        name: name,
      },
      {
        headers: {
          "access-token": token,
          language: locale,
        },
      }
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return error?.response?.data?.errors[0]?.message;
    });
};
export const startTrip = async (token, id, isReserve) => {
  const locale = await AsyncStorage.getItem("locale");
  const formData = new FormData();
  formData.append("tripId", id);
  formData.append("isReserve", isReserve || 0);

  return axios
    .post(`${BASE_URL}/api/v1/start-trip`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "access-token": token,
        language: locale,
      },
    })
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      return error?.response?.data?.errors[0]?.message;
    });
};
export const startReservedTrip = async (token, id) => {
  const locale = await AsyncStorage.getItem("locale");
  const formData = new FormData();
  formData.append("tripId", id);

  return axios
    .post(`${BASE_URL}/api/v1/start-reserved-trip`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "access-token": token,
        language: locale,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return error.response.data.errors[0].message;
    });
};
export const pauseTrip = async (token, id) => {
  const locale = await AsyncStorage.getItem("locale");
  const formData = new FormData();
  formData.append("tripId", id);
  return axios
    .post(`${BASE_URL}/api/v1/pause-trip`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "access-token": token,
        language: locale,
      },
    })
    .then((response) => {
      console.log("---pause trip---");
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export const continueTrip = async (token, id) => {
  const locale = await AsyncStorage.getItem("locale");
  const formData = new FormData();
  formData.append("tripId", id);
  return axios
    .post(`${BASE_URL}/api/v1/continue-trip`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "access-token": token,
        language: locale,
      },
    })
    .then((response) => {
      console.log("---continue trip---");
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export const stopTrip = async (token, id, latitude, longitude) => {
  console.log("stopTrip", id);
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .post(
      `${BASE_URL}/api/v1/stop-trip`,
      {
        tripId: id,
        latitude: latitude,
        longitude: longitude,
        request_id: "test",
      },
      {
        headers: {
          Authorization: token,
          language: locale,
        },
      }
    )
    .then((response) => {
      console.log("---stop trip---");
      return response.data.data;
    })
    .catch((error) => {
      console.log("---stop trip---ERROR-----", error.response?.data?.errors[0]);
      return error.response?.data?.errors[0]?.message;
    });
};
export const setRatingTrip = async (token, id, rating, image) => {
  const locale = await AsyncStorage.getItem("locale");
  // const imageData = image.base64
  // const imagePath = `${RNFS.cacheDirectory}${imageData.split('/')[2]}.jpg`;
  // console.log(token,id,rating,imagePath)
  // RNFS.writeAsStringAsync(imagePath, imageData, {
  //   encoding: RNFS.EncodingType.Base64,
  // })
  //   .then(() => console.log('Image converted to jpg and saved at ' + imagePath));
  let name = image?.uri?.split("/")?.pop();
  let match = /\.(\w+)$/.exec(name);
  let type = match ? `image/${match[1]}` : `image`;
  const formData = new FormData();
  formData.append("tripId", id);
  formData.append("rating", rating);
  formData.append("image", {
    name: name,
    type: type,
    uri: image?.uri,
  });
  return axios
    .post(`${BASE_URL}/api/v1/set-rating-trip`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "access-token": token,
        language: locale,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export const getCloseScooter = (coords, token) => {
  return axios
    .get(
      `${BASE_URL}/api/v1/dashboard/near-scooters?XDEBUG_SESSION_START=PHPSTORM`,
      {
        params: {
          latitude: coords?.latitude,
          longitude: coords?.longitude,
        },
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getDebts = async (token) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .get(`${BASE_URL}/api/v1/has-debt`, {
      headers: {
        Authorization: token,
        language: locale,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("getDebts:", error);
    });
};
export const isRange = async (token, coordinates) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .get(`${BASE_URL}/api/v1/dashboard/is-range`, {
      params: {
        latitude: coordinates?.latitude,
        longitude: coordinates?.longitude,
      },
      headers: {
        Authorization: token,
        language: locale,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("is range: ", error.response.data.errors[0].message);
    });
};
export const beepScooter = async (token, id) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .get(`${BASE_URL}/api/v1/dashboard/beep/${id}`, {
      headers: {
        Authorization: token,
        language: locale,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("is range: ", error.response.data.errors[0].message);
    });
};
