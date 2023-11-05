import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TimeoutModalIcon from "../../../assets/timeoutModalIcon.svg";
import { normalize } from "../../responsive/fontSize";
import ModalButton from "../../../assets/modalButton.svg";
import ModalHeader from "../../../assets/modalHeader.svg";
import { styles } from "./styles";
import CloseIcon from "../../../assets/closeIcon.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../provider/AuthProvider";
import CloseButton from "../CloseButton";
import { BlurView } from "@react-native-community/blur";
import { useDispatch } from "react-redux";
import { setSeconds } from "../../redux/rideReducer";
const TimeoutModal = ({
  setIsOpen,
  isOpen,
  setReservation,
  costSettings,
  reserveScooter,
}) => {
  const { i18n } = useAuth();
  const dispatch = useDispatch();
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
      <BlurView style={styles.overlay} blurType="light" blurAmount={15} />
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
            <TimeoutModalIcon
              style={{
                fontSize: normalize(24),
                color: "white",
                position: "absolute",
              }}
            />
          </View>
          <Text style={styles.title}>{i18n.t("reservationTimedOut")}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsOpen(false);
              dispatch(
                setSeconds(parseInt(costSettings?.max_reserve_minutes * 60))
              );
              reserveScooter();
            }}
          >
            <ModalButton width={normalize(326)} height={normalize(56)} />
            <Text style={styles.buttonText}>{i18n.t("reserveAgain")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TimeoutModal;
