import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AppState,
  Image,
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Circle, Marker, Polygon } from "react-native-maps";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import scan from "../../assets/scan.png";
import LocationErrorModal from "../components/LocationErrorModal";
import BecomePartnerModal from "../components/BecomePartnerModal";
import FreeRideModal from "../components/FreeRideModal";
import ConnectionErrorModal from "../components/ConnectionErrorModal";
import UserMarker from "../components/UserMarker";
import { normalize } from "../responsive/fontSize";
import ConfirmReservationModal from "../components/ConfirmReservationModal";
import ReservationBlock from "../components/ReservationBlock";
import MainButton from "../../assets/mainButton.svg";
import InfoModalButton from "../../assets/infoModalButton.svg";
import DrawerMenuButton from "../components/DrawerMenuButton";
import { useDispatch, useSelector } from "react-redux";
import {
  createTrip,
  getCurrentTrip,
  getDebts,
  getScooters,
  isRange,
  startTrip,
  stopTrip,
} from "../api/scooterApi";
import { useAuth } from "../provider/AuthProvider";
import ReserveModal from "../components/ReserveModal";
import SocketIOClient from "socket.io-client";
import Markers from "../components/Markers";
import LoadingModal from "../components/LoadingModal";
import { getCostSettings, getProfileInfo } from "../api/authApi";
import * as Location from "expo-location";
import { GT } from "../constants/fonts";
import MapPolygon from "../components/MapPolygon";
import AddCardModal from "../components/AddCardModal";
import TimeoutModal from "../components/TimeoutModal";
import ReservationCanceledModal from "../components/ReservationCanceledModal";
import MuGeolocation from "../../assets/muGeolocation.svg";
import hexToRgba from "hex-to-rgba";

import NegativeBalanceModal from "../components/NegativeBalanceModal/NegativeBalanceModal";
import { BASE_URL } from "../api/apiKeys";
import SecurityCenterModal from "./beginnerMode/SecurityCenterModal";
import SecurityIcon from "../../assets/beginnerMode/securityIcon.svg";
import BeginnerModeIcon from "../../assets/beginnerMode.svg";
import * as turf from "@turf/turf";

import MainMap from "../components/MainMap";
import ErrorModal from "../components/ErrorModal/ErrorModal";
import {
  setSelectScooter,
  setClaimFreeRide,
  setIsFirstRide,
  setIsConnectedErrorOpen,
  setReservation,
  setRideTime,
  setPauseRide,
  setPauseTime,
  setSeconds,
  setSecondsReserve,
  setCostSettings,
  setShowLocation,
} from "../redux/rideReducer";
import { setUser, setDebt } from "../redux/paymentReducer";

import checkConnection from "../helpers/checkConnection";
import getLocation from "../helpers/getLocation";
import getUserCards from "../helpers/getUserCards";
import OrangeMarker from "../../assets/orangeMarker.svg";

