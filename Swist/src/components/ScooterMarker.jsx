import React from 'react';
import {StyleSheet} from "react-native";
import {normalize} from "../responsive/fontSize";
import Svg, {G, Path} from "react-native-svg";
import {Image, Platform, View} from "react-native";
import samokatWhite from "../../assets/samokatWhite.png";
import ScooterWhite from "../../assets/scooterWhite.svg";
import AnimatedProgressWheel from "react-native-progress-wheel";
import Marker from "../../assets/marker.svg"
const ScooterMarker = ({selectMarker,item,selected}) => {
  return (

    <View style={styles.firstLayer}>
      <View style={[styles.secondLayer, Platform.OS === 'ios' && {left: -0.3, top: -0.8}]}>
        <ScooterWhite width={normalize(23)} height={normalize(18)} />
      </View>

    </View>

  );
};
const styles = StyleSheet.create({
  firstLayer:{
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(50),
    height: normalize(50),
    position: 'absolute',
    zIndex:999,
    left: normalize(3),
    top: normalize(1.3)
  },
  secondLayer:{
    backgroundColor:  "#FE7B01" ,
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(38),
    height: normalize(38),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#DEDEDE',
  }
})
export default  React.memo(ScooterMarker) ;
