import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { normalize } from "../responsive/fontSize";
import AntDesign from "react-native-vector-icons/AntDesign";
import Message from "../../assets/message.svg";
import EditNumber from "../../assets/editNumber.svg";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../provider/AuthProvider";
import { validationPhone } from "../api/authApi";
import { GT } from "../constants/fonts";
import CloseIcon from "../../assets/closeIcon.svg";
import { useSelector } from "react-redux";

const ResetCodeModal = ({
  setIsOpen,
  isOpen,
  setResetTime,
  setCode,
  setErrorText,
}) => {
  const navigation = useNavigation();
  const { appToken, i18n } = useAuth();
  const { phone, countryCode } = useSelector((state) => state.auth);
  const resetCode = () => {
    setCode("");
    setErrorText(null);
    const newPhone = countryCode + phone;

    validationPhone(newPhone, appToken).then((res) => {
      if (res?.data?.success) {
        setErrorText(null);
      } else setErrorText(res);
    });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(!isOpen);
      }}
    >
      <Pressable style={styles.container} onPress={() => setIsOpen(false)}>
        <CloseIcon
          style={{
            position: "absolute",
            top: 30,
            right: 20,
            fontSize: 24,
            color: "white",
          }}
          onPress={() => setIsOpen(false)}
        />
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {
              resetCode();
              setResetTime(30);
              setIsOpen(false);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              paddingBottom: normalize(16),
              borderColor: "#DEDEDE",
              marginTop: normalize(18),
            }}
          >
            <Message />
            <Text
              style={{
                fontWeight: "500",
                fontFamily: GT,
                marginLeft: normalize(26),
              }}
            >
              {i18n.t("resendSmsCode")}
            </Text>
          </TouchableOpacity>
          {/*<TouchableOpacity style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,paddingBottom:normalize(16),borderColor:'#DEDEDE',marginTop:normalize(18)}}>*/}
          {/*  <Feather name={'phone'} style={{fontSize: normalize(24)}}/>*/}
          {/*  <Text style={{fontWeight:'500',fontFamily: GT,marginLeft:normalize(26)}}>Request a call</Text>*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity
            onPress={() => {
              setIsOpen(false);
              navigation.goBack();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              paddingBottom: normalize(16),
              borderColor: "#DEDEDE",
              marginTop: normalize(18),
            }}
          >
            <EditNumber />
            <Text
              style={{
                fontWeight: "500",
                fontFamily: GT,
                marginLeft: normalize(26),
              }}
            >
              {i18n.t("changePhoneNumber")}
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.48)",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  content: {
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: normalize(26),
  },
  centerBlock: {
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: normalize(16),
    color: "white",
    alignSelf: "center",
    marginTop: normalize(16),
  },
});
export default ResetCodeModal;
