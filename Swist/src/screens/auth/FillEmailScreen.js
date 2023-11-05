import React, { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { normalize } from "../../responsive/fontSize";
import ErrorIcon from "../../../assets/errorIcon.svg";
import AuthWhiteButton from "../../../assets/authWhiteButton.svg";
import OutlineButton from "../../../assets/outlineButton.svg";
import OutlineBtnGrey from "../../../assets/outlineBtnGrey.svg";
import { profileUpdate } from "../../api/authApi";
import AuthBackButton from "../../../assets/authBackButton.svg";
import { GT, GT_BOLD } from "../../constants/fonts";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../../redux/authReducer";

const FillEmailScreen = () => {
  const { authToken, i18n } = useAuth();
  const dispatch = useDispatch();
  const { name, surname, email } = useSelector((state) => state.auth);
  const [focusEmail, setFocusEmail] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [marginBottom, setMarginBottom] = useState(new Animated.Value(0));
  const [paddingTop, setPaddingTop] = useState(
    new Animated.Value(normalize(175))
  );
  const navigation = useNavigation();

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
          toValue: 90,
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

  useEffect(() => {
    setErrorText("");
  }, [email]);

  const validateEmail = () => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const sendInfo = () => {
    profileUpdate(name, surname, email, "", authToken)
      .then(() => {
        setErrorText("");
        navigation.navigate("FillAgeScreen");
      })
      .catch((err) => {
        setErrorText(err);
      });
  };

  return (
    // <ScrollView style={{flex:1}} scrollEnabled={focusEmail}>
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <Animated.View
        style={{
          ...styles.container,
          backgroundColor: errorText ? "#EF4E4E" : "#FE7B01",
          paddingTop,
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute", left: 0, top: normalize(48) }}
          onPress={() => navigation.goBack()}
        >
          <AuthBackButton />
        </TouchableOpacity>
        <View style={{ width: "100%", marginBottom: normalize(24) }}>
          <Text style={styles.title}>{i18n.t("enterEmail")}</Text>
          <Text style={styles.text}>{i18n.t("enterValidEmail")}</Text>

          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: normalize(40),
              width: "100%",
            }}
          >
            {focusEmail ? (
              <OutlineButton width={"100%"} />
            ) : (
              <OutlineButton opacity={"0.24"} width={"100%"} />
            )}
            <TextInput
              placeholder={i18n.t("fillEmail")}
              style={styles.input}
              placeholderTextColor={"white"}
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={(e) => dispatch(setEmail(e.replace(" ", "")))}
              value={email}
              onFocus={() => setFocusEmail(true)}
              onBlur={() => setFocusEmail(false)}
            />
            {errorText && (
              <ErrorIcon
                style={{ position: "absolute", right: normalize(34) }}
              />
            )}
          </TouchableOpacity>
          {errorText && <Text style={styles.errorText}>{errorText}</Text>}
        </View>
        <Animated.View style={{ marginBottom }}>
          <TouchableOpacity
            style={[{ ...styles.centerBlock }]}
            onPress={() => {
              sendInfo();
            }}
          >
            {email ? (
              <AuthWhiteButton width={normalize(342)} />
            ) : (
              <OutlineBtnGrey width={normalize(342)} />
            )}
            <Text
              style={{
                ...styles.buttonText,
                color: errorText
                  ? email
                    ? "#EF4E4E"
                    : "white"
                  : email
                  ? "#FE7B01"
                  : "white",
              }}
            >
              {i18n.t("continue")}
            </Text>
          </TouchableOpacity>
        </Animated.View>
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
    fontWeight: "500",
    textAlign: "center",
  },
});

export default FillEmailScreen;
