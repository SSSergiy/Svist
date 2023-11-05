import React, { useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../../responsive/fontSize";
import MiniEndRide from "../../../assets/miniEndRide.svg";
import MiniSamokat from "../../../assets/miniSamokat.svg";
import Wallet from "../../../assets/wallet.svg";
import Routes from "../../../assets/routes.svg";
import Min from "../../../assets/min.svg";
import { useAuth } from "../../provider/AuthProvider";
import PlayIcon from "../../../assets/playIcon.svg";
import { GT } from "../../constants/fonts";
import BackButton from "../../components/BackButton";
import ModalButton from "../../../assets/modalButton.svg";
import { useSelector } from "react-redux";
const HistoryInfo = ({ navigation, route }) => {
  const [openResult, setOpenResult] = useState(false);
  let params = route?.params;
  const { i18n } = useAuth();

  const getDuration = (duration) => {
    if (duration >= 60 && duration < 3600) {
      return Math.floor((duration / 60) * 100) / 100;
    } else if (duration >= 3600) {
      return Math.floor((duration / 3600) * 100) / 100;
    } else return duration;
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      ></MapView>
      <View
        style={{
          position: "absolute",
          zIndex: 1000,
          width: "100%",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <BackButton fill={true} />
        <View style={styles.resultBlock}>
          <View
            style={{ padding: normalize(24), paddingBottom: normalize(30) }}
          >
            <Text
              style={styles.title}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
            >
              {i18n.t("yourRideHasEnded")}
            </Text>
            <Text
              style={styles.text}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
            >
              {params?.item?.date_end_formated?.replace(" ", ", ")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginTop: normalize(30),
              }}
            >
              <MiniSamokat width={normalize(31)} height={normalize(24)} />

              <View style={{ width: "80%" }}>
                <View
                  style={{ width: "100%", height: 1, backgroundColor: "white" }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ ...styles.text, fontSize: normalize(12) }}>
                    {i18n.t("pickUp")}
                  </Text>
                  <Text style={{ ...styles.text, fontSize: normalize(12) }}>
                    {i18n.t("endRide")}
                  </Text>
                </View>
              </View>
              <MiniEndRide width={normalize(31)} height={normalize(24)} />
            </View>
            <View
              style={{
                ...styles.rowContainer,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ ...styles.rowContainer, marginTop: normalize(30) }}
              >
                <PlayIcon style={{ marginRight: normalize(18) }} />
                <View style={[styles.rowContainer, { alignItems: "flex-end" }]}>
                  <Text
                    style={styles.number}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                  >
                    {getDuration(params?.item?.duration)}
                  </Text>
                  <Text style={{ ...styles.text, marginBottom: 5 }}>
                    {" "}
                    {params?.item?.duration >= 60 &&
                    params?.item?.duration < 3600
                      ? i18n.t("min")
                      : params?.item?.duration >= 3600
                      ? i18n.t("hour")
                      : i18n.t("second")}
                    .
                  </Text>
                </View>
              </View>

              <View
                style={{ ...styles.rowContainer, marginTop: normalize(30) }}
              >
                <Wallet />
                <View style={[styles.rowContainer, { alignItems: "flex-end" }]}>
                  <Text
                    style={{ ...styles.number, marginLeft: normalize(18) }}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                  >
                    {params?.item?.amount || 0}
                  </Text>
                  <Text style={{ ...styles.text, marginBottom: 5 }}> €</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                ...styles.rowContainer,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ ...styles.rowContainer, marginTop: normalize(30) }}
              >
                <Min style={{ marginRight: normalize(18) }} />
                <View style={[styles.rowContainer, { alignItems: "flex-end" }]}>
                  <Text
                    style={styles.number}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                  >
                    {Math.floor((params?.item?.duration_pause / 60) * 100) /
                      100}
                  </Text>
                  <Text style={{ ...styles.text, marginBottom: 5 }}>
                    {" "}
                    {i18n.t("min")}.
                  </Text>
                </View>
              </View>
              <View
                style={{ ...styles.rowContainer, marginTop: normalize(30) }}
              >
                <Routes />
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Text
                    style={{ ...styles.number, marginLeft: normalize(18) }}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                  >
                    {params?.item?.distance_formated}
                  </Text>
                  <Text style={{ ...styles.text, marginBottom: 5 }}>
                    {" "}
                    {i18n.t("km")}.
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("SupportScreen")}
            >
              <ModalButton style={{ position: "absolute" }} />
              <Text style={styles.buttonText}>{i18n.t("helpWithRide")}</Text>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <View style={styles.cardRow}>
              <Text style={styles.cardRowText}>{i18n.t("privateRide")}</Text>
              <View style={styles.rowContainer}>
                {/*<View style={styles.cardDot}/>*/}
                {/*<View style={styles.cardDot}/>*/}
                {/*<View style={styles.cardDot}/>*/}
                {/*<View style={styles.cardDot}/>*/}
                <Text style={styles.cardRowText}>
                  {params?.item?.finance_cards_pan
                    ? params.item.finance_cards_pan.substring(8, 12) +
                      " " +
                      params.item.finance_cards_pan.substring(12, 16)
                    : i18n.t("tripNotYetPaid")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resultBlock: {
    backgroundColor: "#FE7B01",
    paddingBottom: normalize(100),
  },
  title: {
    fontSize: normalize(24),
    fontFamily: GT,
    fontWeight: "500",
    color: "white",
  },
  text: {
    color: "white",
    fontSize: normalize(16),
  },
  number: {
    fontSize: normalize(32),
    fontWeight: "500",
    color: "white",
  },
  secondBlock: {
    backgroundColor: "white",
    width: "100%",
    paddingLeft: normalize(87),
    paddingRight: normalize(87),
    paddingTop: normalize(56),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: normalize(140),
  },
  button: {
    alignItems: "center",
    justifyContent: "center",

    width: normalize(356),
    height: normalize(56),
    alignSelf: "center",
    marginBottom: normalize(40),
    marginTop: normalize(40),
  },
  buttonText: {
    fontSize: normalize(24),
    fontFamily: GT,
    color: "white",
  },
  line: {
    backgroundColor: "white",
    width: "100%",
    height: 1,
    opacity: 0.24,
  },
  cardRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: normalize(16),
  },
  cardRowText: {
    fontSize: normalize(16),
    color: "white",
    fontFamily: GT,
  },
  cardDot: {
    width: 4,
    height: 4,
    backgroundColor: "white",
    borderRadius: 10,
    marginRight: normalize(5),
  },
});
export default HistoryInfo;
