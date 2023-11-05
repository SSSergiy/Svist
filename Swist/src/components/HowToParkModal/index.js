import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {normalize} from "../../responsive/fontSize";
import ModalHeader from "../../../assets/modalHeader.svg";
import ModalButton from "../../../assets/modalButton.svg";
import HowToParkLogo from "../../../assets/howToParkLogo.svg";
import {styles} from "./styles";
import CloseIcon from "../../../assets/closeIcon.svg";
import {useAuth} from "../../provider/AuthProvider";
import CloseButton from "../CloseButton";
const HowToParkModal = ({setIsOpen, isOpen}) => {
  const {i18n}=useAuth()
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(!isOpen);
      }}>
      <View style={styles.container}>
        <CloseButton onPress={() => setIsOpen(false)}/>
        <View style={styles.modalBlock}>
          <View style={styles.logoBlock}>
            <ModalHeader width={normalize(58)} height={normalize(48)}/>
            <HowToParkLogo style={{position: 'absolute'}}/>
          </View>

          <Text style={styles.title}>{i18n.t('howPark')}</Text>
          <Text style={styles.text} adjustsFontSizeToFit={true}>{i18n.t('howParkText')}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsOpen(false)}>
            <ModalButton width={normalize(326)} height={normalize(56)}/>
            <Text style={styles.buttonText}>{i18n.t('iUnderstand')}</Text>


          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


export default HowToParkModal;
