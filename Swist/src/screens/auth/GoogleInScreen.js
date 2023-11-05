import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";

import { useNavigation } from "@react-navigation/native";
import { profileUpdate, validationPhone } from "../../api/authApi";
import {
  Animated,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { normalize, SCREEN_WIDTH } from "../../responsive/fontSize";
import AuthBackButton from "../../../assets/authBackButton.svg";
import OutlineButton from "../../../assets/outlineButton.svg";
import ErrorIcon from "../../../assets/errorIcon.svg";
import AuthWhiteButton from "../../../assets/authWhiteButton.svg";
import PhoneInput from "react-native-phone-number-input";
import AntDesign from "react-native-vector-icons/AntDesign";
import InputLine from "../../../assets/inputLine.svg";
import InputLineGrey from "../../../assets/inputLineGrey.svg";
import { GT } from "../../constants/fonts";
import { CountryPicker } from "react-native-country-codes-picker";
import { Entypo } from "@expo/vector-icons";
import { isSmallPhone } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountryCode,
  setIsNewUser,
  setIsSent,
  setPhone,
} from "../../redux/authReducer";
import OutlineBtnGrey from "../../../assets/outlineBtnGrey.svg";

const GoogleInScreen = () => {
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [errorText, setErrorText] = useState("");
  const { appToken, i18n } = useAuth();
  const { phone, countryCode, isSent } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [bottom, setBottom] = useState(new Animated.Value(normalize(40)));
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setIsKeyboardShow(true);
        Animated.timing(bottom, {
          toValue: e.endCoordinates.height + 5,
          // easing: Easing.back(),
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardShow(false);
        Animated.timing(bottom, {
          toValue: normalize(40),
          // easing: Easing.back(),
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const sentPhone = () => {
    console.log("send");
    dispatch(setIsSent(isSent + 1));

    const newPhone = countryCode + unformattedPhone;
    validationPhone(newPhone, appToken).then((res) => {
      if (res?.data?.success) {
        dispatch(setIsNewUser(res?.data?.isNewUser));
        setIsValidNumber(true);
        navigation.navigate("GoogleNumCodeScreen");
        setErrorText(null);
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
    // <ScrollView style={{flex:1}} scrollEnabled={focusEmail}>
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: isValidNumber ? "#FE7B01" : "#EF4E4E",
        paddingTop: isKeyboardShow ? normalize(115) : normalize(175),
      }}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <TouchableOpacity
        style={{ position: "absolute", left: 0, top: normalize(48) }}
        onPress={() => navigation.goBack()}
      >
        <AuthBackButton />
      </TouchableOpacity>
      <View style={{ marginBottom: normalize(24) }}>
        <Text style={styles.title}>{i18n.t("pleaseFillYourPhone")}</Text>
        <Text style={styles.text}>
          {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas risus*/}
          {/*pellentesque.*/}
        </Text>
        <View style={{ ...styles.centerBlock, marginTop: normalize(40) }}>
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
              keyboardType="number-pad"
              placeholderTextColor={"#ffffff"}
              selectionColor={"white"}
              value={formattedPhone}
              maxLength={14}
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
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontSize: normalize(16),
              fontFamily: GT,
              textAlign: "center",
              marginTop: normalize(5),
            }}
          >
            {errorText || i18n.t("invalidPhoneNumber")}
          </Text>
        )}
      </View>

      <Animated.View
        style={{
          position: "absolute",
          bottom: bottom,
          marginTop: normalize(16),
        }}
      >
        <TouchableOpacity
          style={{ ...styles.centerBlock }}
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
    </Pressable>
    // {/*</ScrollView>*/}
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FE7B01",
    padding: normalize(24),
    alignItems: "center",
    paddingTop: normalize(175),
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
    width: "100%",
  },
  buttonText: {
    position: "absolute",
    color: "#FE7B01",
    fontSize: normalize(24),

    fontFamily: GT,
  },
  title: {
    fontSize: normalize(24),
    color: "white",
    marginTop: normalize(24),
    fontWeight: "500",
    fontFamily: GT,
  },
  text: {
    fontSize: normalize(16),
    color: "white",
    marginTop: normalize(16),
  },
  input: {
    position: "absolute",
    color: "white",
    width: "100%",
    paddingLeft: normalize(34),
    fontSize: normalize(16),
  },
  errorText: {
    alignSelf: "center",
    color: "white",
    fontSize: normalize(16),
    marginTop: normalize(16),
    fontFamily: GT,
  },
  phoneInputContainer: {
    backgroundColor: "transparent",
    width: "100%",
    color: "white",
    justifyContent: "center",
    position: "absolute",
    height: normalize(53),
    borderRadius: 20,
    marginRight: 0,
    padding: 0,
    fontSize: normalize(16),
    left: normalize(10),
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
});

export default GoogleInScreen;
