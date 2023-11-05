import React from "react";
import Marker from "../../assets/marker.svg";
import { normalize } from "../responsive/fontSize";
import { Image, View, Text, Platform } from "react-native";
import samokatWhite from "../../assets/samokatWhite.png";
import samokat from "../../assets/samokat.png";
import AnimatedProgressWheel from "react-native-progress-wheel";

const OutlineMarker = ({ selectMarker, item, selected }) => {
  return (
    <View>
      <Marker width={normalize(55)} height={normalize(65)} />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: normalize(50),
          height: normalize(50),
          position: "absolute",
          left: normalize(3),
          top: normalize(1.3),
        }}
      >
        <View
          style={[
            {
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              width: normalize(38),
              height: normalize(38),
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "#F7F7F7",
            },
            Platform.OS === "ios" && { left: -0.5, top: -0.8 },
          ]}
        >
          <Image
            source={samokat}
            style={{
              width: normalize(23),
              height: normalize(18),
            }}
          />
          {/*<Text>{item?.battery_power}</Text>*/}
        </View>
        {Platform.OS === "ios" && (
          <View
            style={{
              position: "absolute",
              top: Platform.OS === "ios" ? 0.7 : normalize(3),

              zIndex: 1000,
              right: Platform.OS === "ios" ? 22.6 : normalize(22.5),
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderRightWidth: Platform.OS === "ios" ? 4 : normalize(5),
              borderTopWidth: Platform.OS === "ios" ? 4.8 : normalize(7.5),
              borderRightColor: "transparent",
              borderTopColor:
                parseInt(item?.battery_power) < 25
                  ? "red"
                  : parseInt(item?.battery_power) < 50 &&
                    parseInt(item?.battery_power) >= 25
                  ? "yellow"
                  : "#3AC26A",
            }}
          />
        )}
        <View
          style={[
            { position: "absolute", transform: [{ rotate: "268deg" }] },
            Platform.OS === "ios" && { left: 0.5, top: 0.2 },
          ]}
        >
          <AnimatedProgressWheel
            size={normalize(47.85)}
            width={5}
            color={
              !!item?.battery_power
                ? parseInt(item?.battery_power) < 25
                  ? "red"
                  : parseInt(item?.battery_power) < 50 &&
                    parseInt(item?.battery_power) >= 25
                  ? "yellow"
                  : "#3AC26A"
                : "white"
            }
            progress={parseInt(item?.battery_power)}
            backgroundColor={"white"}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(OutlineMarker);
