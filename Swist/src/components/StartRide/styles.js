import { StyleSheet } from "react-native";
import { normalize } from "../../responsive/fontSize";
import { GT } from "../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reserveRowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#EDEDF1",
    paddingBottom: normalize(14),
  },
  reserveBlock: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: normalize(25),
    width: "100%",
    marginTop: normalize(15),
  },
  reserveTitle: {
    fontFamily: GT,
    fontSize: normalize(24),
    fontWeight: "900",
    fontStyle: "italic",
  },
  buttonText: {
    fontSize: normalize(24),
    color: "#FE7B01",
    fontFamily: GT,
    position: "absolute",
  },

  timerBlock: {
    backgroundColor: "#02C775",
    paddingLeft: normalize(24),
    paddingRight: normalize(24),
    borderRadius: 5,
    width: normalize(117),
    height: normalize(48),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: normalize(8),
  },
  startButtonBlock: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: normalize(24),
    flexDirection: "row",
  },
});
