import React, { useCallback, useEffect, useState } from "react";
import { styles } from "./styles";
import {
  BackHandler,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  normalize,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../responsive/fontSize";
import BackButton from "../../../assets/payment/backButton.svg";
import AddedPicture from "../../../assets/addedPicture.svg";
import AddPicture from "../../../assets/addPicture.svg";
import { Camera } from "expo-camera";
import { useAuth } from "../../provider/AuthProvider";
import CameraModal from "../../components/CameraModal/CameraModal";
import AllowCameraModal from "../../components/AllowCameraModal";
import ImagePickBlock from "../../../assets/imagePickBlock.svg";
import Entypo from "react-native-vector-icons/Entypo";
import TextareaBlockSvg from "../../../assets/problem/textarea_block.svg";
import sized from "../../utils/sized";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AddNewCardFilledButton from "../../../assets/payment/addNewCardFilledButton.svg";
import ReserveButton from "../../../assets/reserveButton.svg";
import { sendMessage } from "../../api/problemApi";
import { CommonActions, StackActions } from "@react-navigation/native";
import { setPicture, setSelectScooter } from "../../redux/rideReducer";
import { useDispatch, useSelector } from "react-redux";

const TextareaBlockIcon = sized(TextareaBlockSvg, SCREEN_WIDTH, 190);

const ReportDamage = ({ navigation }) => {
  const { i18n, authToken } = useAuth();
  const { picture } = useSelector((state) => state.ride);
  const dispatch = useDispatch();
  const [openCamera, setOpenCamera] = useState(false);
  const [cameraAllow, setCameraAllow] = useState(false);
  const [comment, setComment] = useState("");
  const [isSent, setIsSent] = useState(false);
  const sendMsg = useCallback((text, image) => {
    dispatch(setSelectScooter({}));
    sendMessage(authToken, { text, image })
      .then((data) => {
        navigation.dispatch(StackActions.popToTop());
        navigation.dispatch(StackActions.push("ChatScreen"));
      })
      .catch(() => {
        navigation.dispatch(StackActions.popToTop());
        navigation.dispatch(StackActions.push("ChatScreen"));
      });
  }, []);

  const checkAllow = () => {
    return Camera.getCameraPermissionsAsync().then((res) => {
      return res.granted;
    });
  };
  const checkPermission = () => {
    const [status, requestPermission] = Camera.useCameraPermissions();
    // console.log('status',status)
  };

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    setPicture(setPicture(null));
    // BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      setPicture(setPicture(null));
      setIsSent(false);
      // BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);
  const isValid = picture?.uri && comment.length > 0;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={Keyboard.dismiss}
      style={[styles.container]}
    >
      {openCamera && !cameraAllow && (
        <CameraModal
          isOpen={openCamera}
          setIsOpen={setOpenCamera}
          picture={picture}
          setPicture={setPicture}
          isDamage={true}
          isHideParkModal={true}
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
      <KeyboardAwareScrollView style={{ width: SCREEN_WIDTH, marginLeft: -24 }}>
        <TouchableOpacity
          style={{ position: "absolute", left: 0, top: 0 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={styles.mainBlock}>
          <Text style={[styles.mainBlock__title, styles.mainBlock__ml24]}>
            {i18n.t("reportDamage")}
          </Text>
          <View style={styles.mainBlock__imagePicker}>
            <View style={{ marginLeft: -48 }}>
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
                  onPress={() => setPicture("")}
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
                  {i18n.t("takePictureDamage")}
                </Text>
              </View>
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
          <View style={styles.mainBlock__textareaWrapper}>
            <TextareaBlockIcon style={styles.mainBlock__textareaBg} />
            <TextInput
              multiline={true}
              style={styles.mainBlock__textarea}
              placeholder={i18n.t("yourComment")}
              value={comment}
              onChangeText={setComment}
              placeholderTextColor={"#FE7B01"}
            />
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <TouchableOpacity
        style={styles.mainButton}
        disabled={!isValid || isSent}
        onPress={() => {
          setIsSent(true);
          sendMsg(comment, picture);
        }}
      >
        {isValid ? (
          <AddNewCardFilledButton width={"100%"} height={normalize(56)} />
        ) : (
          <ReserveButton width={"100%"} height={normalize(56)} />
        )}
        <Text style={[styles.buttonText, isValid && { color: "white" }]}>
          {i18n.t("send")}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ReportDamage;
