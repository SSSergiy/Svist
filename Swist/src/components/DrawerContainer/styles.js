import { Dimensions, Platform, StyleSheet } from "react-native";
import { GT_BOLD } from "../../constants/fonts";
import { normalize } from "../../responsive/fontSize";

export const styles = StyleSheet.create({
  container: {
    padding: normalize(24),
    flex: 1,
    height: Dimensions.get("window").height,
    paddingTop: normalize(50),
    zIndex: 1000,
  },
  label: {
    position: "absolute",
    width: normalize(90),
    height: normalize(48),
    left: Platform.OS === "ios" ? "100%" : "108%",
    zIndex: -100,
    top: 50,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#1F1E1D",
    fontSize: normalize(24),
    fontFamily: GT_BOLD,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: normalize(40),
  },
  menuItemText: {
    color: "#1F1E1D",
    fontSize: normalize(20),
    marginLeft: normalize(25),
    fontFamily: GT_BOLD,
  },
  languageBlock: {
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    bottom: normalize(80),
  },
});
