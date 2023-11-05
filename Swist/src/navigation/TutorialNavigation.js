import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Helmet from "../screens/safety/Helmet";
import CheckScooter from "../screens/safety/CheckScooter";
import FollowRules from "../screens/safety/FollowRules";
import DoNotDriveInBadWeather from "../screens/safety/DoNotDriveInBadWeather";
import StayAlerted from "../screens/safety/StayAlerted";
import DoNotDriveIntoxicated from "../screens/safety/DoNotDriveIntoxicated";
import Welcome from "../screens/tutorial/Welcome";
import FindFreeScooter from "../screens/tutorial/FindFreeScooter";
import StartTheRide from "../screens/tutorial/StartTheRide";
import FirstRide from "../screens/tutorial/FirstRide";
import Breaking from "../screens/tutorial/Breaking";
import UseBikeLine from "../screens/tutorial/UseBikeLine";
import ParkingSpot from "../screens/tutorial/ParkingSpot";
import Parking from "../screens/tutorial/Parking";
import TakePhoto from "../screens/tutorial/TakePhoto";
import Safety from "../screens/tutorial/Safety";
import GreatJob from "../screens/tutorial/GreatJob";
const Stack = createStackNavigator();
const TutorialNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={'FindFreeScooter'} screenOptions={{
      headerShown: false
    }}>


      <Stack.Screen name="FindFreeScooter" component={FindFreeScooter}/>
      <Stack.Screen name="StartTheRide" component={StartTheRide}/>
      <Stack.Screen name="FirstRide" component={FirstRide}/>
      <Stack.Screen name="Breaking" component={Breaking}/>
      <Stack.Screen name="UseBikeLine" component={UseBikeLine}/>
      <Stack.Screen name="ParkingSpot" component={ParkingSpot}/>
      <Stack.Screen name="Parking" component={Parking}/>
      <Stack.Screen name="TakePhoto" component={TakePhoto}/>
      <Stack.Screen name="Safety" component={Safety}/>
      <Stack.Screen name="GreatJob" component={GreatJob}/>




    </Stack.Navigator>
  );
};

export default TutorialNavigation;
