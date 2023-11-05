import React from "react";
import { normalize } from "../../responsive/fontSize";
import { Image, Platform, StyleSheet, View } from "react-native";
import samokatWhite from "../../../assets/samokatWhite.png";
import AnimatedProgressWheel from "react-native-progress-wheel";
import Marker from "../../../assets/marker.svg";

const TrackingMarker = ({ selectScooter, startRide, rideArea }) => {
  const areaColors = {
    slow: "#FFD400",
    danger: "#EF4E4E",
    parking: "#3772FF",
    black: "#1F1E1D",
    none: "#FE7B01",
  };

  return (
    <View>
      <Marker width={normalize(82)} height={normalize(66)} />

      <View style={styles.firstLayer}>
        <View
          style={[
            {
              backgroundColor: startRide ? areaColors[rideArea] : "#FE7B01",
              ...styles.secondLayer,
            },
            Platform.OS === "ios" && { left: -0.6, top: -1.1 },
          ]}
        >
          <Image
            source={samokatWhite}
            style={{
              width: normalize(23),
              height: normalize(18),
            }}
          />
        </View>

        {selectScooter?.battery_power && (
          <View
            style={[
              { position: "absolute", transform: [{ rotate: "265deg" }] },
              Platform.OS === "ios" && { left: 0.5, top: 0.2 },
            ]}
          >
            <AnimatedProgressWheel
              size={normalize(47.85)}
              width={5}
              color={
                parseInt(selectScooter?.battery_power) < 25
                  ? "red"
                  : parseInt(selectScooter?.battery_power) < 50 &&
                    parseInt(selectScooter?.battery_power) >= 25
                  ? "yellow"
                  : "#3AC26A"
              }
              progress={parseInt(selectScooter?.battery_power)}
              backgroundColor={"white"}
            />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  firstLayer: {
    alignItems: "center",
    justifyContent: "center",
    width: normalize(50),
    height: normalize(50),
    position: "absolute",
    left: normalize(16.5),
    top: normalize(2),
  },
  secondLayer: {
    alignItems: "center",
    justifyContent: "center",
    width: normalize(38),
    height: normalize(38),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#DEDEDE",
  },
});
export default TrackingMarker;
