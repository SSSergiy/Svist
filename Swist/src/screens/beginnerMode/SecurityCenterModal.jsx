import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { normalize } from "../../responsive/fontSize";
import { GT, GT_BOLD } from "../../constants/fonts";
import CloseButton from "../../components/CloseButton";
import { useAuth } from "../../provider/AuthProvider";
import BeginnerIcon from "../../../assets/beginnerMode/beginnerModeIcon.svg";
import HowToRideIcon from "../../../assets/beginnerMode/howToRideIcon.svg";
import SecurityLogo from "../../../assets/beginnerMode/securityLogo.svg";
import LocalRulesIcon from "../../../assets/beginnerMode/localRulesIcon.svg";
import SwitchButton from "../../../assets/beginnerMode/switchButton.svg";
import SwitchButtonActive from "../../../assets/beginnerMode/switchButtonActive.svg";
import SwitchBg from "../../../assets/beginnerMode/switchBg.svg";
import { useNavigation } from "@react-navigation/native";
import { updateBeginnerMode } from "../../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/paymentReducer";

const SecurityCenterModal = ({ isOpen, setIsOpen, onPress }) => {
  const { i18n, authToken } = useAuth();
  const { user } = useSelector((state) => state.payment);
  const [beginnerMode, setBeginnerMode] = useState(user?.beginner_mode);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   getProfileInfo(authToken).then(info => {
  //     // console.log('info',info?.avaliable_free_trip)
  //     setBeginnerMode(info?.beginner_mode)
  //
  //   })
  // },[])
  const updateMode = (mode) => {
    updateBeginnerMode(mode, authToken).then((res) => {
      if (res.data?.success) {
        setBeginnerMode(mode);
        dispatch(setUser({ ...user, beginner_mode: mode }));
      }
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(!isOpen);
      }}
    >
      <Pressable style={styles.container} onPress={() => setIsOpen(false)}>
        <CloseButton
          onPress={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        />
        <Pressable
          style={styles.content}
          onPress={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <Text style={styles.title}>{i18n.t("safetyCenter")}</Text>
          <Text style={styles.text}>{i18n.t("setPreferences")}</Text>
          <View style={styles.itemRow}>
            <View style={styles.rowContainer}>
              <BeginnerIcon />
              <View style={{ marginLeft: normalize(30) }}>
                <Text style={styles.itemRow__title}>{i18n.t("beginner")}</Text>
                <Text style={styles.itemRow__text}>
                  {i18n.t("limitSpeed15")}
                </Text>
              </View>
            </View>
            <TouchableOpacity
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
          <TouchableOpacity
            style={styles.itemRow}
            onPress={() => {
              setIsOpen(false);
              navigation.navigate("Tutorial");
            }}
          >
            <View style={styles.rowContainer}>
              <HowToRideIcon />
              <View style={{ marginLeft: normalize(30) }}>
                <Text style={styles.itemRow__title}>{i18n.t("howToRide")}</Text>
                <Text style={styles.itemRow__text}>
                  {i18n.t("learnMoreAboutGettingStarted")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemRow}
            onPress={() => {
              setIsOpen(false);
              navigation.navigate("SafetyScreen");
            }}
          >
            <View style={styles.rowContainer}>
              <SecurityLogo />
              <View style={{ marginLeft: normalize(30) }}>
                <Text style={styles.itemRow__title}>
                  {i18n.t("safetyTips")}
                </Text>
                <Text style={styles.itemRow__text}>
                  {i18n.t("learnMoreAboutRoadSafety")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemRow}
            onPress={() => {
              setIsOpen(false);
              navigation.navigate("TermsScreen");
            }}
          >
            <View style={styles.rowContainer}>
              <LocalRulesIcon />
              <View style={{ marginLeft: normalize(30) }}>
                <Text style={styles.itemRow__title}>
                  {i18n.t("localRules")}
                </Text>
                <Text style={styles.itemRow__text}>
                  {i18n.t("learnMoreAboutLocalRequirements")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.48)",
  },

  content: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    padding: normalize(24),
    paddingTop: normalize(32),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: normalize(24),
    fontFamily: GT_BOLD,
    color: "black",
    marginBottom: normalize(16),
  },
  text: {
    color: "black",
    fontSize: normalize(16),
    fontFamily: GT,
  },
  itemRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: normalize(24),
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#DEDEDE",
    paddingBottom: normalize(16),
  },

  itemRow__title: {
    fontSize: normalize(16),
    fontFamily: GT_BOLD,
    color: "black",
    marginBottom: normalize(8),
  },
  itemRow__text: {
    fontSize: normalize(16),
    fontFamily: GT,
    color: "black",
  },
});
export default SecurityCenterModal;
