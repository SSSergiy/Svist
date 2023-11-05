import React from "react";
import { styles } from "./statusHeaderStyle";
import { Text, View } from "react-native";
import BlackZoneMarker from "../../../assets/BlackZoneMarker.svg";
import { normalize } from "../../responsive/fontSize";
import LowBattery from "../../../assets/lowBattery.svg";
import { useAuth } from "../../provider/AuthProvider";
import { BLACK_ZONE } from "../../../assets/polygonColors";
import { useSelector } from "react-redux";

const BlackRideStatus = ({ batteryLevel }) => {
  const { i18n } = useAuth();
  const { costSettings } = useSelector((state) => state.ride);
  return (
    <View style={{ backgroundColor: "#1F1E1D", ...styles.header }}>
      <View style={styles.block}>
        {/*<MaterialCommunityIcons name={'map-marker-check'} style={{fontSize: normalize(24),color:'white'}}/>*/}
        <BlackZoneMarker />

        <Text style={styles.text}>{i18n.t("noRide")}</Text>
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

export default BlackRideStatus;
