import React from 'react';
import {useAuth} from "../../provider/AuthProvider";
import {Modal, Text, TouchableOpacity, View} from "react-native";

import CloseButton from "../CloseButton";
import ModalHeader from "../../../assets/modalErrorHeader.svg";
import {normalize} from "../../responsive/fontSize";
import ExitWhite from "../../../assets/exitWhite.svg";
import ModalButton from "../../../assets/modalButton.svg";
import YesButton from "../../../assets/menu/yesButton.svg";
import NoButton from "../../../assets/menu/noButton.svg";
import {styles} from "./style"

const ExitModal = ({setIsOpen, isOpen,onPress}) => {
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
            <ExitWhite style={{position:'absolute'}}/>
          </View>
          <Text style={styles.title}>{i18n.t('areYouSure')}</Text>
          <View style={{flexDirection:'row',alignItems:'center',width:'100%',justifyContent:'space-between'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={onPress}>
              <YesButton width={normalize(155)} height={normalize(56)}/>
              <Text style={{...styles.buttonText,color:'#EF4E4E'}}>{i18n.t('yes')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsOpen(false)}>
              <NoButton width={normalize(155)} height={normalize(56)}/>
              <Text style={styles.buttonText}>{i18n.t('no')}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default ExitModal;
