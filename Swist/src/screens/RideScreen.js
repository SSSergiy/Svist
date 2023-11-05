import React, { useEffect, useRef, useState } from "react";
import { AppState, StyleSheet, TouchableOpacity, View } from "react-native";
import { AnimatedRegion } from "react-native-maps";
import DrawerMenuButton from "../components/DrawerMenuButton";
import StartRide from "../components/StartRide";
import {
  continueTrip,
  createTrip,
  getCurrentTrip,
  pauseTrip,
  startReservedTrip,
  startTrip,
  stopTrip,
} from "../api/scooterApi";
import { useAuth } from "../provider/AuthProvider";
import LoadingModal from "../components/LoadingModal";
import { useNavigation } from "@react-navigation/native";
import {
  BLACK_ZONE,
  NORMAL_ZONE,
  PARKING_ZONE,
  RED_ZONE,
  SLOW_ZONE,
} from "../../assets/polygonColors";
import SocketIOClient from "socket.io-client";
import TrackerMap from "../components/TrackerMap/TrackerMap";
import moment from "moment";
import PushErrorModal from "../components/PushErrorModal/PushErrorModal";
import GpsLostModal from "../components/GpsLostModal";
import ParkingZoneInfoModal from "../components/ParkingZoneInfoModal";
import { BASE_URL } from "../api/apiKeys";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectScooter,
  setReservation,
  setRideArea,
  setRideTime,
  setStartRide,
  setPauseRide,
  setEndRide,
  setDangerZoneOpen,
  setRedZoneOpen,
  setEndRideDate,
  setSeconds,
} from "../redux/rideReducer";
import { defaultLocation } from "../constants/locations";
import { store } from "../redux/store";
import { normalize } from "../responsive/fontSize";
import BeginnerModeIcon from "../../assets/beginnerMode.svg";
import MuGeolocation from "../../assets/muGeolocation.svg";
import SecurityIcon from "../../assets/beginnerMode/securityIcon.svg";
import SecurityCenterModal from "./beginnerMode/SecurityCenterModal";

