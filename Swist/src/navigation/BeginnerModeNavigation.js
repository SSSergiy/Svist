import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Helmet from "../screens/safety/Helmet";
import CheckScooter from "../screens/safety/CheckScooter";
import FollowRules from "../screens/safety/FollowRules";
import DoNotDriveInBadWeather from "../screens/safety/DoNotDriveInBadWeather";
import StayAlerted from "../screens/safety/StayAlerted";
import DoNotDriveIntoxicated from "../screens/safety/DoNotDriveIntoxicated";
import BeginnerSafety from "../screens/beginnerMode/BeginnerSafety";
const Stack = createStackNavigator();
const BeginnerModeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={'BeginnerSafety'} screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="BeginnerSafety" component={BeginnerSafety}/>




    </Stack.Navigator>
  );
};

export default BeginnerModeNavigation;
