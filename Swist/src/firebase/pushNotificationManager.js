import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "@react-native-firebase/app";
import { safeFirebaseToken } from "../api/authApi";

const FBInit = () => {
  if (!firebase.apps.length) {
    firebase
      .initializeApp({
        // apiKey: "AIzaSyAf6lzuq0ZNHSE-6IyzzIFZ9pqJUyqY98I",// 1 ios
        apiKey: "AIzaSyB_YVakCLFLVOkF_skn1dXOFxgkE8-f3rA", // 2 android
        // apiKey: "36346fb80c837711feffb50789dd729638df607b", // 3 firebase service key
        authDomain: "firebaseapp.com",
        projectId: "svist-491ea",
        storageBucket: "svist-491ea.appspot.com",
        messagingSenderId: "814069360167",
        appId: "1:814069360167:ios:af7b3fb503f162308c5002",
        databaseURL:
          "https://scooters2-default-rtdb.europe-west1.firebasedatabase.app",
      })
      .then((res) => console.log("firebase.initializeApp"))
      .catch((err) => console.error("firebase.initializeApp: ", err));
  }
};

const GetTokens = async () => {
  try {
    let fcmtoken = await messaging().getToken();
    let authToken = await AsyncStorage.getItem("auth");
    authToken &&
      fcmtoken &&
      safeFirebaseToken(fcmtoken, authToken).then((res) => {
        console.log("safeFirebaseToken,fcmtoken, authToken::::");
      });
  } catch (error) {
    console.error(error);
  }
};

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    await FBInit();
    await GetTokens();
  }
};

export const NotificationListener = () => {
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
      }
    });
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
  });
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });
};
