import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../../responsive/fontSize";
import { styles } from "./styles";
import FreeRide from "../../../assets/freeRide.svg";
import ModalButton from "../../../assets/modalButton.svg";
import { useAuth } from "../../provider/AuthProvider";
import CloseButton from "../CloseButton";
import { useDispatch, useSelector } from "react-redux";
import { setClaimFreeRide } from "../../redux/rideReducer";
import { BlurView } from "@react-native-community/blur";

const FreeRideModal = ({ setIsOpen, isOpen }) => {
  const dispatch = useDispatch();
  const { i18n } = useAuth();
  const { costSettings } = useSelector((state) => state.ride);
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
        <View style={{ width: "100%" }}>
          <View
            style={{
              backgroundColor: "#FF9837",
              padding: normalize(24),
              paddingBottom: 0,
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              paddingTop: normalize(7),
            }}
          >
            <FreeRide width={normalize(346)} height={normalize(273)} />
          </View>
          <View style={styles.modalBlock}>
            <Text style={styles.title}>{i18n.t("freeRide")}</Text>
            <Text style={styles.text}>
              {costSettings?.free_minutes_first_ride} {i18n.t("freeMinutes")}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                dispatch(setClaimFreeRide(false));
                setIsOpen(false);
              }}
            >
              <ModalButton width={normalize(326)} height={normalize(56)} />
              <Text style={styles.buttonText}>{i18n.t("claim")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FreeRideModal;
