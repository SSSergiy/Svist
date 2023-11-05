import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../../responsive/fontSize";
import { GT, GT_BOLD } from "../../constants/fonts";
import LogoWhite from "../../../assets/logoWhite.svg";
import CongratsSvg from "../../../assets/promocodes/congrats.svg";
import { styles as mainStyles } from "../problem/styles";
import WhiteButton from "../../../assets/authWhiteButton.svg";
import OutlineButton from "../../../assets/outlineButton.svg";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const { i18n } = useAuth();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LogoWhite width={normalize(100)} height={normalize(45)} />
      <CongratsSvg style={{ marginTop: normalize(60) }} />
      <Text style={styles.descriptionTitle}>
        {i18n.t("thankForRegistration")}
      </Text>
      <Text style={styles.descriptionText}>{i18n.t("welcomeToSvist")}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Tutorial")}
      >
        <WhiteButton
          width={"100%"}
          height={normalize(56)}
          style={{ position: "absolute" }}
        />
        <Text style={styles.buttonText}>{i18n.t("continue")}</Text>
      </TouchableOpacity>
    </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FE7B01",
    alignItems: "center",
    justifyContent: "center",
    padding: normalize(24),
    paddingTop: normalize(60),
    paddingBottom: normalize(80),
  },
  descriptionBlock: {
    width: normalize(366),
    height: normalize(256),
    paddingTop: normalize(24),
    paddingRight: normalize(24),
    paddingLeft: normalize(56),
    justifyContent: "space-between",
    paddingBottom: normalize(40),
  },
  descriptionTitle: {
    fontSize: normalize(24),
    fontFamily: GT_BOLD,
    color: "white",
    width: "100%",
    marginBottom: normalize(16),
    marginTop: normalize(48),
  },
  descriptionText: {
    fontSize: normalize(16),
    // fontFamily: GT,
    color: "white",
    lineHeight: 24,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: normalize(56),
  },
  buttonText: {
    color: "#FE7B01",
    fontSize: normalize(24),
    fontFamily: GT,
  },
});
export default Welcome;
