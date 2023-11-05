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
    opacity: 0.75,
    bottom: 0,
  },
  modalBlock: {
    backgroundColor: "#FE7B01",
    borderRadius: 25,
    padding: normalize(24),
    width: "100%",
  },
  title: {
    fontSize: normalize(24),
    color: "white",
    fontFamily: GT,
    marginBottom: normalize(20),
  },
  text: {
    color: "white",
    fontFamily: GT,
  },
  buttonText: {
    position: "absolute",
    fontSize: normalize(24),
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
});
