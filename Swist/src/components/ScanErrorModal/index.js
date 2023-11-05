import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../../responsive/fontSize";
import scan from "../../../assets/scan.png";
import ModalHeader from "../../../assets/modalHeader.svg";
import ModalButton from "../../../assets/modalButton.svg";
import { styles } from "./styles";
import CloseIcon from "../../../assets/closeIcon.svg";
import { useAuth } from "../../provider/AuthProvider";

const ScanErrorModal = ({ setIsOpen, isOpen }) => {
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
      <View
        style={styles.container}
        onPress={() => {
          setIsOpen(false);
        }}
      >
        <View style={styles.modalBlock}>
          <View style={styles.logoBlock}>
            <ModalHeader width={normalize(58)} height={normalize(48)} />
            <Image
              source={scan}
              style={{
                width: normalize(24),
                height: normalize(24),
                position: "absolute",
              }}
            />
          </View>
          <Text style={styles.title}>{i18n.t("scanError")}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsOpen(false)}
          >
            <ModalButton width={normalize(326)} height={normalize(56)} />
            <Text style={styles.buttonText}>{i18n.t("continue")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ScanErrorModal;
