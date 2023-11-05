import React from "react";
import {
  CommonActions,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import GreatJobIcon from "../../../assets/tutorial/greatJob.svg";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import { normalize, SCREEN_WIDTH } from "../../responsive/fontSize";
import NextButton from "../../../assets/tutorial/nextWhiteButton.svg";
import LogoWhite from "../../../assets/logoWhite.svg";
import { useAuth } from "../../provider/AuthProvider";
import { useSelector } from "react-redux";

const GreatJob = () => {
  const navigation = useNavigation();
  const { i18n } = useAuth();
  const { isNewUser } = useSelector((state) => state.auth);
  return (
    <View style={{ ...styles.container, backgroundColor: "#FE7B01" }}>
      <GreatJobIcon
        width={SCREEN_WIDTH}
        height={SCREEN_WIDTH}
        style={{ marginTop: 100 }}
      />
      <View style={{ ...styles.descriptionBlock, marginTop: 15 }}>
        <DescriptionBlock
          width={normalize(366)}
          height={normalize(256)}
          style={{ position: "absolute", opacity: 0.5 }}
        />
        <View>
          <Text style={{ ...styles.descriptionTitle, color: "white" }}>
            {i18n.t("greatJob")}
          </Text>
          <Text style={{ ...styles.descriptionText, color: "white" }}>
            {i18n.t("nowYouReady")}
          </Text>
        </View>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => {
            if (isNewUser) {
              navigation.navigate("BeginnerMode");
            } else {
              navigation.dispatch(StackActions.popToTop());
              navigation.dispatch(CommonActions.goBack());
            }
          }}
        >
          <NextButton />
        </TouchableOpacity>
        <LogoWhite
          width={normalize(80)}
          height={normalize(56)}
          style={{
            position: "absolute",
            bottom: normalize(30),
            left: normalize(56),
          }}
        />
      </View>
    </View>
  );
};

export default GreatJob;
