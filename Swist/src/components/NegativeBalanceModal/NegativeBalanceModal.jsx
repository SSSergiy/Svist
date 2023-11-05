import React from "react";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../errorModalStyles";
import CloseButton from "../CloseButton";
import ModalButton from "../../../assets/modalButton.svg";
import { normalize } from "../../responsive/fontSize";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ModalHeader from "../../../assets/modalErrorHeader.svg";
import TriangleError from "../../../assets/triangleError.svg";
import { BlurView } from "@react-native-community/blur";

const NegativeBalanceModal = ({
  setIsOpen,
  isOpen,
  setOpenCards,
  setHideButtons,
}) => {
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
        <CloseButton
          onPress={() => {
            setIsOpen(false);
          }}
        />
        <View style={styles.modalBlock}>
          <View style={styles.logoBlock}>
            <ModalHeader
              width={normalize(58)}
              height={normalize(48)}
              style={{ position: "absolute" }}
            />
            <TriangleError />
          </View>

          <Text style={styles.title}>{i18n.t("negativeBalancePay")}</Text>
          {/*<Text style={styles.text}>{errorText||''}</Text>*/}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsOpen(false);
              !!setOpenCards && setOpenCards(false);
              !!setHideButtons && setHideButtons(false);
              navigation.navigate("PaymentScreen");
            }}
          >
            <ModalButton width={"100%"} height={normalize(56)} />
            <Text style={styles.buttonText}>{i18n.t("payment")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NegativeBalanceModal;
