import React from "react";
import { Text, View } from "react-native";
import { styles } from "./statusHeaderStyle";
import ParkingZoneIcon from "../../../assets/parkingZoneIcon.svg";
import { useAuth } from "../../provider/AuthProvider";
import { normalize } from "../../responsive/fontSize";
import LowBattery from "../../../assets/lowBattery.svg";
import { useSelector } from "react-redux";

const ParkingRideStatus = ({ batteryLevel }) => {
  const { i18n } = useAuth();
  const { costSettings } = useSelector((state) => state.ride);
  return (
    <View style={{ backgroundColor: "#3772FF", ...styles.header }}>
      <View style={styles.block}>
        {/*<MaterialCommunityIcons name={'map-marker-check'} style={{fontSize: normalize(24),color:'white'}}/>*/}
        <ParkingZoneIcon />

        <Text style={styles.text}>{i18n.t("parkingZone")}</Text>
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

export default ParkingRideStatus;
