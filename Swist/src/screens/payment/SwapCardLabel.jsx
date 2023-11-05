import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { normalize } from "../../responsive/fontSize";
import SwapCardIcon from "../../../assets/payment/swapCardIcon.svg";
import PickCardIcon from "../../../assets/payment/pickCardIcon.svg";
import DeleteCardIcon from "../../../assets/payment/deleteCardIcon.svg";
import { useSelector } from "react-redux";

const SwapCardLabel = ({
  open,
  changeCard,
  setDeleteCardOpen,
  setOpenBalanceErrorModal,
}) => {
  const { debt, userCards } = useSelector((state) => state.payment);
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 1000,
        top: normalize(-20),
        right: open ? normalize(-13) : 0,
      }}
    >
      <TouchableOpacity
        style={{ ...styles.container }}
        onPress={() => {
          open && changeCard();
        }}
      >
        <View style={styles.inner}>
          <SwapCardIcon />
        </View>
      </TouchableOpacity>
      {open && (
        <TouchableOpacity
          style={{ ...styles.container, top: normalize(20) }}
          onPress={() => {
            // console.log('!!debt?.is_pay_require ::', !!debt?.is_pay_require)
            debt?.is_pay_require
              ? setOpenBalanceErrorModal(true)
              : setDeleteCardOpen(true);
          }}
        >
          <View style={{ ...styles.inner, backgroundColor: "#EF4E4E" }}>
            <DeleteCardIcon />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: normalize(56),
    height: normalize(56),
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 100,
    backgroundColor: "white",
    elevation: 5,
  },
  inner: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FE7B01",
  },
});
export default SwapCardLabel;
