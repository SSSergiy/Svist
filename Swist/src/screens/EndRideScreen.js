import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { normalize } from "../responsive/fontSize";
import Entypo from "react-native-vector-icons/Entypo";
import ImagePickBlock from "../../assets/imagePickBlock.svg";
import CameraModal from "../components/CameraModal/CameraModal";
import { useNavigation } from "@react-navigation/native";
import BackBlackPath from "../../assets/backBlackPath.svg";
import ReserveButton from "../../assets/reserveButton.svg";
import ReserveFocusButton from "../../assets/reserveFocusButton.svg";
import AddPicture from "../../assets/addPicture.svg";
import AddedPicture from "../../assets/addedPicture.svg";
import { useAuth } from "../provider/AuthProvider";
import AllowCameraModal from "../components/AllowCameraModal";
import { GT } from "../constants/fonts";
import { Camera } from "expo-camera";
import { getCurrentTrip } from "../api/scooterApi";
import { useDispatch, useSelector } from "react-redux";
import { setPicture, setSelectScooter } from "../redux/rideReducer";

const EndRideScreen = () => {
  const { picture, isFirstRide } = useSelector((state) => state.ride);
  const [openCamera, setOpenCamera] = useState(false);
  const { authToken, i18n } = useAuth();
  const [openFirst, setOpenFirst] = useState(!isFirstRide);
  const navigation = useNavigation();
  const [cameraAllow, setCameraAllow] = useState(false);
  const [checkStation, setCheckStation] = useState(false);
  const [checkInterfere, setInterfere] = useState(false);
  const [takePicture, setTakePicture] = useState(false);

  const dispatch = useDispatch();

  const checkPermission = () => {
    const [status, requestPermission] = Camera.useCameraPermissions();
    // console.log('status',status)
  };
  const checkAllow = () => {
    return Camera.getCameraPermissionsAsync().then((res) => {
      return res.granted;
    });
  };
  useEffect(() => {
    dispatch(setPicture({}));
    Camera.getCameraPermissionsAsync().then((res) => {
      if (res.granted) {
        setCameraAllow(false);
      } else {
        setCameraAllow(true);
      }
    });
    getCurrentTrip(authToken).then((res) => {
      if (res?.status === "finished") {
        dispatch(setSelectScooter(res));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {/*<TouchableOpacity style={{position: 'absolute', left: 0, top: normalize(50)}} onPress={() => navigation.goBack()}>*/}
      {/*  <BackBlackPath width={normalize(87)} height={normalize(48)}/>*/}
      {/*</TouchableOpacity>*/}
      {openCamera && !cameraAllow && (
        <CameraModal
          isOpen={openCamera}
          setIsOpen={setOpenCamera}
          picture={picture}
          setPicture={setPicture}
          showFirstModal={openFirst}
          setOpenFirst={setOpenFirst}
        />
      )}
      {cameraAllow && (
        <AllowCameraModal
          setIsOpen={setCameraAllow}
          isOpen={cameraAllow}
          checkPermission={checkPermission}
          close={true}
        />
      )}
      <View style={{ paddingLeft: normalize(24), paddingRight: normalize(24) }}>
        <Text style={styles.title}>{i18n.t("checkScooter")}</Text>
        <View style={styles.checkBlock}>
          <View
            style={{
              ...styles.checkItem,
              backgroundColor: "#FE7B01",
              borderColor: "#FE7B01",
              borderWidth: 1,
            }}
          >
            <Entypo name={"check"} style={{ color: "white" }} />
          </View>
          <Text
            style={{ fontSize: normalize(16) }}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
            {i18n.t("scooterOnKickstand")}
          </Text>
        </View>
        <View style={styles.checkBlock}>
          <View
            style={{
              ...styles.checkItem,
              backgroundColor: "#FE7B01",
              borderColor: "#FE7B01",
              borderWidth: 1,
            }}
          >
            <Entypo name={"check"} style={{ color: "white" }} />
          </View>
          <Text
            style={{ fontSize: normalize(16) }}
            numberOfLines={2}
            adjustsFontSizeToFit={true}
          >
            {i18n.t("scooterNotObstruct")}
          </Text>
        </View>
      </View>
      <View>
        <ImagePickBlock width={normalize(366)} height={normalize(227)} />
        <View
          style={{
            ...styles.checkBlock,
            position: "absolute",
            left: normalize(24),
            borderBottomWidth: 0,
            top: normalize(26),
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.checkItem,
              backgroundColor: picture?.uri ? "#FE7B01" : "white",
              borderColor: "#FE7B01",
              borderWidth: 1,
            }}
            onPress={() => dispatch(setPicture(""))}
          >
            <Entypo
              name={"check"}
              style={{ color: picture?.uri ? "white" : "#FE7B01" }}
            />
          </TouchableOpacity>
          <Text
            style={{ fontSize: normalize(16) }}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
          >
            {i18n.t("takePictureScooter")}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.imagePickBlock}
          onPress={() => {
            checkAllow().then((res) => {
              if (res) {
                setOpenCamera(true);
              } else {
                setCameraAllow(true);
              }
            });
          }}
        >
          <Image
            source={{ uri: picture?.uri }}
            style={{ borderRadius: 20, width: 131, height: 131 }}
          />
          {picture?.uri ? (
            <AddedPicture style={{ position: "absolute" }} />
          ) : (
            <AddPicture style={{ position: "absolute" }} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ ...styles.startButtonBlock, alignSelf: "center" }}
        onPress={() => {
          if (!!picture?.uri) {
            navigation.navigate("ResultScreen");
          } else {
            // navigation.navigate('ResultScreen')
            checkAllow().then((res) => {
              if (res) {
                setOpenCamera(true);
              } else {
                setCameraAllow(true);
              }
            });
          }
        }}
      >
        {!!picture ? (
          <ReserveFocusButton width={"100%"} height={normalize(56)} />
        ) : (
          <ReserveButton width={"100%"} height={normalize(56)} />
        )}
        <Text
          style={{ ...styles.buttonText, color: picture ? "white" : "#FE7B01" }}
        >
          {i18n.t("endRide")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  title: {
    fontSize: normalize(24),
    fontWeight: "600",
    fontFamily: GT,
    marginBottom: normalize(32),
  },
  checkBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#DEDEDE",
    paddingBottom: normalize(24),
    marginBottom: normalize(26),
    paddingRight: normalize(24),
  },
  checkItem: {
    backgroundColor: "#FE7B01",
    width: normalize(20),
    height: normalize(20),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: normalize(18),
  },
  startButtonBlock: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: normalize(40),
    flexDirection: "row",
  },
  buttonText: {
    fontSize: normalize(24),
    color: "#FE7B01",
    fontFamily: GT,
    position: "absolute",
  },
  imagePickBlock: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    width: normalize(130),
    height: normalize(130),
    position: "absolute",
    bottom: normalize(24),
    left: normalize(60),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default EndRideScreen;
