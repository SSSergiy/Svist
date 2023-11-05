import { Dimensions, Platform, StyleSheet } from "react-native";
import { normalize } from "../../../responsive/fontSize";
import { GT, GT_BOLD } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    height: Dimensions.get("window").height,
    paddingTop: normalize(48),
  },
  header: {
    paddingTop: normalize(96),
  },
  personalInfoBlock: {
    width: normalize(366),
    height: normalize(56),
    padding: normalize(24),
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  infoText: {
    color: "#1F1E1D",
    fontSize: normalize(16),
    fontWeight: "400",
    lineHeight: normalize(24),
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#DEDEDE",
    paddingBottom: normalize(16),
    paddingTop: normalize(21),
  },
  navButtonText: {
    color: "#1F1E1D",
    fontSize: normalize(16),
    fontFamily: GT_BOLD,
    fontWeight: "900",
    marginLeft: normalize(24),
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: normalize(24),
    marginBottom: normalize(40),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#1F1E1D",
    fontSize: normalize(32),
    fontFamily: GT,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: normalize(40),
  },
  menuItemText: {
    color: "#1F1E1D",
    fontSize: normalize(16),
    marginLeft: normalize(15),
    fontFamily: GT_BOLD,
  },
  languageBlock: {
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    bottom: normalize(80),
  },
  personText: {
    fontSize: normalize(16),
    fontFamily: GT_BOLD,
    marginLeft: normalize(30),
  },
  signOut: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: normalize(40),
    paddingLeft: normalize(24),
  },
  signOutText: {
    color: "#EF4E4E",
    fontSize: normalize(16),
    fontFamily: GT_BOLD,
    marginLeft: normalize(26),
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: normalize(16),
  },
  buttonText: {
    fontSize: normalize(24),
    fontFamily: GT,
    color: "#FE7B01",
    position: "absolute",
  },
});
