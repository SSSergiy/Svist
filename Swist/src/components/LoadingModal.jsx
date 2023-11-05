import React from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { normalize } from "../responsive/fontSize";
import { useAuth } from "../provider/AuthProvider";
import { GT } from "../constants/fonts";
import { useSelector } from "react-redux";

const LoadingModal = ({ setOpenLoading, visible }) => {
  const { i18n } = useAuth();
  const { isConnectedError, isConnectedErrorOpen } = useSelector(
    (state) => state.ride
  );
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.modalBlock}>
          {/* <Lottie source={require('../assets/loadingAnimation.json')} autoPlay loop /> */}
          {/*<GifImage*/}
          {/*  source={require('../../assets/loadingAnimation.gif')}*/}
          {/*  style={{*/}
          {/*    width: normalize(250),*/}
          {/*    height: normalize(150),*/}
          {/*  }}*/}
          {/*  resizeMode={'cover'}*/}
          {/*/>*/}
          <Image
            source={require("../../assets/loadingAnimation.gif")}
            style={{ height: normalize(150), width: normalize(250) }}
          />

          <Text style={styles.text}>
            {isConnectedError || isConnectedErrorOpen
              ? i18n.t("lostConnectionLoading")
              : i18n.t("loading")}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.48)",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  modalBlock: {
    backgroundColor: "#FE7B01",
    borderRadius: 25,
    padding: normalize(48),
    paddingTop: 0,
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: normalize(24),

    fontWeight: "500",
    fontFamily: GT,
  },
});
export default LoadingModal;
