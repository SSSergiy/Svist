import React from "react";
import { BlurView } from "@react-native-community/blur";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import DeleteModalCardIcon from "../../../assets/deleteModalCardIcon.svg";
import NoButton from "../../../assets/menu/noButton.svg";
import YesButton from "../../../assets/menu/yesButton.svg";
import ModalHeader from "../../../assets/modalErrorHeader.svg";
import { useAuth } from "../../provider/AuthProvider";
import { normalize } from "../../responsive/fontSize";
import CloseButton from "../CloseButton";
import { styles } from "./style";

const DeleteCardModal = ({ setIsOpen, isOpen, onPress }) => {
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
            <DeleteModalCardIcon
              style={{ position: "absolute", bottom: "30%" }}
              width={normalize(24)}
              height={normalize(24)}
            />
          </View>
          <Text style={styles.title}>{i18n.t("areYouSureDeleteCard")}</Text>
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
                {i18n.t("yes")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsOpen(false)}
            >
              <NoButton width={normalize(155)} height={normalize(56)} />
              <Text style={styles.buttonText}>{i18n.t("no")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteCardModal;
