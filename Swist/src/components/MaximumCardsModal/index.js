import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Modal, Text, TouchableOpacity, View } from "react-native"
import ModalButton from "../../../assets/modalButton.svg"
import { useAuth } from "../../provider/AuthProvider"
import { normalize } from "../../responsive/fontSize"
import CloseButton from "../CloseButton"
import { styles } from "../errorModalStyles"

import { BlurView } from "@react-native-community/blur"
import ModalHeader from "../../../assets/modalErrorHeader.svg"
import TriangleError from "../../../assets/triangleError.svg"


import { GT } from "../../constants/fonts"

const MaximumCardsModal = ({ setIsOpen, isOpen }) => {
  const { i18n } = useAuth()
  const navigation = useNavigation()
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(!isOpen)
      }}
    >
      <BlurView style={styles.overlay} blurType="light" blurAmount={15} />
      <View style={styles.container}>
        <CloseButton
          onPress={() => {
            setIsOpen(false)
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

          <Text style={styles.title}>{i18n.t("maximumCardsExtended")}</Text>
          <Text style={{
            fontSize: normalize(16),
            color: "white",
            fontFamily: GT,
            marginBottom: 64

          }}>{i18n.t("PleaseDeleteOtherCard")}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsOpen(false)
              navigation.navigate("PaymentScreen")
            }}
          >
            <ModalButton width={"100%"} height={normalize(56)} />
            <Text style={styles.buttonText}>{i18n.t("iUnderstand")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

// const style = StyleSheet.create({
//   text: {
//     fontSize: normalize(16),
//     color: "white",
//     fontFamily: GT,
//     marginBottom:50

//   }
// })
export default MaximumCardsModal
