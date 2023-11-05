import React from "react";
import { normalize } from "../../responsive/fontSize";
import Card1 from "../../../assets/payment/card1.svg";
import Card2 from "../../../assets/payment/card2.svg";
import Card3 from "../../../assets/payment/card3.svg";
import { View } from "react-native";

const CardMask = () => {
  return (
    <View
      style={{
        width: normalize(342),
        alignItems: "center",
      }}
    >
      <View style={{ position: "absolute", top: 0, zIndex: 3 }}>
        <Card1 width={normalize(342)} />
      </View>

      <Card2
        width={normalize(326)}
        style={{ position: "absolute", top: normalize(15), zIndex: 2 }}
      />
      <Card3
        width={normalize(325)}
        style={{ position: "absolute", top: normalize(30), zIndex: 1 }}
      />
    </View>
  );
};

export default CardMask;
