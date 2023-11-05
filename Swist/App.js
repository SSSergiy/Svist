import React, { useCallback, useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";

import AuthProvider from "./src/provider/AuthProvider";
import SvistProvider from "./src/provider/SvistProvider";
import { store } from "./src/redux/store";

import { bootstrap } from "./src/utils/bootstrap";

import messaging from "@react-native-firebase/messaging";
import * as SplashScreen from "expo-splash-screen";
import "react-native-gesture-handler";
import NavigatorScreen from "./src/screens/NavigatorScreen";
// import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
// import inAppMessaging from '@react-native-firebase/in-app-messaging';
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { GT } from "./src/constants/fonts";
import {
  NotificationListener,
  requestUserPermission,
} from "./src/firebase/pushNotificationManager";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    requestUserPermission();
    NotificationListener();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
      Toast.show({
        type: "success",
        // And I can pass any custom props I want
        text1: remoteMessage?.notification?.title,
        text2: remoteMessage?.notification?.body,
      });
      // new Notification(remoteMessage?.notification?.title, { body: remoteMessage?.notification?.body });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // const token = (await Notifications.getDevicePushTokenAsync()).data;
    // console.log('tok',token)
    // AsyncStorage.removeItem('token')
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        await bootstrap();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
      } catch (e) {
        // console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  // if (isLoading) return <AppLoading startAsync={bootstrap} onFinish={() => setIsLoading(false)}
  //                                   onError={(err) => console.log(err)}/>
  if (!appIsReady) {
    return null;
  }
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#FE7B01" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontFamily: GT,
          color: "black",
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.

      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthProvider>
        <SvistProvider>
          {/*<StatusBar hidden />*/}
          <Provider store={store}>
            <NavigatorScreen />
          </Provider>
          {/*<View style={{flex:1,backgroundColor:'red'}}></View>*/}
        </SvistProvider>
      </AuthProvider>
      {/*<Toast config={toastConfig} onPress={()=>{*/}
      {/*  Toast.hide()*/}
      {/*}} visibilityTime={3000}/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
