import React from "react";
import BackButton from "../components/BackButton";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { normalize } from "../responsive/fontSize";
import LogoWhite from "../../assets/logoWhite.svg";
import { GT } from "../constants/fonts";
import { useAuth } from "../provider/AuthProvider";

const AboutAppScreen = () => {
  const { i18n } = useAuth();
  return (
    <View style={styles.container}>
      <BackButton black={false} />
      <LogoWhite />
      <Text style={styles.version}>{i18n.t("Version")} v.1.0.0</Text>
    </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FE7B01",
    flex: 1,
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: normalize(48),
  },
  version: {
    color: "white",
    fontSize: normalize(16),
    fontWeight: "300",
    marginTop: normalize(40),
  },
});
export default AboutAppScreen;
