import React from "react";
import { normalize } from "../responsive/fontSize";
import CloseIcon from "../../assets/closeIcon.svg";
import { TouchableOpacity } from "react-native";

const CloseButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 30,
        right: 20,
        padding: normalize(5),
      }}
      hitSlop={{ top: 50, bottom: 70, left: 70, right: 50 }}
      onPress={onPress}
    >
      <CloseIcon style={{ fontSize: 24, color: "white" }} />
    </TouchableOpacity>
  );
};

export default CloseButton;
