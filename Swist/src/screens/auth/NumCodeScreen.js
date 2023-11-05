import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AuthBackButton from "../../../assets/authBackButton.svg";
import OutlineBtnGrey from "../../../assets/outlineBtnGrey.svg";
import NumCodeBlock from "../../../assets/numCodeBlock.svg";
import { normalize } from "../../responsive/fontSize";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import ResetCodeModal from "../../components/ResetCodeModal";
import { validationCode } from "../../api/authApi";
import { useAuth } from "../../provider/AuthProvider";
import AuthWhiteButton from "../../../assets/authWhiteButton.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GT } from "../../constants/fonts";
import { useDispatch, useSelector } from "react-redux";
import { setIsSent, setPhone } from "../../redux/authReducer";

const NumCodeScreen = () => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { setAuthToken, authToken, setIsAuth, appToken, i18n } = useAuth();
  const dispatch = useDispatch();
  const { isNewUser, phone, countryCode } = useSelector((state) => state.auth);
  const [resetTime, setResetTime] = useState(30);
  const [reset, setReset] = useState(false);
  const [isValidCode, setIsValidCode] = useState(true);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [isAddedToken, setIsAddedToken] = useState(false);
  const navigation = useNavigation();
  const codeStyles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: "center", fontSize: 30 },
    codeFieldRoot: { marginTop: 20, width: "100%" },
    cell: {
      lineHeight: 38,
      fontSize: normalize(16),
      textAlign: "center",
      position: "absolute",
      color: "white",
    },
    focusCell: {
      borderColor: "#000",
    },
  });
  useEffect(() => {
    if (resetTime !== 0) {
      let myInterval = setInterval(() => {
        setResetTime(resetTime - 1);
      }, 1000);

      return () => clearInterval(myInterval);
    }
  }, [resetTime]);
  const sentCode = () => {
    validationCode(countryCode + phone, value, appToken).then((res) => {
      if (res.access_token) {
        setAuthToken(res.access_token || "");
        setIsAddedToken(true);
        setErrorText("");
      } else {
        setIsAddedToken(false);
        setErrorText(res);
      }
    });
  };
  useEffect(() => {
    // navigation.navigate("AboutScreen");
    if (isAddedToken) {
      if (authToken) {
        setError(false);

        if (isNewUser) {
          navigation.navigate("AboutScreen");
        } else {
          dispatch(setPhone(countryCode + phone));
          AsyncStorage.setItem("auth", authToken);
          setIsAuth(true);
        }
      } else {
        setError(true);
      }
    }
  }, [isAddedToken]);
  useEffect(() => {
    if (navigation.isFocused()) {
      setIsAddedToken(false);
      const time = setTimeout(() => {
        dispatch(setIsSent(0));
      }, 1000);
      return () => {
        clearTimeout(time);
      };
    }
  }, [navigation.isFocused()]);
  useEffect(() => {
    if (value.length === 4) {
      sentCode();
    }
  }, [value]);
  return (
    <Pressable
      onPress={Keyboard.dismiss}
      style={{
        ...styles.container,
        backgroundColor: !errorText || error ? "#FE7B01" : "#EF4E4E",
      }}
    >
      {reset && (
        <ResetCodeModal
          isOpen={reset}
          setIsOpen={setReset}
          setResetTime={setResetTime}
          code={value}
          setCode={setValue}
          setErrorText={setErrorText}
        />
      )}
      <TouchableOpacity
        style={{ position: "absolute", left: 0, top: normalize(50) }}
        onPress={() => navigation.goBack()}
      >
        {/*<BackPath/>*/}
        <AuthBackButton />
      </TouchableOpacity>
      <View style={{ width: "100%" }}>
        <Text style={styles.title}>{i18n.t("enterSms")}</Text>
        <Text style={styles.text}>
          {i18n.t("sentSms")} {countryCode} {phone.replace(/\s/g, "")}
        </Text>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={4}
          rootStyle={codeStyles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View style={styles.centerBlock} key={index}>
              <NumCodeBlock width={normalize(74)} />
              <Text
                key={index}
                style={[codeStyles.cell, isFocused && codeStyles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : "x")}
              </Text>
            </View>
          )}
        />
        {errorText && <Text style={styles.errorText}>{errorText}</Text>}
        {error && <Text style={styles.errorText}>{i18n.t("error")}</Text>}
        <Text
          style={{
            alignSelf: "center",
            color: "white",
            marginTop: normalize(120),
            fontWeight: "500",
            fontFamily: GT,
          }}
          onPress={() => {
            resetTime === 0 && setReset(true);
          }}
        >
          {resetTime > 0 ? (
            <>
              {i18n.t("resendCodeIn")}
              <Text style={{ fontSize: 26, fontWeight: "900" }}>
                {" "}
                {resetTime}
              </Text>
            </>
          ) : (
            i18n.t("resendCode")
          )}
        </Text>
      </View>
      <TouchableOpacity
        style={{ ...styles.centerBlock, marginTop: normalize(18) }}
        onPress={() => {
          sentCode();
        }}
      >
        {value.length === 4 ? (
          <AuthWhiteButton width={normalize(342)} />
        ) : (
          <OutlineBtnGrey width={normalize(342)} />
        )}
        <Text
          style={{
            ...styles.buttonText,
            color:
              value.length === 4
                ? !errorText
                  ? "#FE7B01"
                  : "#EF4E4E"
                : "white",
          }}
        >
          {i18n.t("continue")}
        </Text>
      </TouchableOpacity>
    </Pressable>
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
    color: "white",
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
    alignSelf: "center",
    marginTop: normalize(16),
    fontFamily: GT,
  },
  errorText: {
    alignSelf: "center",
    textAlign: "center",
    color: "white",
    fontSize: normalize(16),
    marginTop: normalize(16),
    fontFamily: GT,
  },
});

export default NumCodeScreen;
