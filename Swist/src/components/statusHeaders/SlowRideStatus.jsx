import React from "react";
import { normalize } from "../../responsive/fontSize";
import { Text, View } from "react-native";
import SlowZone from "../../../assets/slowZone.svg";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { styles } from "./statusHeaderStyle";
import { useAuth } from "../../provider/AuthProvider";
import LowBattery from "../../../assets/lowBattery.svg";
import { useSelector } from "react-redux";

const SlowRideStatus = ({ batteryLevel }) => {
  const { i18n } = useAuth();
  const { costSettings } = useSelector((state) => state.ride);
  return (
    <View style={{ backgroundColor: "#FFD400", ...styles.header }}>
      <View style={styles.block}>
        <SlowZone />
        <Text style={styles.text}>{i18n.t("slowZone")}</Text>
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

export default SlowRideStatus;
