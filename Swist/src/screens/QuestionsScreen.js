import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BackButton from "../components/BackButton";
import Logo from "../../assets/svistLogo.svg";
import { normalize } from "../responsive/fontSize";
import { GT, GT_BOLD } from "../constants/fonts";
import { AntDesign } from "@expo/vector-icons";
import { getQuestions } from "../api/authApi";
import ScrollViewIndicator from "react-native-scroll-indicator";

const QuestionsScreen = () => {
  const { i18n, authToken } = useAuth();
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const [openQuestion, setOpenQuestion] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions(authToken).then((res) => {
      // console.log("questions", res);
      setQuestions(res);
    });
  }, []);
  return (
    <View style={styles.container}>
      <BackButton withLogo={true} />
      <View style={{ ...styles.content, paddingTop: normalize(96) }}>
        <Text style={styles.infoTitle}>{i18n.t("questionsAndAnswers")}</Text>
        <Text style={styles.infoText}>
          {i18n.t("questionsAndAnswersFAQ")} {i18n.t("questionsAndAnswersFAQ2")}
        </Text>
        {questions?.length === 0 ? (
          <ActivityIndicator
            size={"large"}
            color={"#FE7B01"}
            style={{ flex: 1 }}
          />
        ) : (
          <ScrollViewIndicator
            style={{
              flex: 1,
              paddingTop: normalize(40),
              paddingRight: normalize(16),
            }}
            scrollIndicatorStyle={{ backgroundColor: "#FFD5AE" }}
            useNativeDriver={false}
          >
            {questions?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item?.id}
                  style={{ ...styles.questionButton }}
                  onPress={() => {
                    selectItem === index
                      ? setSelectItem(null)
                      : setSelectItem(index);
                  }}
                >
                  <View
                    style={{
                      ...styles.rowContainer,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.questionButtonTitle}>
                      {item?.question}
                    </Text>
                    {selectItem === index ? (
                      <AntDesign name="up" size={24} color="#FE7B01" />
                    ) : (
                      <AntDesign name="down" size={24} color="black" />
                    )}
                  </View>
                  {selectItem === index && (
                    <Text style={{ ...styles.questionButtonText, opacity: 1 }}>
                      {item?.answer}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollViewIndicator>
        )}
      </View>
    </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    height: Dimensions.get("window").height,
    paddingTop: normalize(48),
  },

  content: {
    padding: normalize(24),
    paddingRight: normalize(8),
    paddingTop: normalize(48),
    flex: 1,
    height: Dimensions.get("window").height,
  },
  infoTitle: {
    color: "#1F1E1D",
    fontSize: normalize(24),
    fontFamily: GT_BOLD,
  },
  infoText: {
    color: "#1F1E1D",
    fontSize: normalize(16),
    fontStyle: "normal",
    marginTop: normalize(16),
    paddingRight: normalize(16),
  },
  questionButton: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderColor: "#DEDEDE",
    paddingBottom: normalize(16),
    paddingTop: normalize(21),
    backgroundColor: "white",
  },
  questionButtonTitle: {
    color: "#1F1E1D",
    fontSize: normalize(16),
    fontFamily: GT_BOLD,
    marginRight: normalize(30),
    width: "85%",
  },
  questionButtonText: {
    color: "#1F1E1D",
    fontSize: normalize(16),
    lineHeight: normalize(24),
    marginTop: normalize(16),
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default QuestionsScreen;
