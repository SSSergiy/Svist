import * as React from "react";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainScreen from "../screens/MainScreen";
import { View } from "react-native";
import { normalize } from "../responsive/fontSize";
import ScannerScreen from "../screens/ScannerScreen";
import RideScreen from "../screens/RideScreen";
import CameraScreen from "../screens/CameraScreen";
import ResultScreen from "../screens/ResultScreen";
import AddNewCardScreen from "../screens/AddNewCardScreen";
import EndRideScreen from "../screens/EndRideScreen";
import DrawerContainer from "../components/DrawerContainer/DrawerContainer";
import PaymentScreen from "../screens/payment/PaymentScreen";
import SupportScreen from "../screens/SupportScreen";
import ProfileScreen from "../screens/profile/ProfileScreen/ProfileScreen";
import PersonalInfoScreen from "../screens/profile/PersonalInfoScreen/PersonalInfoScreen";
import QuestionsScreen from "../screens/QuestionsScreen";
import TermsScreen from "../screens/TermsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import AboutAppScreen from "../screens/AboutAppScreen";
import ChatScreen from "../screens/ChatScreen";
import ReportProblemInitial from "../screens/problem/ReportProblemInitial";
import Problems from "../screens/problem/Problems";
import ReportDamage from "../screens/problem/ReportDamage";
import Promocodes from "../screens/promocode/Promocodes";
import HistoryOfRides from "../screens/history/HistoryOfRides";
import HistoryInfo from "../screens/history/HistoryInfo";
import SafetyNavigation from "./SafetyNavigation";
import BeginnerModeNavigation from "./BeginnerModeNavigation";
import { useAuth } from "../provider/AuthProvider";
import SecurityCenterHighlight from "../screens/beginnerMode/SecurityCenterHighlight";
import TutorialNavigation from "./TutorialNavigation";
import Welcome from "../screens/tutorial/Welcome";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const Draw = createDrawerNavigator();
export const Drawer = ({ navigation }) => {
  return (
    <Draw.Navigator
      drawerContent={(props) => (
        <>
          <View {...props} style={{ flex: 1 }}>
            <DrawerContainer props={props} />
          </View>
        </>
      )}
      screenOptions={{
        useNativeDriver: true,
      }}
      defaultStatus="closed"
    >
      <Draw.Screen
        name="MainRoot"
        component={Navigation}
        options={{
          headerShown: false,
          useNativeDriver: true,
          title: "",
          headerStyle: {
            backgroundColor: "white",
            elevation: 0,
            width: normalize(97),
            marginTop: 48,
            height: 48,
            paddingLeft: 30,
            position: "absolute",
            zIndex: 100,
            top: 0,
            left: 0,
          },
        }}
      />
    </Draw.Navigator>
  );
};

export const Navigation = () => {
  const { isNewUser } = useSelector((state) => state.auth);
  return (
    <Stack.Navigator
      initialRouteName={isNewUser ? "Welcome" : "MainScreen"}
      // initialRouteName={'Tutorial'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
      <Stack.Screen name="RideScreen" component={RideScreen} />
      <Stack.Screen name="EndRideScreen" component={EndRideScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="AddNewCardScreen" component={AddNewCardScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
      <Stack.Screen name="QuestionsScreen" component={QuestionsScreen} />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen name="AboutAppScreen" component={AboutAppScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen
        name="ReportProblemInitial"
        component={ReportProblemInitial}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Problems"
        component={Problems}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReportDamage"
        component={ReportDamage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Promocodes"
        component={Promocodes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistoryOfRides"
        component={HistoryOfRides}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistoryInfo"
        component={HistoryInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SafetyScreen"
        component={SafetyNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
        name="Tutorial"
        component={TutorialNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BeginnerMode"
        component={BeginnerModeNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SecurityCenterHighlight"
        component={SecurityCenterHighlight}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
