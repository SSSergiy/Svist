import * as Location from "expo-location";
import {
  setShowLocation,
  setCoordinates,
  setMapPermission,
} from "../redux/rideReducer";
import { defaultLocation } from "../constants/locations";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const getLocation = async (dispatch, mapPermission) => {
  let foregroundSubscription = null;
  const { granted } = await Location.getForegroundPermissionsAsync();
  // console.log("granted :::: ", granted);
  if (!granted) {
    // await Linking.openURL('App-Prefs:LOCATION_SERVICES')
    // await Linking.openSettings();
    let { status } = await Location.requestForegroundPermissionsAsync();
    dispatch(setMapPermission(!mapPermission));
    // console.log('status::::', status)
  }

  // Location.getCurrentPositionAsync({
  //   accuracy: Location.Accuracy.Low,
  // })
  Location.getLastKnownPositionAsync({})
    .then(async (location) => {
      // console.log("getLocation 3", location);
      if (!!location) {
        let normalizedLocations = {
          latitude: parseFloat(location?.coords?.latitude),
          longitude: parseFloat(location?.coords?.longitude),
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
        dispatch(setCoordinates(normalizedLocations));
        await AsyncStorage.setItem(
          "currentPosition",
          JSON.stringify(normalizedLocations)
        );

        foregroundSubscription?.remove();
        foregroundSubscription = Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            maximumAge: 10000,
          },
          (location) => {
            dispatch(
              setCoordinates({
                latitude: parseFloat(location?.coords?.latitude),
                longitude: parseFloat(location?.coords?.longitude),
              })
            );
          }
        );
        dispatch(setShowLocation(true)); ///// check
      } else {
        dispatch(setCoordinates(defaultLocation));
      }
    })
    .catch((e) => {
      console.log("ERROR::: ", e);
      AsyncStorage.getItem("currentPosition").then((localCoords) => {
        if (!!localCoords) {
          let _localCoords = JSON.parse(localCoords);
          let normalizedLocations = {
            latitude: parseFloat(_localCoords?.latitude),
            longitude: parseFloat(_localCoords?.longitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };
          !!localCoords && dispatch(setCoordinates(normalizedLocations));
        } else {
          console.log("getLocation 6");
          dispatch(setCoordinates(defaultLocation));
        }
      });
    });
};

export default getLocation;
