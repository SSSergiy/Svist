import React from "react";
import {
  Linking,
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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./styles";
import { Camera } from "expo-camera";
import CloseIcon from "../../../assets/closeIcon.svg";
import { useAuth } from "../../provider/AuthProvider";
import CloseButton from "../CloseButton";
import { BlurView } from "@react-native-community/blur";

const AllowCameraModal = ({ setIsOpen, isOpen, checkPermission }) => {
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
            <MaterialCommunityIcons
              name={"camera-outline"}
              style={{
                fontSize: normalize(24),
                position: "absolute",
                color: "white",
              }}
            />
          </View>

          <Text style={styles.title}>{i18n.t("allowCamera")}</Text>

          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            onPress={() => {
              // checkPermission()
              // Linking.openSettings().then(res=>{
              //   setIsOpen(false)
              // });
              Camera.requestCameraPermissionsAsync().then((res) => {
                if (!res.granted && !res.canAskAgain) {
                  Linking.openSettings();
                }
                setIsOpen(false);
              });
            }}
          >
            <ModalButton width={normalize(326)} height={normalize(56)} />
            <Text style={styles.buttonText}>{i18n.t("allow")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AllowCameraModal;
