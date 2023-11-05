import { StyleSheet } from "react-native";
import { normalize } from "../../responsive/fontSize";
import { GT } from "../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.48)",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    opacity: 0.6,
    backgroundColor: "rgba(0, 0, 0, .45)",
    bottom: 0,
  },
  modalBlock: {
    backgroundColor: "#FE7B01",
    borderRadius: 25,
    padding: normalize(24),
  },
  title: {
    fontSize: normalize(24),
    color: "white",
    marginBottom: normalize(16),
    fontFamily: GT,
  },
  text: {
    color: "white",
    fontFamily: GT,
  },
  logoBlock: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginBottom: normalize(25),
    width: normalize(58),
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: normalize(40),
  },
  buttonText: {
    fontSize: normalize(24),
    color: "white",
    fontFamily: GT,
    position: "absolute",
  },
  gpsBlock: {
    backgroundColor: "#FF9837",

    width: 38,
    height: 48,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