const MainScreen = () => {
  // console.log("holes: ", holes);
  let mapRef = useRef();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [openLocationError, setOpenLocationError] = useState(false);
  const [openCityError, setOpenCityError] = useState(false);
  const [checkCityError, setCheckCityError] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [openFreeRide, setOpenFreeRide] = useState(false);
  const [confirmReservation, setConfirmReservation] = useState(false);
  const [error, setError] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const [scooters, setScooters] = useState([]);
  const [mapBounds, setMapBounds] = useState({});
  const { authToken, i18n, isAdded, setIsAdded, locale } = useAuth();
  const { userCards, debt, user } = useSelector((state) => state.payment);

  const {
    selectScooter,
    claimFreeRide,
    isConnectedError,
    isConnectedErrorOpen,
    reservation,
    coordinates,
    showLocation,
    costSettings,
    mapPermission,
    isShowedLocationError,
  } = useSelector((state) => state.ride);

  const dispatch = useDispatch();

  const handleSelectScooter = (val) => {
    dispatch(setSelectScooter(val));
  };
  const handleReservation = (val, trip = {}) => {
    !!val && reserveScooter(trip);
    dispatch(setReservation(val));
  };
  const handleCurrentUser = (val) => {
    dispatch(setUser(val));
  };
  const [addCard, setAddCard] = useState(false);
  const [timeout, setTimeout] = useState(false);
  const [cancel, setCancel] = useState(false);
  // const [cancelPress, setCancelPress] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(13);
  const [openBalanceErrorModal, setOpenBalanceErrorModal] = useState(false);
  const [openSecurityModal, setOpenSecurityModal] = useState(false);
  const [reserveName, setReserveName] = useState("");
  const [tracksViewChanges, setTracksViewChanges] = useState(false);

  LogBox.ignoreLogs([
    "animateToCoordinate() is deprecated, use animateCamera() instead",
  ]);
  const socket = SocketIOClient(`${BASE_URL}:36502?token=${authToken}`, {
    transports: ["websocket"],
  });

  const socketReserve = SocketIOClient(`${BASE_URL}:36502?token=${authToken}`, {
    transports: ["websocket"],
  });

  useEffect(() => {
    Location.getForegroundPermissionsAsync().then((res) => {
      if (!!res.granted) {
        dispatch(setShowLocation(true));
        getLocation(dispatch, mapPermission);
        setOpenLocationError(false);
      } else {
        dispatch(setShowLocation(false));
        if (!isShowedLocationError) setOpenLocationError(true);
      }
    });
  }, [mapPermission]);

  useEffect(() => {
    getUserCards(dispatch);
    getLocation(dispatch, mapPermission);
  }, []);

  useEffect(() => {
    if (authToken) {
      getCostSettings(authToken).then((res) => {
        dispatch(setCostSettings(res?.data));
      });
    }
  }, [authToken]);

  useEffect(() => {
    !reservation && !debt?.is_pay_require && setErrorOpen(false);
  }, [debt, reservation]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkConnection(dispatch, isConnectedError, isConnectedErrorOpen);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleStartTrip = (tripId) => {
    startTrip(authToken, tripId, 1)
      .then((res) => {
        if (res.result === "success") {
          console.log("---confirm reserve trip started---");
          handleReservation(false);
          setTimeout(false);
        }
      })
      .catch((err) => {
        setError(err?.message || err);
        setErrorOpen(true);
        console.error("can not startTrip, reason: ", err);
      });
  };

  const stopReservation = (timeout) => {
    stopTrip(
      authToken,
      selectScooter?.tripId || selectScooter?.id || selectScooter?.scooter_id,
      selectScooter.latitude + "",
      selectScooter.longitude + ""
    )
      .then((res) => {
        if (
          res.result === "success" ||
          res === "Поездка не найдена" ||
          res === "Jazda sa nenašla" ||
          res === "Подорож не було знайдено" ||
          res === "The trip was not found"
        ) {
          if (!timeout) {
            !timeout && setCancel(true);
            handleSelectScooter({});
            setReserveName("");
            dispatch(setSecondsReserve(costSettings?.max_reserve_minutes * 60));
          } else {
            // !cancel && setTimeout(true);
            setCancel(false);
            dispatch(setSecondsReserve(costSettings?.max_reserve_minutes * 60));
          }
          dispatch(setRideTime(0));
          handleReservation(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  /////////////
  const reserveScooter = (trip = {}) => {
    authToken &&
      (selectScooter?.scooter_name ||
        selectScooter?.name_scooter ||
        trip?.name_scooter) &&
      createTrip(
        authToken,
        selectScooter?.scooter_name ||
          selectScooter?.name_scooter ||
          trip?.name_scooter
      ).then((res) => {
        if (res.result === "success") {
          console.log("confirm create reserve trip");

          startTrip(authToken, res?.tripId, 1).then((resTrip) => {
            if (res.result === "success") {
              console.log("---confirm reserve trip started---", res?.tripId);
              setConfirmReservation(false);
              setTimeout(false);
              handleSelectScooter({ ...selectScooter, tripId: res?.tripId });
              dispatch(setReservation(true));
              setError("");
            } else {
              console.log("er", resTrip);
              setError(resTrip?.message);
              setErrorOpen(true);
            }
          });
        } else {
          // setError(res?.message || res);
          console.error("Error createTrip: ", res?.message || res);
          // setErrorOpen(true);
          // setSelectScooter({})
        }
      });
  };

  /////////////

  const checkReservation = () => {
    getCurrentTrip(authToken)
      .then((res) => {
        console.log("getCurrentTrip : ", res?.status, res?.name_scooter);
        if (res?.status === "in_process") {
          setScooters((prev) =>
            prev
              .filter(
                (item) =>
                  item?.scooter_name !== res?.name_scooter ||
                  item?.name_scooter !== res?.name_scooter
              )
              .concat([
                {
                  ...res,
                  battery_power: res?.battery_level,
                  scooter_name: res?.name_scooter,
                },
              ])
          );
          parseInt(res?.duration) >= 0 && handleSelectScooter(res);
          if (res?.is_reserve && parseInt(res?.duration) > 0) {
            setReserveName(res?.name_scooter);
            dispatch(
              setSecondsReserve(
                (parseInt(
                  costSettings?.max_reserve_minutes * 60 ||
                    res?.reserve_max_minutes * 60
                ) || 300) - parseInt(res?.duration)
              )
            );
            handleReservation(true, res);
          } else if (res?.is_been_started) {
            if (parseInt(res?.duration) > 0) {
              dispatch(setRideTime(res?.duration));
              res?.is_pause && dispatch(setPauseRide(true));
              navigation.navigate("RideScreen");
            } else {
              navigation.navigate("RideScreen");
            }
          } else if (res?.is_been_reserved && parseInt(res?.duration) > 0) {
            // stopReservation(true)
            handleReservation(false, res);
          }
        } else {
          handleSelectScooter({});
        }
        setChecking(false);
      })
      .catch((err) => {
        console.error(err);
        setChecking(false);
      });
  };

  const checkCityAccess = () => {
    isRange(authToken, coordinates).then((res) => {
      if (!res?.data.is_range) {
        setOpenCityError(true);
      }
    });
  };

  useEffect(() => {
    if (navigation.isFocused()) {
      checkReservation();
    } else {
      setChecking(false);
    }
  }, [navigation.isFocused(), AppState.currentState]);

  useEffect(() => {
    if (navigation.isFocused()) {
      Promise.all([
        getCostSettings(authToken),
        getScooters(authToken),
        getProfileInfo(authToken),
      ])
        .then(([costRes, scootersRes, info]) => {
          console.log("info", info);
          dispatch(setCostSettings(costRes?.data));
          setScooters((prev = []) =>
            prev?.concat(scootersRes?.filter((item) => item.in_polygon == 1))
          );
          dispatch(setClaimFreeRide(info?.avaliable_free_trip));
          handleCurrentUser(info);
          if (info?.number_of_trips > 0) {
            dispatch(setIsFirstRide(false));
          } else {
            dispatch(setIsFirstRide(true));
          }
        })
        .catch((error) => {
          console.error(error);
          // обработка ошибок
        });
    }
  }, [navigation.isFocused()]);

  useEffect(() => {
    if (
      reservation &&
      !cancel &&
      !timeout &&
      selectScooter?.id &&
      costSettings?.max_reserve_minutes > 0
    ) {
      socketReserve.on("connect", function () {
        console.log("reserve connect");
        socketReserve.emit("subscribe", `trip-${selectScooter?.id}`);
        socketReserve.on(`trip-${selectScooter?.id}`, function (data) {
          if (
            data.data?.is_reserve &&
            parseInt(data.data?.duration) <
              costSettings?.max_reserve_minutes * 60
          ) {
            setSecondsReserve(
              costSettings?.max_reserve_minutes * 60 -
                parseInt(data.data?.duration)
            );
            handleSelectScooter({
              ...data.data,
              tripId: data.data?.id,
              id: selectScooter?.id,
            });
          } else {
            console.log("end reserve", reservation);
            handleReservation((reservation) => {
              reservation && stopReservation(true);
              return reservation;
            });
          }
        });
      });
    } else {
      // setSeconds(costSettings?.max_reserve_minutes * 60)
      // socketReserve.emit('disconnect')
      // socketReserve.disconnect(true)
      // socketReserve.close()
      // setConnect('disconnect')
    }
  }, [
    reservation,
    cancel,
    timeout,
    AppState.currentState,
    navigation.isFocused(),
  ]);

  useEffect(() => {
    if (coordinates?.latitude > 0 && checkCityError && isFocused) {
      // console.log("6")
      checkCityAccess();
      setCheckCityError(false);
    }
  }, [coordinates, checkCityError, isFocused]);

  useEffect(() => {
    // console.log("7")
    !!navigation.isFocused() &&
      getDebts(authToken)
        .then((res) => {
          dispatch(setDebt(res));
        })
        .catch((err) => console.error(err));
  }, [reservation, navigation.isFocused()]);

  useEffect(() => {
    if (navigation.isFocused()) {
      // console.log("8")
      socket.on("connect", function () {
        console.log("connect");
        socket.emit("subscribe", "updateScooterLocation");
        socket.on("updateScooterLocation", function (data) {
          // console.log("data", data.data);
          setTracksViewChanges(true);
          let oldScooter = scooters?.filter(
            (item) => item?.scooter_name === data.data?.scooter_name
          )[0];
          if (
            data.data?.is_free ||
            (data.data?.is_reserve &&
              reserveName &&
              reserveName === data.data.scooter_name)
          ) {
            if (
              data.data.latitude !== oldScooter?.latitude ||
              data.data.longitude !== oldScooter?.longitude ||
              data.data.battery_power !== oldScooter?.battery_power
            ) {
              if (
                scooters?.filter(
                  (item) => item?.scooter_name === data.data.scooter_name
                ).length === 0
              ) {
                setScooters((prev) =>
                  prev
                    .filter(
                      (item) => item?.scooter_name !== data.data.scooter_name
                    )
                    .concat([
                      {
                        ...data.data,
                        battery_power: data.data.battery_power,
                      },
                    ])
                );
              } else {
                setTracksViewChanges(true);
                setScooters((prev) => {
                  return prev.map((item) => {
                    if (item?.scooter_name === data.data.scooter_name) {
                      return {
                        ...data.data,
                        // battery_power: data.data?.battery_level,
                        // latitude: data.data.latitude,
                        // longitude: data.data.longitude
                      };
                    } else return item;
                  });
                });
              }

              setTracksViewChanges(false);
            }
          } else {
            setTracksViewChanges(true);
            if (
              (data.data?.is_reserve &&
                reserveName &&
                reserveName !== data.data.scooter_name) ||
              (data.data?.is_reserve && !reserveName)
            ) {
              setScooters((prev) => {
                return prev.map((item) => {
                  if (item?.scooter_name === data.data.scooter_name) {
                    return {};
                  } else return item;
                });
              });
            } else if (!data.data?.is_reserve && !data.data?.is_free) {
              setScooters((prev) =>
                prev.filter(
                  (item) => item?.scooter_name !== data.data.scooter_name
                )
              );
            }
          }
          setTracksViewChanges(false);
        });
      });

      return () => {
        socket.emit("disconnect");
        socket.disconnect(true);
        socket.close();
      };
    }
  }, [reserveName, navigation.isFocused()]);

  const [key, setKey] = useState(2);
  useEffect(() => {
    if (zoomLevel <= 11 && key !== 1) {
      setKey(1);
    }
    if (11 < zoomLevel && zoomLevel <= 14 && key !== 2) {
      setKey(2);
    }
    if (14 < zoomLevel && zoomLevel < 17 && key !== 3) {
      setKey(3);
    }
    if (17 < zoomLevel && key !== 4) {
      setKey(4);
    }
  }, [zoomLevel]);

  return (
    <View style={styles.container}>
      {openSecurityModal && (
        <SecurityCenterModal
          isOpen={openSecurityModal}
          setIsOpen={setOpenSecurityModal}
        />
      )}
      {timeout && isFocused && !cancel && (
        <TimeoutModal
          setIsOpen={setTimeout}
          isOpen={timeout}
          setReservation={handleReservation}
          costSettings={costSettings}
          reserveScooter={handleStartTrip}
        />
      )}
      {cancel && isFocused && !timeout && (
        <ReservationCanceledModal
          setIsOpen={setCancel}
          isOpen={cancel}
          setReservation={handleReservation}
        />
      )}
      {openLocationError && navigation.isFocused() && (
        <LocationErrorModal setIsOpen={setOpenLocationError} />
      )}
      {openCityError &&
        navigation.isFocused() &&
        !reservation &&
        !cancel &&
        !timeout && (
          <BecomePartnerModal
            isOpen={openCityError}
            setIsOpen={setOpenCityError}
          />
        )}
      {openFreeRide && !openLocationError && (
        <FreeRideModal isOpen={openFreeRide} setIsOpen={setOpenFreeRide} />
      )}
      {confirmReservation && (
        <ConfirmReservationModal
          isOpen={confirmReservation}
          setIsOpen={setConfirmReservation}
          setReservation={handleReservation}
          scooter={selectScooter}
          handleSelectScooter={handleSelectScooter}
        />
      )}
      {isConnectedErrorOpen && (
        <ConnectionErrorModal
          isOpen={isConnectedErrorOpen}
          setIsOpen={setIsConnectedErrorOpen}
          text={i18n.t("connectionLost")}
        />
      )}
      {debt?.amount > 0 && !isConnectedErrorOpen && !claimFreeRide && (
        <ConnectionErrorModal
          text={i18n.t("payLastRide")}
          onPress={() => navigation.navigate("PaymentScreen")}
        />
      )}
      {errorOpen && (
        <ErrorModal
          isOpen={errorOpen}
          setIsOpen={setErrorOpen}
          errorText={error}
        />
      )}
      {openBalanceErrorModal && (
        <NegativeBalanceModal
          setIsOpen={setOpenBalanceErrorModal}
          isOpen={openBalanceErrorModal}
        />
      )}
      <DrawerMenuButton />
      {claimFreeRide && !isConnectedErrorOpen && (
        <TouchableOpacity
          style={styles.claimFreeRideButton}
          onPress={() => {
            setOpenFreeRide(true);
          }}
        >
          <InfoModalButton width={normalize(282)} height={normalize(48)} />
          <Text style={styles.claimFreeRideText}>
            {i18n.t("claim")} {i18n.t("freeMinutes")}
          </Text>
        </TouchableOpacity>
      )}
      {addCard && <AddCardModal setIsOpen={setAddCard} isOpen={addCard} />}
      {/*{!coordinates && navigation.isFocused() && <LoadingModal />}*/}
      {!!coordinates && (
        <MainMap
          onMapPress={() => {
            if (!isConnectedErrorOpen) {
              setShowInfo(false);
              setReserved(false);
              if (!reservation) {
                handleSelectScooter({});
                setReserveName("");
              }
            }
          }}
          mapRef={mapRef}
          reservation={reservation}
          region={coordinates}
          setMapBounds={setMapBounds}
          setZoomLevel={setZoomLevel}
        >
          {!!coordinates?.latitude && !!coordinates?.longitude && (
            <Marker
              coordinate={{
                latitude: coordinates?.latitude,
                longitude: coordinates?.longitude,
              }}
              anchor={{
                x: 0.5,
                y: 0.5,
              }}
            >
              <UserMarker />
            </Marker>
          )}
          {zoomLevel <= 11 && (
            <Marker
              coordinate={{
                latitude: 48.1577172,
                longitude: 17.1215901,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <OrangeMarker width={normalize(63)} height={normalize(86)} />
            </Marker>
          )}
          {zoomLevel <= 11 && (
            <Marker
              coordinate={{
                latitude: 50.4419588,
                longitude: 30.4819588,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <OrangeMarker width={normalize(63)} height={normalize(86)} />
            </Marker>
          )}
          <Markers
            zoomLevel={zoomLevel}
            selectScooter={selectScooter}
            setSelectScooter={handleSelectScooter}
            isConnectedErrorOpen={isConnectedErrorOpen}
            reservation={reservation}
            setShowInfo={setShowInfo}
            tracksViewChanges={tracksViewChanges}
            mapRef={mapRef}
            scooters={scooters}
          />
          <MapPolygon poligonKey={key} />
        </MainMap>
      )}
      <View style={styles.scanRowContainer}>
        <View
          style={{
            ...styles.rowContainer,
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={styles.screenButton}
            onPress={() => navigation.navigate("ReportProblemInitial")}
          >
            <Icon
              type="Ionicons"
              name={"ios-warning-outline"}
              style={{ fontSize: normalize(24) }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => {
              if (userCards?.length > 0) {
                if (debt?.amount > 0) {
                  setOpenBalanceErrorModal(true);
                } else {
                  !isConnectedErrorOpen && navigation.navigate("ScannerScreen");
                }
              } else {
                setAddCard(true);
              }
            }}
          >
            <MainButton
              width={normalize(230)}
              height={normalize(56)}
              fill={"red"}
            />
            <View
              style={{
                ...styles.scanButton,
                paddingRight: locale === "eng" ? normalize(70) : normalize(40),
              }}
            >
              <Image source={scan} style={{ width: 24, height: 24 }} />
              <Text style={styles.buttonText}>{i18n.t("scan")}</Text>
            </View>
          </TouchableOpacity>
          <View>
            {user?.beginner_mode === 1 && (
              <View style={{ marginBottom: normalize(10) }}>
                <BeginnerModeIcon />
              </View>
            )}

            <TouchableOpacity
              style={{ ...styles.screenButton, marginBottom: normalize(10) }}
              disabled={!coordinates?.latitude}
              onPress={() => {
                !!coordinates?.latitude
                  ? mapRef?.current.animateCamera(
                      {
                        center: { ...coordinates },
                      },
                      { duration: 1000 }
                    )
                  : setOpenLocationError(true);
              }}
            >
              <MuGeolocation />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpenSecurityModal(true)}>
              <SecurityIcon />
            </TouchableOpacity>
          </View>
        </View>
        {showInfo && selectScooter?.scooter_name && (
          <ReserveModal
            confirmReservation={confirmReservation}
            setConfirmReservation={setConfirmReservation}
            setShowInfo={setShowInfo}
            scooter={selectScooter}
            isAdded={isAdded}
            setIsAdded={setIsAdded}
            setAddCard={setAddCard}
            addCard={addCard}
            reserveName={reserveName}
            setReserveName={setReserveName}
            setOpenBalanceErrorModal={setOpenBalanceErrorModal}
          />
        )}
        {reservation && (
          <ReservationBlock
            setReservation={handleReservation}
            selectScooter={selectScooter}
            setErrorOpen={setErrorOpen}
            errorOpen={errorOpen}
            stopReservation={stopReservation}
            cancel={cancel}
            setCancel={setCancel}
            setTimeout={setTimeout}
            timeout={timeout}
            reservation={reservation}
            reserveScooter={handleStartTrip}
            // cancelPress={cancelPress}
            // setCancelPress={setCancelPress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  scanRowContainer: {
    position: "absolute",
    bottom: normalize(32),
    zIndex: 1000,
    width: "95%",
  },
  screenButton: {
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 48,
  },
  scanButton: {
    alignItems: "center",
    paddingLeft: normalize(36),
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: normalize(70),
    position: "absolute",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reserveBlock: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: normalize(25),
    width: "100%",
    marginTop: normalize(15),
  },
  reserveTitle: {
    fontFamily: GT,
    fontSize: normalize(24),
    fontWeight: "500",
  },
  buttonText: {
    color: "white",
    fontSize: normalize(24),
    fontFamily: GT,
  },
  cardDot: {
    width: 4,
    height: 4,
    backgroundColor: "#1F1E1D",
    borderRadius: 10,
    marginRight: normalize(5),
  },
  reserveButton: {
    borderColor: "rgba(254, 123, 1, 0.24)",
    borderWidth: 1,
    padding: 16,
    width: "100%",
    marginTop: normalize(35),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  reserveButtonText: {
    color: "#FE7B01",
    fontFamily: GT,
    fontWeight: "500",
    fontSize: normalize(24),
  },
  claimFreeRideButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 100,
    top: normalize(50),
    alignSelf: "center",
    right: normalize(24),
  },
  claimFreeRideText: {
    color: "white",
    fontSize: normalize(16),
    position: "absolute",
    alignSelf: "flex-start",
    fontFamily: GT,
    marginLeft: normalize(28),
  },
});
export default MainScreen;
