import { StyleSheet } from "react-native";
import { normalize } from "../../responsive/fontSize";

export const styles = StyleSheet.create({
  header: {
    borderRadius: 25,
    paddingTop: normalize(18),
    position: "absolute",
    width: "100%",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    top: normalize(-35),
    height: "100%",
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    padding: normalize(24),
    paddingTop: 0,
    paddingBottom: normalize(0),
  },
  text: {
    color: "white",
    marginLeft: normalize(18),
    fontSize: normalize(16),
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 30,
    borderTopWidth: 100,
    borderRightColor: "transparent",
    borderTopColor: "#EF4E4E",
    position: "absolute",
    right: normalize(53),
    transform: [{ rotate: "180deg" }],
  },
});
