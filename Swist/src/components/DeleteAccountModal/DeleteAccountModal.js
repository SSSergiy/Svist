import React from "react";
import { useAuth } from "../../provider/AuthProvider";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../ExitModal/style";
import CloseButton from "../CloseButton";
import ModalHeader from "../../../assets/modalErrorHeader.svg";
import DeleteIcon from "../../../assets/deleteIcon.svg";
import { normalize } from "../../responsive/fontSize";
import ExitWhite from "../../../assets/exitWhite.svg";
import YesButton from "../../../assets/menu/yesButton.svg";
import NoButton from "../../../assets/menu/noButton.svg";
import { BlurView } from "@react-native-community/blur";

const DeleteAccountModal = ({ isOpen, setIsOpen, onPress }) => {
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
      <BlurView style={styles.overlay} blurType="light" blurAmount={15} />
      <View style={styles.container}>
        <CloseButton onPress={() => setIsOpen(false)} />
        <View style={styles.modalBlock}>
          <View style={styles.logoBlock}>
            <ModalHeader width={normalize(58)} height={normalize(48)} />
            <DeleteIcon
              style={{ position: "absolute", bottom: 0 }}
              width={normalize(40)}
              height={normalize(39)}
            />
          </View>
          <Text style={styles.title}>{i18n.t("deleteAccountPermanently")}</Text>
          <Text style={styles.text}>{i18n.t("youLoseAll")}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <YesButton width={normalize(155)} height={normalize(56)} />
              <Text style={{ ...styles.buttonText, color: "#EF4E4E" }}>
                {i18n.t("delete")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsOpen(false)}
            >
              <NoButton width={normalize(155)} height={normalize(56)} />
              <Text style={styles.buttonText}>{i18n.t("back")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;
