import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  LogBox,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { normalize, SCREEN_WIDTH } from "../../responsive/fontSize";
import LogoWhite from "../../../assets/logoWhite.svg";
import AuthWhiteButton from "../../../assets/authWhiteButton.svg";
import Apple from "../../../assets/apple_black.svg";
import GoogleIcon from "../../../assets/google.svg";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { validationAppleGoogle, validationPhone } from "../../api/authApi";
import OutlineButton from "../../../assets/outlineButton.svg";
import OutlineBtnGrey from "../../../assets/outlineBtnGrey.svg";
import InputLine from "../../../assets/inputLine.svg";
import InputLineGrey from "../../../assets/inputLineGrey.svg";
import ignoreWarnings from "ignore-warnings";
import { GT } from "../../constants/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as AppleAuthentication from "expo-apple-authentication";
import { CountryPicker } from "react-native-country-codes-picker";
import { GOOGLE_ANDROID_ID, GOOGLE_IOS_ID } from "../../constants/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Entypo } from "@expo/vector-icons";
import { isSmallPhone } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountryCode,
  setIsNewUser,
  setIsSent,
  setPhone,
} from "../../redux/authReducer";

// WebBrowser.maybeCompleteAuthSession();
GoogleSignin.configure({
  webClientId: Platform.OS === "ios" ? GOOGLE_IOS_ID : GOOGLE_ANDROID_ID,
});

