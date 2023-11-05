import React, { useEffect, useRef, useState } from "react";
import DrawerMenuButton from "../components/DrawerMenuButton";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  BackHandler,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { normalize } from "../responsive/fontSize";
import MiniEndRide from "../../assets/miniEndRide.svg";
import MiniSamokat from "../../assets/miniSamokat.svg";
import Wallet from "../../assets/wallet.svg";
import Routes from "../../assets/routes.svg";
import BadRide from "../../assets/badRide.svg";
import GoodRide from "../../assets/goodRide.svg";
import Min from "../../assets/min.svg";
import { getCurrentTrip, setRatingTrip } from "../api/scooterApi";
import { useAuth } from "../provider/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import PlayIcon from "../../assets/playIcon.svg";
import { GT } from "../constants/fonts";
import OutZoom from "../../assets/outZoom.svg";
import resultRideIcon from "../../assets/resultRideIcon.png";
import ResultRideIcon from "../../assets/resultRideIcon.svg";
import { getPromoMinutes } from "../api/promocodesApi";
import LoadingModal from "../components/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setPicture,
  setFreeMinutes,
  setSelectScooter,
} from "../redux/rideReducer";

const ResultScreen = () => {
  const [openResult, setOpenResult] = useState(false);
  const { picture, selectScooter, endRideDate, coordinates } = useSelector(
    (state) => state.ride
  );
  const [pauseTime, setPauseTime] = useState(0);
  const [rideTime, setRideTime] = useState(0);
  const [tripSum, setTripSum] = useState(0);
  const [distance, setDistance] = useState(0);
  const dispatch = useDispatch();

  const { authToken, i18n } = useAuth();
  const navigation = useNavigation();
  let mapRef = useRef();
  useEffect(() => {
    mapRef?.current?.fitToCoordinates(
      [
        {
          latitude: selectScooter?.latitude,
          longitude: selectScooter?.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        {
          latitude: selectScooter?.start_latitude,
          longitude: selectScooter?.start_longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
      ],
      {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      }
    );
    // BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    // return () => {
    //   BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    // };
  }, []);

  useEffect(() => {
    getPromoMinutes(authToken)
      .then((data) => dispatch(setFreeMinutes(data?.totalMinutes)))
      .catch((err) => console.error(err));

    if (!!navigation.isFocused()) {
      setOpenResult(true);
    } else {
      setOpenResult(false);
    }
  }, [navigation.isFocused()]);

  function handleBackButtonClick() {
    dispatch(setPicture({}));
    dispatch(setSelectScooter({}));
    navigation.navigate("MainScreen");
    return true;
  }

  const sendRatingTrip = (rating, isBadRide) => {
    if (isBadRide) {
      navigation.navigate("ReportProblemInitial");
    } else {
      dispatch(setSelectScooter({}));
      navigation.navigate("MainScreen");
    }
    setRatingTrip(
      authToken,
      selectScooter?.tripId || selectScooter?.id,
      rating,
      picture
    )
      .then((res) => {
        if (res?.data?.result === "success") {
          dispatch(setPicture({}));
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCurrentTrip(authToken).then((res) => {
      setPauseTime(res?.duration_pause || 0);
      setRideTime(res?.duration || 0);
      !!res?.trip_sum && setTripSum(res?.trip_sum);
      !!res?.distance_formated && setDistance(res?.distance_formated);
    });
  }, []);

  return (
    <View style={styles.container}>
      <DrawerMenuButton />
      {/*{loading&&<LoadingModal/>}*/}
      {selectScooter?.latitude && (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          ref={mapRef}
          scrollEnabled={false}
          rotateEnabled={false}
          initialRegion={
            !!coordinates?.latitude && !!coordinates?.longitude
              ? {
                  latitude: parseFloat(coordinates?.latitude || 0),
                  longitude: parseFloat(coordinates?.longitude || 0),
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }
              : {
                  latitude: parseFloat(selectScooter?.start_latitude || 0),
                  longitude: parseFloat(selectScooter?.start_longitude || 0),
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }
          }
        >
          {selectScooter?.start_latitude && (
            <Marker
              coordinate={{
                latitude: parseFloat(selectScooter?.start_latitude || 0),
                longitude: parseFloat(selectScooter?.start_longitude || 0),
              }}
            >
              <OutZoom />
            </Marker>
          )}
          {selectScooter?.latitude !== selectScooter?.start_latitude &&
            selectScooter?.longitude !== selectScooter?.start_longitude && (
              <Marker
                coordinate={{
                  latitude: parseFloat(selectScooter?.latitude || 0),
                  longitude: parseFloat(selectScooter?.longitude || 0),
                }}
              >
                <ResultRideIcon />
              </Marker>
            )}
        </MapView>
      )}
      <View style={styles.resultBlock}>
        <View style={{ padding: normalize(24), paddingBottom: normalize(30) }}>
          <Text
            style={styles.title}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
            {i18n.t("yourRideHasEnded")}
          </Text>
          <Text
            style={styles.text}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
            {endRideDate}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginTop: normalize(30),
            }}
          >
            <MiniSamokat width={normalize(31)} height={normalize(24)} />

            <View style={{ width: "80%" }}>
              <View
                style={{ width: "100%", height: 1, backgroundColor: "white" }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...styles.text, fontSize: normalize(12) }}>
                  {i18n.t("pickUp")}
                </Text>
                <Text style={{ ...styles.text, fontSize: normalize(12) }}>
                  {i18n.t("endRide")}
                </Text>
              </View>
            </View>
            <MiniEndRide width={normalize(31)} height={normalize(24)} />
          </View>
          <View
            style={{ ...styles.rowContainer, justifyContent: "space-between" }}
          >
            <View style={{ ...styles.rowContainer, marginTop: normalize(30) }}>
              <PlayIcon style={{ marginRight: normalize(18) }} />
              <Text
                style={styles.number}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
              >
                {Math.floor(rideTime / 60)}:
                {Math.floor(rideTime % 60) < 10
                  ? `0${Math.floor(rideTime % 60)}`
                  : `${Math.floor(rideTime % 60)}`}{" "}
                <Text style={{ ...styles.text }}> {i18n.t("min")}.</Text>
              </Text>
            </View>

            <View style={{ ...styles.rowContainer, marginTop: normalize(30) }}>
              <Wallet />
              <Text
                style={{ ...styles.number, marginLeft: normalize(18) }}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
              >
                {selectScooter?.trip_sum || tripSum}
                <Text style={{ ...styles.text }}> €</Text>
              </Text>
            </View>
          </View>
          <View
            style={{ ...styles.rowContainer, justifyContent: "space-between" }}
          >
            <View style={{ ...styles.rowContainer, marginTop: normalize(30) }}>
              <Min style={{ marginRight: normalize(18) }} />
              <Text
                style={styles.number}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
              >
                {Math.floor(pauseTime / 60)}:
                {Math.floor(pauseTime % 60) < 10
                  ? `0${Math.floor(pauseTime % 60)}`
                  : `${Math.floor(pauseTime % 60)}`}{" "}
                <Text style={{ ...styles.text }}> {i18n.t("min")}.</Text>
              </Text>
            </View>
            <View style={{ ...styles.rowContainer, marginTop: normalize(30) }}>
              <Routes />
              <Text
                style={{ ...styles.number, marginLeft: normalize(18) }}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
              >
                {selectScooter?.distance_formated || distance}
                <Text style={{ ...styles.text }}> {i18n.t("km")}.</Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.secondBlock}>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => {
              sendRatingTrip(2, true);
            }}
          >
            <BadRide />
            <Text style={styles.buttonText}>{i18n.t("badRide")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center", marginLeft: normalize(24) }}
            onPress={() => {
              sendRatingTrip(5, false);
            }}
          >
            <GoodRide />
            <Text style={styles.buttonText}>{i18n.t("goodRide")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "35%",
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resultBlock: {
    backgroundColor: "#FE7B01",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "65%",
    zIndex: 1000,
  },
  title: {
    fontSize: normalize(24),
    fontFamily: GT,
    fontWeight: "500",
    color: "white",
  },
  text: {
    color: "white",
    fontSize: normalize(16),
  },
  number: {
    fontSize: normalize(32),
    fontWeight: "500",
    color: "white",
  },
  secondBlock: {
    backgroundColor: "white",
    width: "100%",
    paddingLeft: normalize(87),
    paddingRight: normalize(87),
    paddingTop: normalize(56),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: normalize(140),
  },
  buttonText: {
    fontSize: normalize(12),
    fontWeight: "700",
    fontFamily: GT,
  },
});
export default ResultScreen;
