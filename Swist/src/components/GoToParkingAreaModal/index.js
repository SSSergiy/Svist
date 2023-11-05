import React from "react";
import {
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { normalize } from "../../responsive/fontSize";
import ModalHeader from "../../../assets/modalHeader.svg";
import ModalButton from "../../../assets/modalButton.svg";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";
import CloseIcon from "../../../assets/closeIcon.svg";
import CloseButton from "../CloseButton";
import { BlurView } from "@react-native-community/blur";

const GoToParkingAreaModal = ({ setIsOpen, isOpen }) => {
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
            <MaterialIcons
              name={"local-parking"}
              style={{
                fontSize: normalize(24),
                color: "white",
                position: "absolute",
              }}
            />
          </View>
          <Text style={styles.title}>Go to parking area</Text>
          <Text style={styles.text}>
            You can only finish your ride in one of the designated parking areas
            marked.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsOpen(false)}
          >
            <ModalButton width={normalize(326)} height={normalize(56)} />
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GoToParkingAreaModal;
