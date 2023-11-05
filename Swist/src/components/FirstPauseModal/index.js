import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {normalize} from "../../responsive/fontSize";
import ModalHeader from "../../../assets/modalHeader.svg";
import Feather from "react-native-vector-icons/Feather";
import ModalButton from "../../../assets/modalButton.svg";
import {styles} from "./styles";
import CloseIcon from "../../../assets/closeIcon.svg";
import {useAuth} from "../../provider/AuthProvider";
import CloseButton from "../CloseButton";
const FirstPauseModal = ({setIsOpen, isOpen}) => {
  const{i18n}=useAuth()
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
            <Feather name={'pause'} style={{fontSize: normalize(24), color: 'white', position: 'absolute'}}/>
          </View>
          <Text style={styles.title}>{i18n.t('pauseRide')}</Text>
          <Text style={styles.text}>{i18n.t('pauseTemporarilyLock')}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsOpen(false)}>
            <ModalButton width={normalize(326)} height={normalize(56)}/>
            <Text style={styles.buttonText}>{i18n.t('pause')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


export default FirstPauseModal;
