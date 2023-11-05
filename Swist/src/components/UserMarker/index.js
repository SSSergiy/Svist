import React from "react";
import { normalize } from "../../responsive/fontSize";
import UserMarkerSVG from "../../../assets/userMarker.svg";
import { View, StyleSheet } from "react-native";

const UserMarker = () => {
  return <UserMarkerSVG width={normalize(52)} height={normalize(52)} />;
};

export default UserMarker;