const LogInScreen = () => {
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [isKeyboard, setIsKeyboard] = useState(false);
  const { appToken, setAuthToken, setAuthKey, setIsAuth, i18n } = useAuth();

  const { phone, countryCode, isSent } = useSelector((state) => state.auth);

  ignoreWarnings("warn", ["ViewPropTypes", "[react-native-gesture-handler]"]);
  //a08b8af1a8b15ee5b58603e987cbf25e
  LogBox.ignoreLogs([
    "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
    "NativeBase: The contrast ratio of",
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);
  const [notificationToken, setNotificationToken] = useState("");

  const [paddingTop, setPaddingTop] = useState(
    new Animated.Value(normalize(175))
  );
  const [marginBottom, setMarginBottom] = useState(new Animated.Value(0));
  const dispatch = useDispatch();
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setIsKeyboard(true);
        Animated.timing(marginBottom, {
          toValue: e.endCoordinates.height - 150,
          // easing: Easing.back(),
          duration: 20,
          useNativeDriver: false,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboard(false);
        Animated.timing(marginBottom, {
          toValue: 0,
          // easing: Easing.back(),
          duration: 20,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    Notifications.getDevicePushTokenAsync().then((res) => {
      // console.log(res.data)
      setNotificationToken(res.data);
    });
  }, []);
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.isFocused()) {
      // GoogleSignin.revokeAccess()
    }
  }, [navigation.isFocused()]);

  useEffect(() => {
    if (Platform.OS === "android") {
      GoogleSignin.configure({
        webClientId: GOOGLE_ANDROID_ID,
        offlineAccess: false,
      });
    }
  }, []);

  async function onGoogleButtonPress(isApple) {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    if (idToken) {
      validationAppleGoogle(idToken, "google").then((res) => {
        if (res.is_new_user) {
          setAuthKey(res?.auth_key);
          navigation.navigate("GoogleInScreen");
        } else {
          setAuthToken(res?.access_token);
          AsyncStorage.setItem("auth", res.access_token);
          setIsAuth(true);
        }
      });
    }
  }

  async function onAppleButtonPress() {
    // Get the users ID token
    let idToken;
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      idToken = credential.identityToken;
    } catch (e) {
      console.log(e);
    }

    if (idToken) {
      validationAppleGoogle(idToken, "apple").then((res) => {
        if (res.is_new_user) {
          setAuthKey(res?.auth_key);
          navigation.navigate("GoogleInScreen");
        } else {
          setAuthToken(res?.access_token);
          AsyncStorage.setItem("auth", res.access_token);
          setIsAuth(true);
        }
      });
    }
  }

  const sentPhone = () => {
    console.log("send");
    dispatch(setIsSent(isSent + 1));
    const newPhone = countryCode + unformattedPhone;
    validationPhone(newPhone, appToken).then((res) => {
      if (res?.data?.success) {
        dispatch(setIsNewUser(res?.data?.isNewUser));
        setIsValidNumber(true);
        navigation.navigate("NumCodeScreen");
        setErrorText("");
      } else {
        setErrorText(res);
        setIsValidNumber(false);
        dispatch(setIsSent(0));
      }
    });
  };
  useEffect(() => {
    if (navigation.isFocused()) {
      dispatch(setIsSent(0));
    }
  }, [phone]);
  const [show, setShow] = useState(false);

  const formattedPhone = phone
    .replace(/\D/g, "")
    .replace(
      /^(\d{1,3})(\d{1,3})?(\d{1,3})?(\d{1,6})?$/,
      function (match, p1, p2, p3, p4) {
        let formattedNumber = "";
        if (p1) {
          formattedNumber += p1;
        }
        if (p2) {
          formattedNumber += " " + p2;
        }
        if (p3) {
          formattedNumber += " " + p3;
        }
        if (p4) {
          formattedNumber += " " + p4;
        }
        return formattedNumber;
      }
    );
  const unformattedPhone = formattedPhone.replace(/ /g, "");
  const validatedPhoneLength = () => {
    return countryCode?.length + unformattedPhone?.length >= 12;
  };

  return (
    <Pressable
      style={[
        {
          ...styles.container,
          backgroundColor: isValidNumber ? "#FE7B01" : "#EF4E4E",
        },
        isKeyboard && { paddingTop: normalize(180) },
      ]}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <LogoWhite />
      <View style={styles.content}>
        <Animated.View style={{ marginBottom }}>
          <View style={{ ...styles.centerBlock, height: normalize(53) }}>
            {phone ? (
              <OutlineButton
                width={Platform.isPad ? SCREEN_WIDTH - 40 : normalize(350)}
              />
            ) : (
              <OutlineBtnGrey
                width={Platform.isPad ? SCREEN_WIDTH - 40 : normalize(350)}
              />
            )}
            <View
              style={{
                position: "absolute",
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                height: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "20%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setShow(true)}
              >
                <Text
                  style={{
                    fontSize: normalize(16),
                    fontFamily: GT,
                    color: "white",
                  }}
                >
                  {countryCode}{" "}
                  <Entypo
                    name="chevron-thin-down"
                    size={normalize(14)}
                    color="white"
                  />
                </Text>
              </TouchableOpacity>
              <View>
                {phone ? (
                  <InputLine height={normalize(32)} />
                ) : (
                  <InputLineGrey height={normalize(32)} />
                )}
              </View>
              <TextInput
                style={{
                  width: "75%",
                  height: "100%",
                  paddingLeft: normalize(10),
                  fontSize: normalize(16),
                  fontFamily: GT,
                  color: "white",
                }}
                placeholderTextColor={"#ffffff"}
                selectionColor={"white"}
                value={formattedPhone}
                maxLength={14}
                keyboardType="number-pad"
                onChangeText={(e) => dispatch(setPhone(e))}
                placeholder={i18n.t("inputPhoneNumber")}
              />
            </View>

            <CountryPicker
              show={show}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={(item) => {
                Keyboard.dismiss();
                console.log(item);
                dispatch(setCountryCode(item.dial_code));
                setShow(false);
              }}
              style={{
                modal: {
                  height: normalize(isSmallPhone ? 400 : 500),
                },
                backdrop: {
                  backgroundColor: "rgba(0, 0, 0, 0.48)",
                },
              }}
              excludedCountries={["RU", "BY", "RS"]}
              // disableBackdrop={true}
              onBackdropPress={() => setShow(false)}
              // initialState={'+421'}
              enableModalAvoiding={true}
            />
          </View>
          {errorText && (
            <Text style={styles.errorText}>
              {errorText || i18n.t("invalidPhoneNumber")}
            </Text>
          )}
          <TouchableOpacity
            style={{ ...styles.centerBlock, marginTop: normalize(16) }}
            disabled={!validatedPhoneLength()}
            onPress={() => sentPhone()}
            accessible={!isSent}
          >
            {validatedPhoneLength() ? (
              <AuthWhiteButton width={normalize(342)} />
            ) : (
              <OutlineBtnGrey width={normalize(342)} />
            )}
            <Text
              style={{
                ...styles.buttonText,
                color: validatedPhoneLength()
                  ? isValidNumber
                    ? "#FE7B01"
                    : "#EF4E4E"
                  : "white",
              }}
            >
              {i18n.t("continue")}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.text}>{i18n.t("continueWith")}</Text>
        <View style={styles.authButtonsRow}>
          {Platform.OS !== "ios" ? (
            <TouchableOpacity
              style={styles.centerBlock}
              onPress={() => {
                onGoogleButtonPress();
              }}
            >
              {/*<AuthMiniInfoButton width={normalize(163)}/>*/}
              <OutlineButton width={normalize(342)} />
              <GoogleIcon style={{ position: "absolute" }} />
            </TouchableOpacity>
          ) : (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
              }
              cornerRadius={5}
              style={{ width: SCREEN_WIDTH - 100, height: 50 }}
              onPress={onAppleButtonPress}
            >
              <View style={styles.centerBlock} pointerEvents={"none"}>
                {/*<AuthMiniInfoButton width={normalize(163)}/>*/}
                <AuthWhiteButton width={normalize(342)} />
                <Apple style={{ position: "absolute" }} />
              </View>
            </AppleAuthentication.AppleAuthenticationButton>
          )}
        </View>
        <Text style={{ ...styles.text, textAlign: "center" }}>
          {i18n.t("terms")}
        </Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FE7B01",
    padding: normalize(24),
    alignItems: "center",
    paddingTop: Platform.isPad ? normalize(180) : normalize(260),
    justifyContent: "space-between",
    paddingBottom: normalize(40),
  },
  content: {
    width: "100%",
    marginTop: normalize(30),
  },
  centerBlock: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    position: "absolute",
    color: "#FE7B01",
    fontSize: Platform.isPad ? normalize(20) : normalize(24),
    fontFamily: GT,
  },
  text: {
    fontSize: normalize(12),
    color: "white",
    alignSelf: "center",
    marginTop: normalize(24),
  },
  phoneInputContainer: {
    backgroundColor: "transparent",
    alignSelf: "center",
    width: "100%",
    color: "white",
    justifyContent: "center",
    position: "absolute",
    height: normalize(53),
    borderRadius: 20,
    marginRight: 0,
    padding: 0,
    fontSize: normalize(16),
    left: normalize(16),
  },
  phoneInputText: {
    backgroundColor: "transparent",
    color: "white",
    width: "100%",
    borderRadius: 20,
    height: normalize(55),
    fontSize: normalize(16),
    justifyContent: "center",
    textAlign: "center",
  },
  errorText: {
    alignSelf: "center",
    color: "white",
    fontSize: normalize(16),
    fontFamily: GT,
    textAlign: "center",
    marginTop: normalize(5),
  },
  authButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: normalize(24),
    justifyContent: "space-around",
  },
});
export default LogInScreen;
