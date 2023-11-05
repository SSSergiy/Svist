import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogInScreen from "../screens/auth/LogInScreen";
import NumCodeScreen from "../screens/auth/NumCodeScreen";
import AboutScreen from "../screens/auth/AboutScreen";
import FillEmailScreen from "../screens/auth/FillEmailScreen";
import FillAgeScreen from "../screens/auth/FillAgeScreen";
import AddPaymentScreen from "../screens/auth/AddPaymentScreen";
import GoogleInScreen from "../screens/auth/GoogleInScreen";
import GoogleNumCodeScreen from "../screens/auth/GoogleNumCodeScreen";
import GoogleFillAgeScreen from "../screens/auth/GoogleFillAgeScreen";
import BeginnerModeNavigation from "./BeginnerModeNavigation";

const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={"LogInScreen"}>
      <Stack.Screen
        name="LogInScreen"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GoogleInScreen"
        component={GoogleInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NumCodeScreen"
        component={NumCodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GoogleNumCodeScreen"
        component={GoogleNumCodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FillAgeScreen"
        component={FillAgeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GoogleFillAgeScreen"
        component={GoogleFillAgeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FillEmailScreen"
        component={FillEmailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPaymentScreen"
        component={AddPaymentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
