import { ACCESS_TOKEN, BASE_URL } from "./apiKeys";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const deleteProfile = async (id) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .delete(`${BASE_URL}/api/v1/profile/delete`, {
      headers: {
        Authorization: id,
        language: locale,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("delete", error);
      console.log("error?.response?.data", error?.response?.data);
      return error?.response?.data?.errors[0]?.message;
    });
};

export const loginApp = async () => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .post(
      `${BASE_URL}/api/v1/login-app`,
      {
        grant_type: "application",
        client_id: "seralist",
        client_secret: "cE8f5X5M5m",
      },
      {
        headers: {
          language: locale,
        },
      }
    )
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.log("login", error);
    });
};
export const safeFirebaseToken = (token, authToken) => {
  console.log(token, authToken);
  return axios
    .post(
      `${BASE_URL}/api/v1/save-firebase-token`,
      {
        fire_base_token: token,
      },
      {
        headers: {
          "device-id": 12,
          "access-token": authToken,
        },
      }
    )
    .then((response) => {
      console.log("save token", response?.data);
      return response?.data;
    })
    .catch((error) => {
      console.log("error", error);
      console.log(error);
    });
};
export const validationPhone = async (phone, token) => {
  // console.log(phone,token)
  const locale = await AsyncStorage.getItem("locale");
  console.log(locale);
  return axios
    .post(
      `${BASE_URL}/api/v1/validation-phone`,
      {
        phone_number: phone,
      },
      {
        headers: {
          "access-token": token,
          language: locale,
        },
      }
    )
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.log("validationPhone", error?.response?.data);
      if (error?.response?.data?.message) {
        return "Invalid number";
      } else return error?.response?.data?.errors[0]?.message;
    });
};
export const validationAppleGoogle = async (token, service) => {
  console.log(token);
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .post(
      `${BASE_URL}/api/v1/login`,
      {
        id_token: token,
        service: service,
      },
      {
        headers: {
          language: locale,
        },
      }
    )
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      if (error?.response?.data?.message) {
        return "Invalid login";
      } else return error?.response?.data?.errors[0]?.message;
    });
};
export const validationCode = async (phone, code, token) => {
  // console.log(phone, code, token);
  const locale = await AsyncStorage.getItem("locale");
  // console.log(locale);
  return axios
    .post(
      `${BASE_URL}/api/v1/validation-code`,
      {
        phone_number: phone,
        sms_code: code,
      },
      {
        headers: {
          "access-token": token,
          language: locale,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("validate-code:", error.response.data.errors[0].message);
      return error.response.data.errors[0].message;
    });
};
export const validationGoogleCode = async (phone, code, token, key) => {
  // console.log(phone, code, token, key);
  const locale = await AsyncStorage.getItem("locale");

  return axios
    .post(
      `${BASE_URL}/api/v1/validation-code`,
      {
        phone_number: phone,
        sms_code: code,
        auth_key: key,
      },
      {
        headers: {
          "access-token": token,
          language: locale,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data.errors[0].message;
    });
};
export const profileUpdate = async (name, surname, email, age, token) => {
  // console.log("age", email, age);
  const locale = await AsyncStorage.getItem("locale");

  return axios
    .put(
      `${BASE_URL}/api/v1/profile/update`,
      {
        name: name,
        surname: surname,
        confirmed_email: email,
        birth_date: age,
      },
      {
        headers: {
          Authorization: token,
          language: locale,
        },
      }
    )
    .then((response) => {
      // console.log(response.data.data)
      return response;
    })
    .catch((error) => {
      return error.response.data.errors[0].message;
    });
};
export const profileGoogleAgeUpdate = async (age, token) => {
  const locale = await AsyncStorage.getItem("locale");

  return axios
    .put(
      `${BASE_URL}/api/v1/profile/update`,
      {
        birth_date: age,
      },
      {
        headers: {
          Authorization: token,
          language: locale,
        },
      }
    )
    .then((response) => {
      // console.log(response.data.data)
      return response;
    })
    .catch((error) => {
      return error.response.data.errors[0].message;
    });
};
export const getProfileInfo = async (token) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .get(`${BASE_URL}/api/v1/profile/get-info`, {
      headers: {
        "access-token": token,
        language: locale,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("getProfileInfo:", error);
    });
};
export const createCard = async (token) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .post(
      `${BASE_URL}/api/v1/create-card`,
      {},
      {
        headers: {
          "access-token": token,
          language: locale,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("create-card:", error.response.data.errors);
      return error.response.data.errors;
    });
};
export const payTrip = async (id, token) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .post(
      `${BASE_URL}/api/v1/pay-trip`,
      {
        tripId: id,
        paymentMethod: "CRD",
      },
      {
        headers: {
          "access-token": token,
          language: locale,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error?.response?.data?.errors[0].message;
    });
};
export const setMainCard = async (id, token) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .post(
      `${BASE_URL}/api/v1/set-main-card`,
      {
        cardId: id,
      },
      {
        headers: {
          "access-token": token,
          language: locale,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error?.response?.data?.errors[0].message;
    });
};
export const profileGetInfo = (token) => {
  return axios
    .get(`${BASE_URL}/api/v1/profile/get-info`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      console.log(response.data.data);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getCards = async (token) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .get(`${BASE_URL}/api/v1/cards`, {
      headers: {
        Authorization: token,
        language: locale,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("getCards:", error);
    });
};
export const getCostSettings = (token) => {
  let locale = "";
  AsyncStorage.getItem("locale").then((res) => {
    locale = res;
  });
  return axios
    .get(`${BASE_URL}/api/v1/dashboard/cost-settings`, {
      headers: {
        Authorization: token,
        language: locale,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("getCostSettings", error?.response?.data?.errors[0].message);
    });
};
export const getQuestions = async (token) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .get(`${BASE_URL}/api/v1/questions`, {
      headers: {
        Authorization: token,
        language: locale,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("getQuestions:", error);
    });
};
export const getPrivacy = async (token) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .get(`${BASE_URL}/api/v1/politic`, {
      headers: {
        Authorization: token,
        language: locale,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("getPrivacy:", error);
    });
};
export const getTerms = async (token) => {
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .get(`${BASE_URL}/api/v1/services`, {
      headers: {
        Authorization: token,
        language: locale,
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("getTerms:", error);
    });
};

export const getCountryCodes = async (token) => {
  // console.log("token", token);
  const locale = await AsyncStorage.getItem("locale");
  return axios
    .get(`${BASE_URL}/api/v1/countries`, {
      headers: {
        Authorization: token,
        language: locale,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("getMessages:", error?.response);
    });
};

export const updateBeginnerMode = async (beginnerMode, token) => {
  const locale = await AsyncStorage.getItem("locale");

  return axios
    .put(
      `${BASE_URL}/api/v1/profile/update`,
      {
        beginner_mode: beginnerMode,
      },
      {
        headers: {
          Authorization: token,
          language: locale,
        },
      }
    )
    .then((response) => {
      // console.log(response.data.data)
      return response.data;
    })
    .catch((error) => {
      return error.response.data.errors[0].message;
    });
};

export const deleteCard = async (token, id) => {
  // console.log("del", token, id);
  const locale = await AsyncStorage.getItem("locale");
  const formData = new FormData();
  formData.append("cardId", id);
  return axios
    .post(`${BASE_URL}/api/v1/delete-card`, formData, {
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
      console.log("deleteCards:", error.response.data.errors[0].message);
      return error.response.data.errors[0].message;
    });
};