const RideScreen = ({ route }) => {
  let mapRef = useRef();
  const { authToken } = useAuth();
  const {
    isFirstRide,
    redZoneOpen,
    selectScooter,
    dangerZoneOpen,
    endRide,
    isConnectedError,
    pauseRide,
    startRide,
    rideArea,
    costSettings,
    showLocation,
    coordinates,
  } = useSelector((state) => state.ride);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [firstPause, setFirstPause] = useState(false);
  const [error, setError] = useState(false);
  const [pushError, setPushError] = useState({
    text: "",
    title: "",
  });
  const [gpsError, setGpsError] = useState({
    text: "",
    title: "",
  });
  const [pushOpen, setPushOpen] = useState(false);
  const [gpsLostOpen, setGpsLostOpen] = useState(false);
  const [batteryLow, setBatteryLow] = useState(false);
  const [goToParkingOpen, setGoToParkingOpen] = useState(false);
  const [openParkingInfo, setOpenParkingInfo] = useState(false);

  const [errorOpen, setErrorOpen] = useState(false);
  const [tripId, setTripId] = useState(0);
  const [firstPauseOpen, setFirstPauseOpen] = useState(false);
  const [firstRedZoneOpen, setFirstRedZoneOpen] = useState(false);
  const [firstDangerZoneOpen, setFirstDangerZoneOpen] = useState(false);
  const [endLoading, setEndLoading] = useState(false);
  const [pushFirstOpen, setPushFirstOpen] = useState("");
  const [openLocationError, setOpenLocationError] = useState(false);
  const [locationFocused, setLocationFocused] = useState(false);
  const [startPosition, setStartPosition] = useState(
    new AnimatedRegion({
      ...defaultLocation,
    })
  );
  const { user } = useSelector((state) => state.payment);
  const [openSecurityModal, setOpenSecurityModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (navigation.isFocused()) {
      dispatch(setEndRide(false));

      setLoading(true);
      Promise.all([getCurrentTrip(authToken)]).then(([res]) => {
        setStartPosition(
          new AnimatedRegion({
            latitude: parseFloat(res?.latitude),
            longitude: parseFloat(res?.longitude),
            longitudeDelta: 0.005,
            latitudeDelta: 0.005,
          })
        );
        if (res?.is_reserve) {
          // rideStart(true);
        } else if (
          res?.status === "in_process" &&
          res?.is_been_started &&
          parseInt(res?.duration) >= 0
        ) {
          dispatch(setEndRide(false));
          dispatch(setStartRide(true));
          setTripId(res?.id);
          startTripSocket(res?.id);
        }
        dispatch(setSelectScooter(res));

        setLoading(false);
      });
    }
  }, [navigation.isFocused(), AppState.currentState]);

  useEffect(() => {
    if (
      selectScooter?.push_description &&
      selectScooter?.polygon_color_mobile !== RED_ZONE
    ) {
      setPushError({
        text: selectScooter?.push_description,
        title: selectScooter?.push_title || "",
      });
      if (
        parseInt(selectScooter?.battery_current_level) <=
        costSettings?.criticalPower
      ) {
        // setEndRide(true)
        dispatch(setRideTime(selectScooter?.duration));
        dispatch(setStartRide(false));
        setBatteryLow(true);
      }
      setPushFirstOpen(selectScooter?.push_description);
      pushFirstOpen !== selectScooter?.push_description && setPushOpen(true);
    } else {
      setPushFirstOpen("");
    }
    if (selectScooter?.gps_error) {
      setGpsError({
        text: selectScooter?.gps_error_text,
        title: "Gps lost",
      });
      setPushFirstOpen(false);
      setGpsLostOpen(true);
    }
    if (selectScooter?.polygon_color_mobile === PARKING_ZONE) {
      // setFirstPause(true)
      setFirstRedZoneOpen(false);
      setFirstDangerZoneOpen(false);
      dispatch(setDangerZoneOpen(false));
      dispatch(setRideArea("parking"));
      // !firstPause && setOpenParkingInfo(true)
    } else if (selectScooter?.polygon_color_mobile === RED_ZONE) {
      setFirstRedZoneOpen(true);
      setFirstDangerZoneOpen(false);
      dispatch(setDangerZoneOpen(false));
      !firstRedZoneOpen && dispatch(setRedZoneOpen(true));
      dispatch(setRideArea("danger"));
    } else if (selectScooter?.polygon_color_mobile === SLOW_ZONE) {
      setFirstRedZoneOpen(false);
      setFirstDangerZoneOpen(false);
      dispatch(setDangerZoneOpen(false));
      dispatch(setRideArea("slow"));
    } else if (selectScooter?.polygon_color_mobile === BLACK_ZONE) {
      setFirstRedZoneOpen(false);
      setFirstDangerZoneOpen(false);
      dispatch(setDangerZoneOpen(false));
      dispatch(setRideArea("black"));
    } else if (selectScooter?.polygon_color_mobile === NORMAL_ZONE) {
      setFirstRedZoneOpen(false);
      setFirstDangerZoneOpen(false);
      dispatch(setDangerZoneOpen(false));
      dispatch(setRideArea("none"));
    } else if (startRide && !selectScooter?.polygon_color_mobile) {
      console.log("end");
      setFirstRedZoneOpen(false);
      setFirstDangerZoneOpen(true);
      !firstDangerZoneOpen && dispatch(setDangerZoneOpen(true));
      dispatch(setRideArea("danger"));
    } else {
      dispatch(setRideArea("none"));
      setFirstRedZoneOpen(false);
      setFirstDangerZoneOpen(false);
    }
    selectScooter?.status === "in_process" &&
      dispatch(setSeconds(parseInt(selectScooter.duration)));
  }, [selectScooter]);

  useEffect(() => {
    if (pauseRide) {
      if (!firstPause && isFirstRide) {
        setFirstPauseOpen(true);
        setFirstPause(true);
      } else setFirstPauseOpen(false);
    }
  }, [pauseRide]);

  const startTripSocket = (room) => {
    console.log("---start trip---");
    const socket = SocketIOClient(`${BASE_URL}:36502?token=${authToken}`);
    socket.on("connect", () => {
      console.log("connect", room);
      socket.emit("subscribe", `start-trip-${room}`, (data) => {});
      socket.on(`start-trip-${room}`, (data) => {
        // console.log('start socket')
      });
      socket.emit("subscribe", `event-trip-${selectScooter?.id}`);
      socket.on(`event-trip-${selectScooter?.id}`, (data) => {
        console.log("con");
        console.log(data.data);
      });

      socket.emit("subscribe", `trip-${room}`);
      socket.on(`trip-${room}`, (data) => {
        if (!endRide) {
          dispatch(setRideArea(data.data?.polygon_color_mobile));
          dispatch(
            setSelectScooter({
              ...selectScooter,
              polygon_color_mobile: data.data?.polygon_color_mobile,
              ...data.data,
            })
          );
        }
      });
    });

    return () => {
      socket.emit("disconnect");
      socket.disconnect(true);
      socket.close();
    };
  };

  const rideStart = (reserved) => {
    if (reserved) {
      startReservedTrip(authToken, selectScooter?.id).then((res) => {
        if (res.result === "success") {
          console.log("---start reserved trip---");
          dispatch(setEndRide(false));
          dispatch(setStartRide(true));
          setTripId(res.data?.tripId);
          startTripSocket(res.data?.tripId);
        }
      });
    } else {
      startTrip(authToken, selectScooter?.id, 0)
        .then((res) => {
          if (res.result === "success") {
            console.log("---start trip, reserve:", 0);
            dispatch(setStartRide(true));
            dispatch(setEndRide(false));
            dispatch(setPauseRide(false));
            setTripId(res.data?.tripId);
            startTripSocket(res.data?.tripId);
            dispatch(setReservation(false));
          }
        })
        .catch((err) => {
          setError(err?.message || err);
          setErrorOpen(true);
        });
    }
  };
  const ridePause = () => {
    pauseTrip(authToken, tripId).then((res) => {
      if (res?.data?.result === "success") {
        dispatch(setPauseRide(true));
      } else {
        !isConnectedError && setGoToParkingOpen(true);
      }
    });
  };
  const rideContinue = () => {
    continueTrip(authToken, tripId)
      .then((res) => {
        if (res.data.result === "success") {
          !!pauseRide && dispatch(setPauseRide(false));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const rideStop = (item) => {
    setEndLoading(true);
    stopTrip(
      authToken,
      selectScooter.id,
      selectScooter?.latitude + "",
      selectScooter?.longitude + ""
    )
      .then((res) => {
        console.log("stop", res);
        if (res.result === "success") {
          dispatch(
            setEndRideDate(
              `${moment(new Date()).format(
                "DD.MM.YYYY"
              )},${new Date().getHours()}:${
                new Date().getUTCMinutes() < 10
                  ? `0${new Date().getUTCMinutes()}`
                  : `${new Date().getUTCMinutes()}`
              }`
            )
          );

          setEndLoading(false);
          dispatch(setEndRide(true));
          dispatch(setRideTime(0));
          dispatch(setStartRide(false));
          dispatch(setSeconds(costSettings?.max_reserve_minutes * 60));
          dispatch(setSelectScooter({}));
          if (item === "exit") {
            navigation.navigate("MainScreen");
          } else {
            navigation.navigate("EndRideScreen");
          }
        } else {
          setEndLoading(false);
          setGoToParkingOpen(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {goToParkingOpen && !dangerZoneOpen && !isConnectedError && (
        <ParkingZoneInfoModal setIsOpen={setGoToParkingOpen} />
      )}
      <View style={styles.container}>
        {openSecurityModal && (
          <SecurityCenterModal
            isOpen={openSecurityModal}
            setIsOpen={setOpenSecurityModal}
          />
        )}
        <DrawerMenuButton />
        {pushOpen && (
          <PushErrorModal
            pushError={pushError}
            isOpen={pushOpen}
            setIsOpen={setPushOpen}
            setPushError={setPushError}
            endRide={batteryLow}
          />
        )}
        {gpsLostOpen && (
          <GpsLostModal
            pushError={gpsError}
            isOpen={gpsLostOpen}
            setIsOpen={setGpsLostOpen}
            setPushError={setGpsError}
            endRide={true}
          />
        )}
        {endLoading && <LoadingModal />}
        {!!selectScooter?.latitude && (
          <TrackerMap
            locationFocused={locationFocused}
            mapRef={mapRef}
            startRide={startRide}
            rideArea={rideArea}
            startPosition={startPosition}
            setStartPosition={setStartPosition}
          />
        )}
        <View style={styles.sideButtons}>
          {user.beginner_mode === 1 && (
            <View style={{ marginBottom: normalize(10) }}>
              <BeginnerModeIcon />
            </View>
          )}

          <TouchableOpacity
            style={{ ...styles.screenButton, marginBottom: normalize(10) }}
            onPress={() => {
              selectScooter?.latitude
                ? setLocationFocused(!locationFocused)
                : setOpenLocationError(true);
            }}
          >
            <MuGeolocation />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOpenSecurityModal(true)}>
            <SecurityIcon />
          </TouchableOpacity>
        </View>
        {((!endRide && !loading) || selectScooter?.duration > 0) && (
          <StartRide
            scooter={selectScooter}
            tripId={tripId}
            setTripId={setTripId}
            rideStart={rideStart}
            ridePause={ridePause}
            rideContinue={rideContinue}
            rideStop={rideStop}
            redZoneOpen={redZoneOpen}
            setRedZoneOpen={setRedZoneOpen}
            setFirstPause={setFirstPause}
            error={error}
            firstPause={firstPause}
            pushError={pushError}
            setPushError={setPushError}
            pushOpen={pushOpen}
            setPushOpen={setPushOpen}
            setFirstPauseOpen={setFirstPauseOpen}
            firstPauseOpen={firstPauseOpen}
            openParkingInfo={openParkingInfo}
            goToParkingOpen={goToParkingOpen}
            setGoToParkingOpen={setGoToParkingOpen}
            errorOpen={errorOpen}
            setErrorOpen={setErrorOpen}
            isFirstRide={isFirstRide}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  screenButton: {
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 48,
  },
  sideButtons: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingRight: 20,
  },
});
export default RideScreen;
