import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import BackgroundTimer from "react-native-background-timer";
import { normalize } from "../../responsive/fontSize";
import RideStatus from "../statusHeaders/RideStatus";
import PauseRideStatus from "../statusHeaders/PauseRideStatus";
import DangerRideStatus from "../statusHeaders/DangerRideStatus";
import SlowRideStatus from "../statusHeaders/SlowRideStatus";
import ParkingRideStatus from "../statusHeaders/ParkingRideStatus";
import ConnectionErrorStatus from "../statusHeaders/ConnectionErrorStatus";
import reserveSamokat from "../../../assets/reserveSamokat.png";
import MainButton from "../../../assets/mainButton.svg";
import PauseBlock from "../../../assets/pauseBlock.svg";
import ActiveStatus from "../../../assets/activeStatus.svg";
import SlowStatus from "../../../assets/slowStatus.svg";
import PauseStatus from "../../../assets/pauseStatus.svg";
import DangerStatus from "../../../assets/dangerStatus.svg";
import StartRideButton from "../../../assets/startRideButton.svg";
import BlackStatus from "../../../assets/blackStatus2.svg";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FirstPauseModal from "../FirstPauseModal";
import DangerZoneInfoModal from "../DangerZoneInfoModal";
import ReserveButton from "../../../assets/reserveButton.svg";
import ParkingZoneInfoModal from "../ParkingZoneInfoModal";
import { styles } from "./styles";
import ErrorModal from "../ErrorModal/ErrorModal";
import { useAuth } from "../../provider/AuthProvider";
import BlackRideStatus from "../statusHeaders/BlackRideStatus";
import InputLineBrown from "../../../assets/inputLineBrown.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setRideTime,
  setStartRide,
  setEndRide,
  setPauseTime,
  setDangerZoneOpen,
  setPauseRide,
} from "../../redux/rideReducer";

import ExitRide from "../../../assets/exitRide.svg";
import { useNavigation } from "@react-navigation/native";

