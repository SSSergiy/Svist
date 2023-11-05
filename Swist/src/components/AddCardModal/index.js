import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { normalize } from "../../responsive/fontSize";
import ReserveButton from "../../../assets/reserveButton.svg";
import AddCard from "../../../assets/addCard.svg";
import { useNavigation } from "@react-navigation/native";
import CloseIcon from "../../../assets/closeIcon.svg";
import { useAuth } from "../../provider/AuthProvider";
import CloseButton from "../CloseButton";
import { BlurView } from "@react-native-community/blur";

const AddCardModal = ({ setIsOpen, isOpen }) => {
  const navigation = useNavigation();
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
        <CloseButton
          onPress={() => {
            setIsOpen(false);
          }}
        />

        <View style={styles.modalBlock}>
          <AddCard style={{ marginBottom: normalize(24) }} />
          <Text style={styles.title}>{i18n.t("beforeYourRide")}</Text>
          <Text style={styles.text}>{i18n.t("enterYourCardDetails")}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // setIsAdded(true)
              setIsOpen(false);
              navigation.navigate("AddNewCardScreen");
            }}
          >
            <ReserveButton />
            <Text style={styles.buttonText}>{i18n.t("addCard")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddCardModal;
