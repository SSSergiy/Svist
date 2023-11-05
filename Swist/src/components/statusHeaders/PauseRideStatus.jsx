import React from "react";
import { Text, View } from "react-native";
import { styles } from "./statusHeaderStyle";
import PlayIcon from "../../../assets/playIcon.svg";
import { normalize } from "../../responsive/fontSize";
import LowBattery from "../../../assets/lowBattery.svg";
import { useAuth } from "../../provider/AuthProvider";
import { useSelector } from "react-redux";

const PauseRideStatus = ({ batteryLevel }) => {
  const { i18n } = useAuth();
  const { costSettings } = useSelector((state) => state.ride);
  return (
    <View style={{ backgroundColor: "#3772FF", ...styles.header }}>
      <View style={styles.block}>
        <PlayIcon />
        <Text style={styles.text}>{i18n.t("PausedRide")}</Text>
      </View>
      {parseInt(batteryLevel) <= costSettings?.lowPower && (
        <View style={styles.triangleCorner} />
      )}
      {parseInt(batteryLevel) <= costSettings?.lowPower && (
        <View
          style={{
            backgroundColor: "#EF4E4E",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 0,
            borderTopRightRadius: 25,
            padding: normalize(16),
            paddingBottom: normalize(40),
          }}
        >
          <LowBattery />
        </View>
      )}
    </View>
  );
};

export default PauseRideStatus;