const StartRide = ({
  scooter,
  errorOpen,
  setErrorOpen,
  error,
  rideStart,
  ridePause,
  rideContinue,
  rideStop,
  goToParkingOpen,
  setGoToParkingOpen,
  setFirstPauseOpen,
  firstPauseOpen,
  redZoneOpen,
  setRedZoneOpen,
  isFirstRide,
}) => {
  const {
    rideArea,
    startRide,
    pauseRide,
    isConnectedError,
    dangerZoneOpen,
    rideTime,
    costSettings,
  } = useSelector((state) => state.ride);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { i18n } = useAuth();
  const [openParkingInfo, setOpenParkingInfo] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let myIntervalForRide = null;
    if (startRide && !isConnectedError) {
      myIntervalForRide = BackgroundTimer.runBackgroundTimer(() => {
        setCurrentTime((currentTime) => parseInt(currentTime) + 1);
      }, 1000);
      return () => {
        BackgroundTimer.stopBackgroundTimer(myIntervalForRide);
      };
    }
  }, [startRide, pauseRide, isConnectedError]);

  useEffect(() => {
    !!rideTime && setCurrentTime(parseInt(rideTime));
  }, [rideTime]);

  useEffect(() => {
    !pauseRide && (!!rideTime || !!currentTime) && startRide && rideContinue();
  }, [startRide, rideTime, pauseRide]);

  return (
    <>
      {!startRide && isFirstRide && openParkingInfo && (
        <ParkingZoneInfoModal setIsOpen={setOpenParkingInfo} />
      )}
      {/*{goToParkingOpen && !dangerZoneOpen && !isConnectedError && (*/}
      {/*  <ParkingZoneInfoModal*/}
      {/*    isOpen={goToParkingOpen}*/}
      {/*    setIsOpen={setGoToParkingOpen}*/}
      {/*  />*/}
      {/*)}*/}
      <View style={{ width: "100%", marginBottom: normalize(40) }}>
        {firstPauseOpen && (
          <FirstPauseModal
            isOpen={firstPauseOpen}
            setIsOpen={setFirstPauseOpen}
          />
        )}

        {dangerZoneOpen && !goToParkingOpen && (
          <DangerZoneInfoModal
            isOpen={dangerZoneOpen}
            setIsOpen={setDangerZoneOpen}
            red={true}
            setStartRide={setStartRide}
          />
        )}
        {redZoneOpen && !goToParkingOpen && (
          <DangerZoneInfoModal
            isOpen={redZoneOpen}
            setIsOpen={setRedZoneOpen}
            red={true}
            setStartRide={setStartRide}
          />
        )}
        {startRide && !pauseRide && (
          <RideStatus batteryLevel={scooter?.battery_current_level} />
        )}
        {startRide && pauseRide && (
          <PauseRideStatus batteryLevel={scooter?.battery_current_level} />
        )}
        {startRide && rideArea === "danger" && !pauseRide && (
          <DangerRideStatus batteryLevel={scooter?.battery_current_level} />
        )}
        {startRide && rideArea === "slow" && !pauseRide && (
          <SlowRideStatus batteryLevel={scooter?.battery_current_level} />
        )}
        {startRide && rideArea === "black" && !pauseRide && (
          <BlackRideStatus batteryLevel={scooter?.battery_current_level} />
        )}
        {startRide && rideArea === "parking" && !pauseRide && (
          <ParkingRideStatus batteryLevel={scooter?.battery_current_level} />
        )}
        {startRide && isConnectedError && <ConnectionErrorStatus />}
        {errorOpen && (
          <ErrorModal
            setIsOpen={setErrorOpen}
            isOpen={errorOpen}
            errorText={error}
          />
        )}

        <View style={styles.reserveBlock}>
          <View style={styles.reserveRowBetween}>
            <View style={styles.rowContainer}>
              <Image
                source={reserveSamokat}
                style={{ width: normalize(48), height: normalize(48) }}
              />
              <View style={{ marginLeft: normalize(10) }}>
                <Text style={styles.reserveTitle}>
                  {scooter?.maximum_distance} {i18n.t("km")}
                </Text>
                <Text style={{ fontSize: normalize(12) }}>
                  {scooter?.name_scooter
                    ? `${
                        scooter?.name_scooter[0]
                      }-XXX${scooter?.name_scooter.slice(-2)}`
                    : null}
                </Text>
              </View>
            </View>

            {startRide && (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                {rideArea === "danger" ? (
                  <DangerStatus />
                ) : rideArea === "slow" ? (
                  <SlowStatus />
                ) : rideArea === "parking" || pauseRide ? (
                  <PauseStatus />
                ) : rideArea === "black" ? (
                  <BlackStatus />
                ) : (
                  <ActiveStatus />
                )}
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
                  {Math.floor(parseInt(currentTime) / 60)}:
                  {Math.floor(parseInt(currentTime) % 60) < 10
                    ? `0${Math.floor(parseInt(currentTime) % 60)}`
                    : `${Math.floor(parseInt(currentTime) % 60)}`}{" "}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.rowBetween}>
            {!startRide && !pauseRide && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.startButtonBlock,
                    alignSelf: setStartRide ? "flex-start" : "center",
                  }}
                  onPress={() => {
                    rideStop("exit");
                  }}
                >
                  <PauseBlock height={normalize(56)} width={normalize(72)} />
                  <ExitRide style={{ position: "absolute" }} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.startButtonBlock,
                    alignSelf: startRide ? "flex-start" : "center",
                  }}
                  onPress={() => {
                    scooter?.is_reserve || scooter?.is_been_reserved
                      ? rideStart(true)
                      : rideStart(false);
                  }}
                >
                  <StartRideButton height={normalize(56)} />
                  <Text style={styles.buttonText}>{i18n.t("startRide")}</Text>
                </TouchableOpacity>
              </View>
            )}
            {startRide && pauseRide === false && (
              <TouchableOpacity
                style={{
                  ...styles.startButtonBlock,
                  alignSelf: startRide ? "flex-start" : "center",
                }}
                onPress={() => {
                  rideStop();
                }}
              >
                <MainButton width={normalize(245)} height={normalize(56)} />
                <View
                  style={{
                    width: 18,
                    height: 18,
                    backgroundColor: "white",
                    position: "absolute",
                    left:
                      i18n.locale !== "sk"
                        ? i18n.locale === "ukr"
                          ? normalize(35)
                          : normalize(50)
                        : normalize(30),
                    borderRadius: 5,
                  }}
                />
                <Text
                  style={{
                    ...styles.buttonText,
                    color: "white",
                    right: i18n.locale !== "sk" ? normalize(57) : normalize(45),
                  }}
                >
                  {i18n.t("endRide")}
                </Text>
              </TouchableOpacity>
            )}

            {startRide && !pauseRide && (
              <TouchableOpacity
                style={{
                  ...styles.startButtonBlock,
                  alignSelf: setStartRide ? "flex-start" : "center",
                }}
                onPress={() => {
                  ridePause();
                }}
              >
                <PauseBlock height={normalize(56)} width={normalize(72)} />
                <FontAwesome
                  name={"pause"}
                  style={{
                    position: "absolute",
                    fontSize: normalize(24),
                    color: "#FE7B01",
                  }}
                />
              </TouchableOpacity>
            )}
            {pauseRide && (
              <TouchableOpacity
                style={{
                  ...styles.startButtonBlock,
                  alignSelf: startRide ? "flex-start" : "center",
                }}
                onPress={() => {
                  dispatch(setPauseRide(false));
                  // rideContinue();
                }}
              >
                <ReserveButton width={"100%"} height={normalize(56)} />
                <Text style={styles.buttonText}>
                  {i18n.t("continueWithRide")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              ...styles.rowContainer,
              marginTop: normalize(15),
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: normalize(12) }}>
              {i18n.t("unlock")} 0.00€
            </Text>
            <View>
              <InputLineBrown width={normalize(18)} height={normalize(18)} />
            </View>
            <Text style={{ fontSize: normalize(12) }}>
              {costSettings?.cost_per_minute
                ? costSettings?.cost_per_minute
                : "0.13"}
              € / {i18n.t("min")}.
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default StartRide;
