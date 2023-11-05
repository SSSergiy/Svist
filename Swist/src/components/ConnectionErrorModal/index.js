import React from "react";
import {useNavigation} from "@react-navigation/native";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {normalize} from "../../responsive/fontSize";
import {styles} from "./styles";
import ErrorConnectionBlock from "../../../assets/errorConnectionBlock.svg"
import {useAuth} from "../../provider/AuthProvider";

const ConnectionErrorModal = ({text,onPress}) => {
  const navigation=useNavigation()
  const {i18n}=useAuth()
  return (
    // <Modal
    //   transparent={true}
    //   visible={isOpen}
    //   onRequestClose={() => {
    //     setIsOpen(!isOpen);
    //   }} >
    //
    //   <View style={styles.modalBlock}>
    //     <AntDesign name={'closesquareo'} style={{position:'absolute',top:30,right:20,fontSize: normalize(24),color:'white'}} onPress={()=>setIsOpen(false)}/>
    //       <Text style={styles.title}>Connection lost. Try again.</Text>
    //   </View>
    //
    // </Modal>
    <Pressable style={styles.absoluteBlock} onPress={onPress}>
      <ErrorConnectionBlock width={normalize(282)} height={normalize(55)}/>
      <Text style={styles.title}>{text}</Text>
    </Pressable>
  );
};

export default ConnectionErrorModal;
