import { StyleSheet } from "react-native";
import { styles as css } from "../problem/styles";
import { normalize, SCREEN_WIDTH } from "../../responsive/fontSize";
import { GT } from "../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    ...css.container,
    backgroundColor: "#FE7B01",
  },
  mainBlock__title: {
    ...css.mainBlock__title,
    color: "white",
  },
  mainBlock__description: {
    ...css.mainBlock__description,
    color: "white",
  },
  mainBlock__buttons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 48,
    marginLeft: -48,
  },
  mainBlock__button: {
    width: (SCREEN_WIDTH - 48) / 2,
    // paddingLeft: 40,
  },
  mainBlock__buttonBg: {
    position: "absolute",
    top: 5,
    left: 0,
  },
  input: {
    position: "absolute",
    color: "white",
    width: "100%",
    paddingLeft: normalize(34),
    fontSize: normalize(16),
  },
  promo: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: 60,
    width: SCREEN_WIDTH - 48,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  promo__bg: {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.48,
  },
  promo__name: {
    ...css.mainBlock__title,
    color: "white",
    marginTop: 0,
    fontSize: 16,
  },
  promo__date: {
    ...css.mainBlock__description,
    color: "white",
    marginTop: 0,
    fontSize: 16,
  },
  promo__minutes: {
    ...css.mainBlock__title,
    color: "white",
    marginTop: 0,
    fontSize: 24,
  },
  errorText: {
    alignSelf: "center",
    color: "white",
    fontSize: normalize(16),
    marginTop: normalize(16),
    fontFamily: GT,
    fontWeight: "500",
    textAlign: "center",
  },
  swistMan: {
    position: "absolute",
    bottom: 0,
    right: 50,
  },
});
