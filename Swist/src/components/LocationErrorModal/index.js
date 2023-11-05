import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import GeolocationError from "../../../assets/geolocationError.svg";
import {
  normalize,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../responsive/fontSize";
import ModalHeader from "../../../assets/modalHeader.svg";
import ModalButton from "../../../assets/modalButton.svg";
import { styles } from "./styles";
import { useAuth } from "../../provider/AuthProvider";
import CloseButton from "../CloseButton";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import getLocation from "../../helpers/getLocation";
import { setIsShowedLocationError } from "../../redux/rideReducer";

const LocationErrorModal = ({ setIsOpen }) => {
  const { i18n } = useAuth();
  const dispatch = useDispatch();
  const { mapPermission } = useSelector((state) => state.ride);
  return (
    <View
      style={[
        styles.container,
        {
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          zIndex: 10000,
          top: 0,
          left: 0,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
        },
      ]}
    >
      <CloseButton
        onPress={() => {
          setIsOpen(false);
          dispatch(setIsShowedLocationError(true));
        }}
      />
      <View style={styles.modalBlock}>
        <View style={styles.logoBlock}>
          <ModalHeader width={normalize(58)} height={normalize(48)} />
          <GeolocationError
            name={"gps-off"}
            style={{
              fontSize: normalize(24),
              color: "white",
              position: "absolute",
            }}
          />
        </View>

        <Text style={styles.title}>{i18n.t("turnOnLocation")}</Text>
        <Text style={styles.text}>{i18n.t("withoutLocation")}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsOpen(false);
            dispatch(setIsShowedLocationError(true));
            getLocation(dispatch, mapPermission);
          }}
        >
          <ModalButton width={"100%"} height={normalize(56)} />
          <Text style={styles.buttonText}>{i18n.t("iUnderstand")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationErrorModal;
