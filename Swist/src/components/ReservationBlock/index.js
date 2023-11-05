import React, { useEffect, useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../../responsive/fontSize";
import reserveSamokat from "../../../assets/reserveSamokat.png";
import TimerBlock from "../../../assets/timerBlock.svg";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import ReserveButton from "../../../assets/reserveButton.svg";
import { useAuth } from "../../provider/AuthProvider";
import { styles } from "./styles";
import ErrorModal from "../ErrorModal/ErrorModal";
import { useNavigation } from "@react-navigation/native";
import { GT } from "../../constants/fonts";
import BackgroundTimer from "react-native-background-timer";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setReservation, setSecondsReserve } from "../../redux/rideReducer";

const ReservationBlock = ({
  reservation,
  errorOpen,
  setErrorOpen,
  selectScooter,
  stopReservation,
  cancel,
  timeout,
  // setCancelPress,
  isConnectedError,
}) => {
  const navigation = useNavigation();
  const { i18n } = useAuth();
  const { costSettings, secondsReserve } = useSelector((state) => state.ride);
  const [currentTime, setCurrentTime] = useState(secondsReserve);
  const dispatch = useDispatch();

  useEffect(() => {
    let myIntervalForRide = null;
    if (reservation && !errorOpen && !timeout && currentTime > 0) {
      myIntervalForRide = BackgroundTimer.runBackgroundTimer(() => {
        setCurrentTime((currentTime) => currentTime - 1);
      }, 1000);
      return () => {
        BackgroundTimer.stopBackgroundTimer(myIntervalForRide);
      };
    }
    // if (currentTime === 0) {
    // }
    if (isConnectedError) {
      // setCancelPress(true);
      stopReservation(false);
    }
  }, [reservation]);

  useEffect(() => {
    dispatch(setSecondsReserve(currentTime));
    if (currentTime === 0) {
      // setCancelPress(true);
      stopReservation(true);
      dispatch(setReservation(false));
    }
  }, [currentTime]);

  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          ...styles.rowContainer,
          padding: normalize(24),
          paddingTop: 0,
          paddingBottom: normalize(15),
        }}
      >
        <AntDesign
          name={"clockcircleo"}
          style={{ fontSize: normalize(24), color: "white" }}
        />
        <Text style={styles.ongoingText}>{i18n.t("reservationOngoing")}</Text>
      </View>
      <View style={styles.reserveBlock}>
        {errorOpen && (
          <ErrorModal
            isOpen={errorOpen}
            setIsOpen={setErrorOpen}
            errorText={"Reservation stop Error"}
          />
        )}
        <View style={styles.reserveRow}>
          <View style={styles.rowContainer}>
            <Image source={reserveSamokat} style={styles.scooterImg} />
            <View style={{ marginLeft: normalize(10) }}>
              <Text style={styles.reserveTitle}>
                {selectScooter?.maximum_distance || "25"} {i18n.t("km")}
              </Text>
              {selectScooter?.name_scooter && (
                <Text style={{ fontSize: normalize(12) }}>
                  {selectScooter?.name_scooter[0]}-XXX
                  {selectScooter?.name_scooter.slice(-2)}
                </Text>
              )}
              {selectScooter?.scooter_name && (
                <Text style={{ fontSize: normalize(12) }}>
                  {selectScooter?.scooter_name[0]}-XXX
                  {selectScooter?.scooter_name.slice(-2)}
                </Text>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={{
              ...styles.screenButton,
              backgroundColor: "#F7F7F7",
              marginLeft: normalize(43),
            }}
          >
            <Ionicons name={"notifications-outline"} size={normalize(24)} />
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: normalize(10),
            }}
          >
            <TimerBlock />
            {secondsReserve >= 0 ? (
              <Text
                style={{
                  ...styles.reserveTitle,
                  color: "white",
                  fontSize: normalize(32),
                  position: "absolute",
                }}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {Math.floor(currentTime / 60)}:
                {Math.floor(currentTime % 60) < 10
                  ? `0${Math.floor(currentTime % 60)} `
                  : `${Math.floor(parseInt(currentTime) % 60)} `}
              </Text>
            ) : (
              <Text
                style={{
                  ...styles.reserveTitle,
                  color: "white",
                  fontSize: normalize(32),
                  position: "absolute",
                }}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {currentTime}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.stopReserveButton}
          onPress={() => {
            // setCancelPress(true);
            stopReservation(false);
          }}
        >
          <ReserveButton width={"100%"} height={normalize(56)} />
          <Text style={styles.cancelText}>{i18n.t("cancelReservation")}</Text>
        </TouchableOpacity>
        <View
          style={{
            ...styles.rowContainer,
            marginTop: normalize(15),
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: normalize(12),
              marginRight: normalize(19),
            }}
          >
            {i18n.t("unlock")}
            {costSettings?.unlock_cost}€
          </Text>
          <Text style={{ fontSize: normalize(12) }}>
            {costSettings?.cost_per_minute}€ / {i18n.t("min")}.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReservationBlock;
