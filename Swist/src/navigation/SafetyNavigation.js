import React from 'react';
import ProfileScreen from "../screens/profile/ProfileScreen/ProfileScreen";
import PersonalInfoScreen from "../screens/profile/PersonalInfoScreen/PersonalInfoScreen";
import {createStackNavigator} from "@react-navigation/stack";
import Helmet from "../screens/safety/Helmet";
import CheckScooter from "../screens/safety/CheckScooter";
import FollowRules from "../screens/safety/FollowRules";
import DoNotDriveInBadWeather from "../screens/safety/DoNotDriveInBadWeather";
import StayAlerted from "../screens/safety/StayAlerted";
import DoNotDriveIntoxicated from "../screens/safety/DoNotDriveIntoxicated";
const Stack = createStackNavigator();
const SafetyNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={'Helmet'} screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Helmet" component={Helmet}/>
      <Stack.Screen name="CheckScooter" component={CheckScooter}/>
      <Stack.Screen name="FollowRules" component={FollowRules}/>
      <Stack.Screen name="DoNotDrive" component={DoNotDriveInBadWeather}/>
      <Stack.Screen name="StayAlerted" component={StayAlerted}/>
      <Stack.Screen name="DoNotDriveIntoxicated" component={DoNotDriveIntoxicated}/>



    </Stack.Navigator>
  );
};

export default SafetyNavigation;
