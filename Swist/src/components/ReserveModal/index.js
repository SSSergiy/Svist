import React, { useEffect } from "react";

import { Image, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../../responsive/fontSize";
import reserveSamokat from "../../../assets/reserveSamokat.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import mastercard from "../../../assets/mastercard.png";
import ReserveBellIcon from "../../../assets/reserveBellIcon.svg";
import reserveCreditCard from "../../../assets/reserveCreditCard.png";
import ReserveButton from "../../../assets/reserveButton.svg";
import { useAuth } from "../../provider/AuthProvider";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { beepScooter } from "../../api/scooterApi";
import { useDispatch, useSelector } from "react-redux";
import { setSecondsReserve } from "../../redux/rideReducer";

const ReserveModal = ({
  setConfirmReservation,
  setShowInfo,
  scooter,
  setAddCard,
  setReserveName,
  setOpenBalanceErrorModal,
}) => {
  const { i18n, authToken } = useAuth();
  const { debt, userCards } = useSelector((state) => state.payment);
  const { costSettings } = useSelector((state) => state.ride);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const checkReserve = () => {
    setReserveName(scooter?.scooter_name);
    setShowInfo(false);
    setConfirmReservation(true);
    dispatch(setSecondsReserve(costSettings?.max_reserve_minutes * 60));
  };

  const beep = () => {
    beepScooter(authToken, scooter?.scooter_id).then((res) => {
      console.log("beep", scooter, res);
    });
  };
  return (
    <View style={styles.reserveBlock}>
      {/*{addCard&&!isAdded&&<AddCardModal setIsOpen={setAddCard} isOpen={addCard} setIsAdded={setIsAdded}/>}*/}
      <View style={styles.infoContainer}>
        <View style={styles.rowContainer}>
          <Image source={reserveSamokat} style={styles.scooterImg} />
          <View style={{ marginLeft: normalize(10) }}>
            <Text style={styles.reserveTitle}>
              {scooter?.maximum_distance || "25"} {i18n.t("km")}
            </Text>
            <Text style={{ fontSize: normalize(12) }}>
              {scooter.scooter_name
                ? `${scooter?.scooter_name[0]}-XXX${scooter?.scooter_name.slice(
                    -2
                  )}`
                : null}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ ...styles.screenButton, backgroundColor: "#F7F7F7" }}
          onPress={beep}
        >
          <ReserveBellIcon />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.rowBetween, marginTop: normalize(20) }}>
        <Text style={{ fontSize: normalize(12) }}>{i18n.t("privateRide")}</Text>
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={() =>
            navigation.navigate(
              userCards.length > 0 ? "PaymentScreen" : "AddNewCardScreen"
            )
          }
        >
          {/*{userCards.length>0&&<Image source={mastercard} style={styles.cardTypeImg}/>}*/}
          <View style={styles.rowContainer}>
            {userCards?.length > 0 ? (
              <>
                <View style={styles.cardDot} />
                <View style={styles.cardDot} />
                <View style={styles.cardDot} />
                <View style={styles.cardDot} />
                <Text style={{ fontSize: normalize(16) }}>
                  {userCards[0]?.card_pan?.substr(
                    userCards[0]?.card_pan?.length - 4
                  )}
                </Text>
              </>
            ) : (
              <Text style={styles.addCardText}>{i18n.t("addCard")}</Text>
            )}
            <Image source={reserveCreditCard} style={styles.walletImg} />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addCardButton}
        onPress={() => {
          if (userCards?.length > 0) {
            if (debt?.amount > 0) {
              setOpenBalanceErrorModal(true);
            } else {
              checkReserve();
            }
          } else {
            setAddCard(true);
          }
        }}
      >
        <ReserveButton width={"100%"} height={normalize(56)} />
        <Text
          style={{
            ...styles.reserveButtonText,
            position: "absolute",
          }}
        >
          {i18n.t("reserve")}
        </Text>
      </TouchableOpacity>

      <View
        style={{
          ...styles.rowContainer,
          marginTop: normalize(15),
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: normalize(12),
            marginRight: normalize(10),
          }}
        >
          {i18n.t("unlock")}{" "}
          {costSettings?.unlock_cost ? costSettings?.unlock_cost : "0.00"}€
        </Text>
        <Text style={{ color: "#FFDFC2", marginRight: normalize(10) }}>⧸</Text>
        <Text style={{ fontSize: normalize(12) }}>
          {costSettings?.cost_per_minute
            ? costSettings?.cost_per_minute
            : "0.13"}
          € / {i18n.t("min")}.
        </Text>
      </View>
    </View>
  );
};
export default ReserveModal;
