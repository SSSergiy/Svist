import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  BackHandler,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { normalize } from "../../responsive/fontSize";
import { GT } from "../../constants/fonts";
import CloseButton from "../../components/CloseButton";
import SecurityIcon from "../../../assets/beginnerMode/securityIcon.svg";
import ModalBlur from "../../../assets/beginnerMode/modalBlur.svg";
import modalBlur from "../../../assets/beginnerMode/modalBlur.png";
import SecurityCenterModal from "./SecurityCenterModal";
import Ionicons from "react-native-vector-icons/Ionicons";
import MainButton from "../../../assets/mainButton.svg";
import scan from "../../../assets/scan.png";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DrawerMenuButton from "../../components/DrawerMenuButton";

const SecurityCenterHighlight = () => {
  const { i18n } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();
  function handleBackButtonClick() {
    navigation.navigate("MainScreen");
  }
  useEffect(() => {
    setOpenModal(false);
  }, []);
  return (
    <View style={styles.container}>
      {openModal && (
        <SecurityCenterModal isOpen={openModal} setIsOpen={setOpenModal} />
      )}
      <ImageBackground source={modalBlur} style={{ flex: 1 }}>
        <View style={styles.modalBlock}>
          <CloseButton
            onPress={(e) => {
              //e.stopPropagation()
              handleBackButtonClick();
            }}
          />
          <Text style={styles.title}>{i18n.t("safetyCenter")}</Text>
          <Text style={styles.text}>{i18n.t("setPreferences")}</Text>
          <TouchableOpacity
            style={styles.securityButton}
            onPress={() => {
              console.log("open");
              setOpenModal(true);
            }}
          >
            <SecurityIcon />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/*<DrawerMenuButton/>*/}

      {/*<MapView*/}
      {/*  style={styles.map}*/}
      {/*  initialRegion={{*/}
      {/*    latitude: 48.1577172, longitude: 17.1215901,*/}
      {/*    latitudeDelta: 0.05,*/}
      {/*    longitudeDelta: 0.05*/}
      {/*  }}*/}
      {/*>*/}

      {/*</MapView>*/}
      {/*<View style={{...styles.rowContainer, ...styles.scanRow}}>*/}
      {/*  <View style={styles.screenButton} >*/}
      {/*    <Ionicons name={"ios-warning-outline"} style={{fontSize: normalize(24)}}/>*/}
      {/*  </View>*/}
      {/*  <View style={{alignItems: 'center', justifyContent: 'center'}}*/}
      {/*  >*/}
      {/*    <MainButton width={normalize(230)} height={normalize(56)} fill={'red'}/>*/}
      {/*    <View style={{...styles.scanButton, paddingRight: normalize(40)}}>*/}
      {/*      <Image source={scan} style={{width: 24, height: 24}}/>*/}
      {/*      <Text style={styles.buttonText}>{i18n.t('scan')}</Text>*/}
      {/*    </View>*/}
      {/*  </View>*/}

      {/*    <View style={styles.screenButton}>*/}
      {/*      <MaterialIcons name="gps-fixed" size={24} color="black"/>*/}
      {/*    </View>*/}

      {/*</View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalBlock: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.48)",
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1000,
    padding: normalize(24),
    paddingTop: normalize(180),
  },
  title: {
    fontSize: normalize(24),
    fontFamily: GT,
    fontWeight: "500",
    color: "white",
    marginBottom: normalize(16),
  },
  text: {
    color: "white",
    fontSize: normalize(16),
    fontFamily: GT,
  },
  securityButton: {
    position: "absolute",
    bottom: normalize(80),
    right: normalize(24),
  },
  scanRow: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: normalize(30),
    width: "100%",
    paddingLeft: normalize(24),
    paddingRight: normalize(24),
  },
  screenButton: {
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 48,
  },
  scanButton: {
    alignItems: "center",
    paddingLeft: normalize(36),
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: normalize(70),
    position: "absolute",
  },
  buttonText: {
    color: "white",
    fontSize: normalize(24),
    fontFamily: GT,
  },
});
export default SecurityCenterHighlight;
