import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../components/BackButton";
import { normalize } from "../responsive/fontSize";
import ScrollViewIndicator from "react-native-scroll-indicator";
import ContactButton from "../../assets/reserveButton.svg";
import { GT, GT_BOLD } from "../constants/fonts";
import { getPrivacy } from "../api/authApi";
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicyScreen = () => {
  const { i18n, authToken } = useAuth();
  const [text, setText] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    getPrivacy(authToken).then((res) => {
      setText(res.politic);
    });
  }, []);
  return (
    <View style={styles.container}>
      <BackButton withLogo={true} />
      <View
        style={{
          ...styles.content,
          paddingTop: normalize(96),
          paddingRight: normalize(8),
        }}
      >
        <Text style={styles.infoTitle}>{i18n.t("privacyPolicy")}</Text>
        {!text ? (
          <ActivityIndicator
            size={"large"}
            color={"#FE7B01"}
            style={{ flex: 1 }}
          />
        ) : (
          <ScrollViewIndicator
            style={{ flex: 1, paddingRight: normalize(16) }}
            scrollIndicatorStyle={{ backgroundColor: "#FFD5AE" }}
            useNativeDriver={false}
          >
            <Text style={styles.infoText}>{text}</Text>
          </ScrollViewIndicator>
        )}
      </View>
      <TouchableOpacity
        style={{ ...styles.button, marginBottom: normalize(80) }}
        onPress={() => navigation.navigate("ChatScreen")}
      >
        <ContactButton width={normalize(342)} height={normalize(56)} />
        <Text style={styles.buttonText}>{i18n.t("contactUs")}</Text>
      </TouchableOpacity>
    </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    height: Dimensions.get("window").height,
    paddingTop: normalize(48),
  },

  content: {
    padding: normalize(24),
    paddingTop: normalize(48),
    flex: 1,
    height: Dimensions.get("window").height,
  },
  infoTitle: {
    color: "#1F1E1D",
    fontSize: normalize(24),
    fontFamily: GT_BOLD,
    paddingBottom: normalize(24),
  },
  infoText: {
    color: "#1F1E1D",
    fontSize: normalize(16),
    lineHeight: normalize(24),
    fontWeight: "400",
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: normalize(16),
  },
  buttonText: {
    fontSize: normalize(24),
    fontFamily: GT_BOLD,
    color: "#FE7B01",
    position: "absolute",
  },
});

export default PrivacyPolicyScreen;
