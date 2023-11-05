import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import partnerImg from "../../../assets/partnerModalImg.png";
import {
  normalize,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../responsive/fontSize";
import ModalHeader from "../../../assets/modalHeader.svg";
import ModalButton from "../../../assets/modalButton.svg";
import { styles } from "./styles";
import CloseIcon from "../../../assets/closeIcon.svg";
import { useAuth } from "../../provider/AuthProvider";
import CloseButton from "../CloseButton";
import { BlurView } from "@react-native-community/blur";

const BecomePartnerModal = ({ setIsOpen, isOpen }) => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 0);
  }, []);
  const { i18n } = useAuth();

  return (
    // <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={isOpen && isShow}
    //     onRequestClose={() => {
    //         setIsOpen(!isOpen);
    //     }}>
    <>
      <BlurView style={styles.overlay} blurType="light" blurAmount={32} />
      <View
        style={[
          styles.container,
          {
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: 10000,
            top: 0,
            left: 0,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
          },
        ]}
      >
        <CloseButton onPress={() => setIsOpen(false)} />
        <View style={styles.modalBlock}>
          <View style={styles.logoBlock}>
            <ModalHeader width={normalize(58)} height={normalize(48)} />
            <Image
              source={partnerImg}
              style={{
                width: normalize(42),
                height: normalize(41),
                position: "absolute",
                bottom: 0,
              }}
            />
          </View>
          <Text style={styles.title}>{i18n.t("weAreNotInCity")}</Text>
          <Text style={styles.text}>
            {i18n.t("preparingToLaunchServiceInCity")}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsOpen(false)}
          >
            <ModalButton width={"100%"} height={normalize(56)} />
            <Text style={styles.buttonText}>{i18n.t("becomePartner")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
    // </Modal>
  );
};

export default BecomePartnerModal;
