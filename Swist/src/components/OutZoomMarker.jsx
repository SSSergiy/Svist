import React from 'react';
import {normalize} from "../responsive/fontSize";
import {View} from "react-native";
import Svg, {G, Path} from "react-native-svg";
import ZoomMarker from "../../assets/outZoomMarker.svg"
const OutZoomMarker = () => {
  return (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 50,
      width: normalize(40),
      height: normalize(40),
      alignItems: 'center',
      justifyContent: 'center',
      padding: normalize(5)
    }}>
      <View style={{
        backgroundColor: '#FFE8D3',
        width: '100%',
        height: '100%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
         <ZoomMarker width={normalize(20)} height={normalize(16)}/>

      </View>
    </View>
  );
};

export default OutZoomMarker;
