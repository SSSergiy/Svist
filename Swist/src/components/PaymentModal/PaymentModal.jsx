import React, { useRef } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import { normalize } from "../../responsive/fontSize";
import { GT } from "../../constants/fonts";
import { useAuth } from "../../provider/AuthProvider";
import { useDispatch } from "react-redux";
import { setDebt } from "../../redux/paymentReducer";

const PaymentModal = ({ isOpen, setIsOpen, url, setCanGoBack }) => {
  const dispatch = useDispatch();
  const webView = useRef();
  const { i18n } = useAuth();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(!isOpen);
      }}
    >
      <View style={{ flex: 1, marginTop: 40 }}>
        <WebView
          source={{ uri: url }}
          ref={webView}
          onNavigationStateChange={(e) => {
            // console.log(e.title)
            if (
              e.title === "Platba" ||
              e.title === "Оплата" ||
              e.title === "Payment"
            ) {
              setIsOpen(false);
              dispatch(setDebt({}));
              // setCanGoBack(true)
            }
          }}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FE7B01",
            padding: normalize(20),
          }}
          onPress={() => {
            setIsOpen(false);
          }}
          activeOpacity={1}
        >
          <Text
            style={{ color: "white", fontSize: normalize(24), fontFamily: GT }}
          >
            {i18n.t("back")}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PaymentModal;
