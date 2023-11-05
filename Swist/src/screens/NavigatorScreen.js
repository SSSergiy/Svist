import React, { useEffect } from "react";
import { Drawer } from "../navigation/Navigation";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useAuth } from "../provider/AuthProvider";
import AuthNavigation from "../navigation/AuthNavigation";
import { Image, Text, View } from "react-native";
import { normalize } from "../responsive/fontSize";
import { useDispatch, useSelector } from "react-redux";
import checkConnection from "../helpers/checkConnection";
import LoadingModal from "../components/LoadingModal";

const NavigatorScreen = () => {
  const { isAuth, appToken } = useAuth();
  const dispatch = useDispatch();
  const { isConnectedError, isConnectedErrorOpen } = useSelector(
    (state) => state.ride
  );

  useEffect(() => {
    const interval = setInterval(() => {
      checkConnection(dispatch);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [isConnectedError, isConnectedErrorOpen]);

  return !!appToken ? (
    <>
      {isConnectedError || isConnectedErrorOpen ? <LoadingModal /> : null}
      <NavigationContainer
        linking={{
          prefixes: ["example://"],
          config: {
            screens: {
              Notifications: "notifications",
            },
          },
        }}
      >
        {isAuth ? <Drawer /> : <AuthNavigation />}
      </NavigationContainer>
    </>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FE7B01",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../assets/loadingAnimation.gif")}
        style={{ height: normalize(150), width: normalize(250) }}
      />
    </View>
  );
};

export default NavigatorScreen;
