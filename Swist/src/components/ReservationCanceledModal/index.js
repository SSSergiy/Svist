import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { normalize } from "../../responsive/fontSize";
import ReservationCanceledIcon from "../../../assets/reservationCanceledIcon.svg";
import ModalHeader from "../../../assets/modalHeader.svg";
import ModalButton from "../../../assets/modalButton.svg";
import { styles } from "./styles";
import CloseIcon from "../../../assets/closeIcon.svg";
import { useAuth } from "../../provider/AuthProvider";
import CloseButton from "../CloseButton";
const ReservationCanceledModal = ({ setIsOpen, isOpen, setReservation }) => {
  const { i18n } = useAuth();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setReservation(false);
        setIsOpen(false);
      }}
    >
      <View style={styles.container}>
        <CloseButton
          onPress={() => {
            setReservation(false);
            setIsOpen(false);
          }}
        />

        <View style={styles.modalBlock}>
          <View style={styles.logoBlock}>
            <ModalHeader width={normalize(58)} height={normalize(48)} />
            <ReservationCanceledIcon
              style={{
                fontSize: normalize(24),
                color: "white",
                position: "absolute",
              }}
            />
          </View>
          <Text style={styles.title}>{i18n.t("reservationCanceled")}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsOpen(false);
              setReservation(false);
            }}
          >
            <ModalButton width={normalize(326)} height={normalize(56)} />
            <Text style={styles.buttonText}>{i18n.t("continue")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReservationCanceledModal;
