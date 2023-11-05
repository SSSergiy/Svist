import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import ModalHeader from "../../../assets/modalHeader.svg";
import { normalize } from "../../responsive/fontSize";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ModalButton from "../../../assets/modalButton.svg";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import CloseIcon from "../../../assets/closeIcon.svg";
import { useAuth } from "../../provider/AuthProvider";
import CloseButton from "../CloseButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectScooter } from "../../redux/rideReducer";
import { BlurView } from "@react-native-community/blur";

const PushErrorModal = ({
  setIsOpen,
  isOpen,
  pushError,
  setPushError,
  endRide,
}) => {
  const navigation = useNavigation();
  const { selectScooter } = useSelector((state) => state.ride);
  const dispatch = useDispatch();
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
          {/*<View style={styles.logoBlock}>*/}
          {/*  <ModalHeader width={normalize(58)} height={normalize(48)}/>*/}
          {/*  <MaterialIcons name={'gps-off'} style={{fontSize: normalize(24), color: 'white', position: 'absolute'}}/>*/}
          {/*</View>*/}
          <Text style={styles.title}>{pushError.title}</Text>
          <Text style={styles.text}>{pushError.text}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (endRide) {
                setPushError({ text: "", title: "" });
                setIsOpen(false);
                dispatch(
                  setSelectScooter({
                    ...selectScooter,
                    endTime: `${moment(new Date()).format(
                      "DD.MM.YYYY"
                    )},${new Date().getHours()}:${new Date().getMinutes()}`,
                  })
                );
                AsyncStorage.removeItem("reservation");
                navigation.reset({
                  index: 0,
                  routes: [{ name: "EndRideScreen" }],
                });
              }
              setPushError({ text: "", title: "" });
              setIsOpen(false);
            }}
          >
            <ModalButton width={"100%"} height={normalize(56)} />
            <Text style={styles.buttonText}>{i18n.t("continue")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PushErrorModal;
