import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BackButton from "../../../assets/payment/backButton.svg";
import { normalize, SCREEN_WIDTH } from "../../responsive/fontSize";
import { useAuth } from "../../provider/AuthProvider";
import { styles } from "./styles";
import sized from "../../utils/sized";
import ProblemParkingSvg from "../../../assets/problem/problem_parking.svg";
import ProblemScooterSvg from "../../../assets/problem/problem_scooter.svg";
import ProblemAccidentSvg from "../../../assets/problem/problem_accident.svg";
import ProblemAppSvg from "../../../assets/problem/problem_app.svg";
import ProblemOtherSvg from "../../../assets/problem/problem_other.svg";
import GreyBlockSvg from "../../../assets/problem/grey_block.svg";
import { getProblemCategories } from "../../api/problemApi";
import ReserveButton from "../../../assets/reserveButton.svg";
import { StackActions } from "@react-navigation/native";

const ProblemParkingIcon = sized(ProblemParkingSvg, 30, 56);
const ProblemScooterIcon = sized(ProblemScooterSvg, 40, 40);
const ProblemAccidentIcon = sized(ProblemAccidentSvg, 42, 52);
const ProblemAppIcon = sized(ProblemAppSvg, 25, 47);
const ProblemOtherIcon = sized(ProblemOtherSvg, 40, 40);
const GreyBlockIcon = sized(GreyBlockSvg, (SCREEN_WIDTH - 56) / 2, 72);

const ReportProblemInitial = ({ navigation }) => {
  const { i18n, authToken, locale } = useAuth();
  const [problemCategories, setProblemCategories] = useState([]);

  const PARKING_TYPE = "parking";
  const SCOOTER_TYPE = "scooter";
  const ACCIDENT_TYPE = "accident";
  const APP_TYPE = "app";

  const pickIcon = (type) => {
    switch (type) {
      case PARKING_TYPE:
        return <ProblemParkingIcon style={{ marginBottom: -17 }} />;
      case SCOOTER_TYPE:
        return <ProblemScooterIcon />;
      case ACCIDENT_TYPE:
        return <ProblemAccidentIcon />;
      case APP_TYPE:
        return <ProblemAppIcon />;
      default:
        return <ProblemOtherIcon />;
    }
  };

  useEffect(() => {
    getProblemCategories(authToken).then((data) => {
      setProblemCategories(
        Object.entries(data.categoryes).map((item) => item[1])
      );
    });
  }, [locale]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={{ position: "absolute", left: 0, top: normalize(48) }}
      >
        <BackButton />
      </TouchableOpacity>
      <View style={styles.mainBlock}>
        <Text style={styles.mainBlock__title}>{i18n.t("reportProblem")}</Text>
        <Text style={styles.mainBlock__description}>
          {i18n.t("reportProblemRide")}
        </Text>
        <View style={styles.mainBlock__categories}>
          {problemCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.mainBlock__category}
              onPress={() => {
                navigation.navigate(
                  category.chat_open ? "ReportDamage" : "Problems",
                  { category }
                );
              }}
            >
              <GreyBlockIcon style={styles.mainBlock__bg} />
              {pickIcon(category.alias)}
              <Text style={styles.mainBlock__label}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => {
          navigation.navigate("ChatScreen");
        }}
      >
        <ReserveButton width={"100%"} height={normalize(56)} />
        <Text style={styles.buttonText}>{i18n.t("contactUs")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportProblemInitial;
