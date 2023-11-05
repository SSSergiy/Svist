import React, { useEffect, useState } from "react";
import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import MindIcon from "../../../assets/beginnerMode/mindIcon.svg";
import SwitchButton from "../../../assets/beginnerMode/switchButton.svg";
import SwitchButtonActive from "../../../assets/beginnerMode/switchButtonActive.svg";
import SwitchBg from "../../../assets/beginnerMode/switchBg.svg";
import BeginnerIcon from "../../../assets/beginnerMode/beginnerModeIcon.svg";
import { normalize } from "../../responsive/fontSize";
import ContactButton from "../../../assets/reserveButton.svg";
import { useAuth } from "../../provider/AuthProvider";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { updateBeginnerMode } from "../../api/authApi";
import ReserveFocusButton from "../../../assets/reserveFocusButton.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsNewUser } from "../../redux/authReducer";
import { setUser } from "../../redux/paymentReducer";

const BeginnerSafety = () => {
  const [beginnerMode, setBeginnerMode] = useState(user?.beginner_mode || 0);
  const { i18n, authToken } = useAuth();
  const { user } = useSelector((state) => state.payment);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [press, setPress] = useState(false);
  const dispatch = useDispatch();

  const updateMode = (mode) => {
    setPress(true);
    updateBeginnerMode(mode, authToken).then((res) => {
      if (res.data?.success) {
        setBeginnerMode(mode);
        dispatch(setUser({ ...user, beginner_mode: mode }));
      }
      setPress(false);
    });
  };
  useEffect(() => {
    setBeginnerMode(user?.beginner_mode || 0);
    dispatch(setIsNewUser(false));
  }, [isFocused]);
  useEffect(() => {
    console.log(beginnerMode);
  }, [beginnerMode]);
  return (
    <View style={styles.container}>
      <View>
        <MindIcon style={{ alignSelf: "flex-end", bottom: normalize(-20) }} />
        <Text style={styles.descriptionTitle}>
          {i18n.t("safetyComesFirst")}
        </Text>
        <Text style={styles.descriptionText}>
          {i18n.t("noScooterExperience")}
        </Text>
        <View style={styles.line}></View>
        <View style={styles.beginnerModeRow}>
          <View style={styles.rowContainer}>
            <BeginnerIcon />
            <View style={{ marginLeft: normalize(30) }}>
              <Text style={styles.beginnerModeRow__title}>
                {i18n.t("beginner")}
              </Text>
              <Text style={styles.beginnerModeRow__text}>
                {i18n.t("limitSpeed15")}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            disabled={press}
            style={{ justifyContent: "center", width: normalize(40) }}
            onPress={() => {
              beginnerMode === 0 ? updateMode(1) : updateMode(0);
            }}
          >
            {beginnerMode === 1 ? (
              <SwitchButtonActive
                style={{ position: "absolute", zIndex: 2, right: 0 }}
                width={normalize(26)}
              />
            ) : (
              <SwitchButton
                style={{ position: "absolute", zIndex: 2 }}
                width={normalize(26)}
              />
            )}
            <SwitchBg width={normalize(40)} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={{ ...styles.button, marginBottom: normalize(80) }}
        onPress={() => navigation.navigate("SecurityCenterHighlight")}
      >
        {beginnerMode === 0 ? (
          <ContactButton width={normalize(342)} height={normalize(56)} />
        ) : (
          <ReserveFocusButton width={"100%"} height={normalize(56)} />
        )}
        {beginnerMode === 0 ? (
          <Text style={styles.buttonText}>{i18n.t("notNow")}</Text>
        ) : (
          <Text style={{ ...styles.buttonText, color: "white" }}>
            {i18n.t("continue")}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BeginnerSafety;
