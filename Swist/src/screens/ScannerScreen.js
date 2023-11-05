import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { normalize } from "../responsive/fontSize";
import BackPath from "../../assets/backPath.svg";
import UnScannedLamp from "../../assets/unScannedLamp.svg";
import ScannedLamp from "../../assets/scannedLamp.svg";
import scannerBg from "../../assets/scannerBg.png";
import { useNavigation } from "@react-navigation/native";
import AllowCameraModal from "../components/AllowCameraModal";

import ScanErrorModal from "../components/ScanErrorModal";
import EnterCodeModal from "../components/EnterCodeModal";
import { createTrip, getCurrentTrip } from "../api/scooterApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../provider/AuthProvider";
import ErrorModal from "../components/ErrorModal/ErrorModal";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { useLinkTo } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setReservation, setSeconds } from "../redux/rideReducer";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const ScannerScreen = () => {
  const navigation = useNavigation();
  const [disableScan, setDisableScan] = useState(false);
  const { authToken, i18n } = useAuth();
  const { costSettings } = useSelector((state) => state.ride);

  const [cameraAllow, setCameraAllow] = useState(false);
  const [enterCode, setEnterCode] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [error, setError] = useState("");
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const dispatch = useDispatch();
  const tripStart = (value, scan = false) => {
    setDisableScan(true);
    getCurrentTrip(authToken)
      .then((res) => {
        if (res?.is_reserve && res?.status === "in_process") {
          if (res?.name_scooter === value) {
            console.log("---created trip reserved ---");
            AsyncStorage.setItem("reservation", "");
            dispatch(setSeconds(costSettings?.max_reserve_minutes * 60));
            dispatch(setReservation(false));
            navigation.navigate("RideScreen");
          } else {
            setError("You have active ride already");
            setErrorOpen(true);
          }
        } else {
          createTrip(authToken, value)
            .then((res) => {
              if (res.result === "success") {
                AsyncStorage.setItem("reservation", "");
                navigation.navigate("RideScreen");
              } else {
                setError(res?.message || res);
                setErrorOpen(true);
              }
            })
            .catch((err) => {
              setError(err?.message || err);
              setErrorOpen(true);
            });
        }
      })
      .catch((err) => {
        setError(err?.message || err);
        setErrorOpen(true);
        console.log("err:::::", err);
      });
  };

  useEffect(() => {
    if (!errorOpen) {
      setDisableScan(false);
    }
  }, [errorOpen]);
  const checkPermission = () => {
    const [status, requestPermission] = Camera.useCameraPermissions();
    requestPermission().then((res) => {
      console.log("r", res);
    });
  };

  useEffect(() => {
    Camera.getCameraPermissionsAsync().then((res) => {
      if (res.granted) {
        setCameraAllow(false);
      } else {
        setCameraAllow(true);
      }
    });
  }, []);

  const __handleFlashMode = () => {
    if (flashMode === Camera.Constants.FlashMode.torch) {
      setFlashMode(Camera.Constants.FlashMode.off);
    } else if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.torch);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/*{errorScan && (*/}
      {/*  <ScanErrorModal setIsOpen={setErrorScan} isOpen={errorScan} />*/}
      {/*)}*/}
      {enterCode && (
        <EnterCodeModal setIsOpen={setEnterCode} isOpen={enterCode} />
      )}
      {cameraAllow && (
        <AllowCameraModal
          setIsOpen={setCameraAllow}
          isOpen={cameraAllow}
          checkPermission={checkPermission}
        />
      )}
      {errorOpen && (
        <ErrorModal
          setIsOpen={setErrorOpen}
          isOpen={errorOpen}
          errorText={error}
        />
      )}
      {cameraAllow ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
          }}
        >
          <View style={styles.topOverlay}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ height: normalize(48) }}
            >
              <BackPath width={normalize(75)} height={normalize(48)} />
            </TouchableOpacity>
            {/*<Feather name={'info'} style={{color: 'white', fontSize: normalize(20)}}/>*/}
          </View>
          <ImageBackground
            source={scannerBg}
            style={{ width: "100%", height: "100%", position: "absolute" }}
            resizeMode="cover"
          />
          <View style={styles.bottomOverlay}>
            {flashMode === Camera.Constants.FlashMode.torch ? (
              <ScannedLamp onPress={__handleFlashMode} />
            ) : (
              <UnScannedLamp onPress={__handleFlashMode} />
            )}
            <Text
              style={{
                color: "white",
                fontSize: normalize(16),
                marginTop: normalize(70),
              }}
              onPress={() => setEnterCode(true)}
            >
              {i18n.t("enterCodeManually")}
            </Text>
          </View>
        </View>
      ) : (
        <Camera
          key={0}
          flashMode={flashMode}
          // onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ width: "100%", height: "100%" }}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={(e) => {
            if (e.data) {
              if (!disableScan && !errorOpen) {
                Vibration.vibrate(100);
                let parts = e.data.split("="); // Split the URL at the '=' character
                tripStart(parts.pop(), true);
              }
            }
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View style={styles.topOverlay}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{ height: normalize(48) }}
              >
                <BackPath width={normalize(75)} height={normalize(48)} />
              </TouchableOpacity>
              {/*<Feather name={'info'} style={{color: 'white', fontSize: normalize(20)}}/>*/}
            </View>
            <ImageBackground
              source={scannerBg}
              style={{ width: "100%", height: "100%", position: "absolute" }}
              resizeMode="cover"
            />
            <View style={styles.bottomOverlay}>
              {flashMode === Camera.Constants.FlashMode.torch ? (
                <ScannedLamp onPress={__handleFlashMode} />
              ) : (
                <UnScannedLamp onPress={__handleFlashMode} />
              )}
              <TouchableOpacity
                onPress={() => setEnterCode(true)}
                style={{ marginTop: normalize(70) }}
              >
                <Text style={{ color: "white", fontSize: normalize(16) }}>
                  {i18n.t("enterCodeManually")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  rectangle: {
    height: normalize(300),
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 20,
  },

  topOverlay: {
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    top: normalize(55),
    zIndex: 100,
    paddingRight: normalize(26),
  },

  bottomOverlay: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    bottom: normalize(10),
    maxHeight: normalize(200),
    height: "100%",
  },

  leftAndRightOverlay: {
    height: "100%",
    width: SCREEN_WIDTH,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
});

export default ScannerScreen;
