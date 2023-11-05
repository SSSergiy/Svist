import React, { useEffect, useState } from "react";
import {
  Animated,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { normalize } from "../../responsive/fontSize";
import ErrorIcon from "../../../assets/errorIcon.svg";
import AuthWhiteButton from "../../../assets/authWhiteButton.svg";
import AuthMiniInfoButton from "../../../assets/authMiniInfoButton.svg";
import OutlineBtnGrey from "../../../assets/outlineBtnGrey.svg";
import AuthBackButton from "../../../assets/authBackButton.svg";
import { GT, GT_BOLD } from "../../constants/fonts";
import { profileUpdate } from "../../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setName, setSurname } from "../../redux/authReducer";

const AboutScreen = () => {
  const dispatch = useDispatch();
  const { i18n, authToken } = useAuth();
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const { user } = useSelector((state) => state.payment);
  const [errorName, setErrorName] = useState(false);
  const [errorSurName, setErrorSurName] = useState(false);
  const [focusName, setFocusName] = useState(false);
  const [focusSurname, setFocusSurname] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const navigation = useNavigation();
  const [errorText, setErrorText] = useState("");
  const [marginBottom, setMarginBottom] = useState(new Animated.Value(0));
  const [paddingTop, setPaddingTop] = useState(
    new Animated.Value(normalize(175))
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const checkInfo = () => {
    let matchesName = userName.match(/\d+/g);
    let matchesSurName = userSurname.match(/\d+/g);
    matchesName !== null ? setErrorName(true) : setErrorName(false);
    matchesSurName !== null ? setErrorSurName(true) : setErrorSurName(false);
    return (
      matchesName === null && matchesSurName === null && userSurname && userName
    );
  };
  const sendInfo = () => {
    profileUpdate(userName, userSurname, "", "", authToken).then((res) => {
      if (res?.data?.data?.success) {
        if (checkInfo()) {
          if (userName && userSurname) {
            dispatch(setName(userName));
            dispatch(setSurname(userSurname));

            user?.email
              ? navigation.navigate("AddPaymentScreen")
              : navigation.navigate("FillEmailScreen");
          }
        }
        setErrorText("");
      } else {
        setErrorText(res);
        console.log("setErrorText, res: ", res);
      }
    });
  };

  useEffect(() => {
    setErrorSurName(false);
    setErrorName(false);
    setErrorText("");
  }, [userName, userSurname]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
        Animated.timing(marginBottom, {
          toValue: 320,
          // easing: Easing.back(),
          duration: 200,
          useNativeDriver: false,
        }).start();
        Animated.timing(paddingTop, {
          toValue: 70,
          // easing: Easing.back(),
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
        Animated.timing(marginBottom, {
          toValue: 0,
          // easing: Easing.back(),
          duration: 200,
          useNativeDriver: false,
        }).start();
        Animated.timing(paddingTop, {
          toValue: normalize(175),
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
  return (
    // <ScrollView style={{flex:1}} scrollEnabled={focusName||focusSurname}>
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <View
        style={{
          ...styles.container,
          backgroundColor:
            errorSurName || errorName || errorText ? "#EF4E4E" : "#FE7B01",
          paddingTop: isKeyboardVisible ? normalize(115) : normalize(175),
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute", left: 0, top: normalize(48) }}
          onPress={() => navigation.goBack()}
        >
          <AuthBackButton />
        </TouchableOpacity>
        <View style={{ width: "100%", marginBottom: normalize(24) }}>
          <Text style={styles.title}>{i18n.t("tellAboutYou")}</Text>
          <Text style={styles.text}>{i18n.t("whatsYourName")}</Text>
          <View style={styles.rowAround}>
            <Pressable style={styles.centerBlock}>
              {focusName ? (
                <AuthMiniInfoButton />
              ) : (
                <AuthMiniInfoButton opacity={"0.24"} />
              )}
              <TextInput
                placeholder={i18n.t("name")}
                style={styles.input}
                placeholderTextColor={"white"}
                value={userName}
                onChangeText={(e) => setUserName(e)}
                onFocus={() => setFocusName(true)}
                onBlur={() => setFocusName(false)}
                focusable={focusName}
              />
              {errorName && (
                <ErrorIcon
                  style={{ position: "absolute", right: normalize(24) }}
                />
              )}
            </Pressable>
            <Pressable style={styles.centerBlock}>
              {focusSurname ? (
                <AuthMiniInfoButton />
              ) : (
                <AuthMiniInfoButton opacity={"0.24"} />
              )}
              <TextInput
                placeholder={i18n.t("surname")}
                style={styles.input}
                placeholderTextColor={"white"}
                value={userSurname}
                onChangeText={(e) => setUserSurname(e)}
                onFocus={() => setFocusSurname(true)}
                onBlur={() => setFocusSurname(false)}
              />
              {errorSurName && (
                <ErrorIcon
                  style={{ position: "absolute", right: normalize(24) }}
                />
              )}
            </Pressable>
          </View>
          {errorName && (
            <Text style={styles.errorText}>{i18n.t("incorrectName")}</Text>
          )}
          {errorSurName && (
            <Text style={styles.errorText}>{i18n.t("incorrectSurName")}</Text>
          )}
          {errorText && <Text style={styles.errorText}>{errorText}</Text>}
        </View>
        <Animated.View style={{ marginBottom }}>
          <TouchableOpacity
            style={{ ...styles.centerBlock }}
            disabled={!userName || !userSurname}
            onPress={() => {
              sendInfo();
            }}
          >
            {userName && userSurname ? (
              <AuthWhiteButton width={normalize(342)} />
            ) : (
              <OutlineBtnGrey width={normalize(342)} />
            )}
            <Text
              style={{
                ...styles.buttonText,
                color:
                  errorSurName || errorName || errorText
                    ? userName && userSurname
                      ? "#EF4E4E"
                      : "white"
                    : userName && userSurname
                    ? "#FE7B01"
                    : "white",
              }}
            >
              {i18n.t("continue")}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
    paddingLeft: normalize(24),
    fontSize: normalize(16),
    height: "85%",
  },
  errorText: {
    alignSelf: "center",
    color: "white",
    fontSize: normalize(16),
    marginTop: normalize(16),
    fontFamily: GT,
  },
  rowAround: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: normalize(40),
    justifyContent: "space-around",
  },
});
export default AboutScreen;
