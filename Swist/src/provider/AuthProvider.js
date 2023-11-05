import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCards, getCostSettings, loginApp } from "../api/authApi";
import { eng, sk, ukr } from "../localizations/localizations";
import { I18n } from "i18n-js";
import { ACCESS_TOKEN } from "../api/apiKeys";
import { NativeModules, Platform } from "react-native";
import { safeFirebaseToken } from "../api/authApi";
import messaging from "@react-native-firebase/messaging";
import Toast from "react-native-toast-message";

const AuthContext = React.createContext(null);
const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [googleToken, setGoogleToken] = useState("");
  const [appToken, setAppToken] = useState("");
  const [authKey, setAuthKey] = useState("");
  // const [costSettings, setCostSettings] = useState({});
  const [isAdded, setIsAdded] = useState(false);
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  const nativeLocale =
    deviceLanguage === "uk_UA"
      ? "ukr"
      : deviceLanguage === "sk_SK" || deviceLanguage === "sk_UA"
      ? "sk"
      : "eng";
  const [locale, setLocale] = useState(nativeLocale);
  const translations = {
    eng: eng,
    sk: sk,
    ukr: ukr,
  };
  const i18n = new I18n(translations);

  i18n.enableFallback = true;
  i18n.translations = { eng, sk, ukr };
  i18n.locale = locale;

  // useEffect(() => {
  //   setSeconds(costSettings?.max_reserve_minutes * 60);
  // }, [costSettings?.max_reserve_minutes]);

  useEffect(() => {
    // console.log(NativeModules.I18nManager.localeIdentifier);

    AsyncStorage.getItem("auth").then((res) => {
      if (res) {
        // requestUserPermission(res)
        // console.log(res);
        setAuthToken(res);
        setIsAuth(true);
        // getCostSettings(res).then(res => {
        //   // console.log(res.data)
        //   setCostSettings(res?.data)
        // })
      } else {
        setIsAuth(false);
      }
    });
    AsyncStorage.getItem("appToken").then((res) => {
      if (res) {
        // console.log("appToken", appToken);
        setAppToken(res);
      } else {
        loginApp()
          .then((res) => {
            // console.log('Token',res?.data)
            if (res?.data?.access_token) {
              setAppToken(res?.data?.access_token);
              AsyncStorage.setItem("appToken", res?.data?.access_token);
            } else setAppToken(ACCESS_TOKEN);
          })
          .catch((e) => {
            console.log("login", e);
          });
      }
    });
    // AsyncStorage.removeItem('locale')
    AsyncStorage.getItem("locale").then((res) => {
      // console.log("locale", locale);
      if (res) {
        if (res === "sk") {
          setLocale("sk");
        } else if (res === "eng") {
          setLocale("eng");
        } else if (res === "ukr") {
          setLocale("ukr");
        } else {
          setLocale("eng");
        }
      } else {
        // AsyncStorage.setItem('locale', 'eng')
        setLocale(nativeLocale);
      }
    });
  }, []);

  const exit = () => {
    // setName("");
    // setPhone("");
    // setEmail("");
    // setAge("");
    // setSurname("");
    AsyncStorage.removeItem("auth");
    setIsAuth(false);
  };
  return (
    <AuthContext.Provider
      value={{
        exit,
        i18n,
        locale,
        setLocale,
        isAuth,
        setIsAuth,
        authToken,
        setAuthToken,
        appToken,
        setAppToken,
        // costSettings,
        // setCostSettings,
        googleToken,
        setGoogleToken,
        // seconds,
        // setSeconds,
        authKey,
        setAuthKey,
        isAdded,
        setIsAdded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};

export default AuthProvider;
