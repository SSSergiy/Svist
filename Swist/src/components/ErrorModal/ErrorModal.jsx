import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../../responsive/fontSize";
import ModalButton from "../../../assets/modalButton.svg";
import { styles } from "./styles";
import CloseIcon from "../../../assets/closeIcon.svg";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import CloseButton from "../CloseButton";
import { BlurView } from "@react-native-community/blur";

const ErrorModal = ({ setIsOpen, isOpen, errorText }) => {
  const { i18n } = useAuth();
  const navigation = useNavigation();
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
          {/*<View style={styles.logoBlock}>*/}
          {/*  <ModalHeader width={normalize(58)} height={normalize(48)}/>*/}
          {/*  <MaterialIcons name={'gps-off'} style={{fontSize: normalize(24), color: 'white', position: 'absolute'}}/>*/}
          {/*</View>*/}

          <Text style={styles.title}>{i18n.t("error")}</Text>
          <Text style={styles.text}>{errorText || ""}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (
                errorText === "Поездка не найдена" ||
                errorText === "Jazda sa nenašla" ||
                errorText === "Подорож не було знайдено" ||
                errorText === "The trip was not found"
              ) {
                navigation.navigate("MainScreen");
              }
              setIsOpen(false);
            }}
          >
            <ModalButton width={"100%"} height={normalize(56)} />
            <Text style={styles.buttonText}>{i18n.t("close")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
