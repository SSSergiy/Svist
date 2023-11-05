import React from "react";
import { styles } from "./profile/ProfileScreen/styles";
import BackButton from "../components/BackButton";
import { Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../responsive/fontSize";
import ContactButton from "../../assets/reserveButton.svg";
import Support from "../../assets/profile/support.svg";
import Terms from "../../assets/profile/terms.svg";
import Privacy from "../../assets/profile/privacy.svg";
import Safety from "../../assets/profile/safety.svg";
import HowIcon from "../../assets/profile/howIcon.svg";
import { useAuth } from "../provider/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const SupportScreen = () => {
  const { i18n } = useAuth();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <BackButton />
      <View style={{ ...styles.content, paddingTop: normalize(96) }}>
        <Text style={styles.infoTitle}>{i18n.t("support")}</Text>
        <View style={{ marginTop: normalize(16) }}>
          <Text style={styles.infoText}>{i18n.t("supportIssues")}</Text>
          <Text style={styles.infoText}>{i18n.t("supportIssues2")}</Text>
        </View>
        <View style={{ marginTop: normalize(40) }}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("QuestionsScreen")}
          >
            <Support width={normalize(24)} height={normalize(24)} />
            <Text style={styles.navButtonText}>
              {i18n.t("questionsAndAnswers")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("SafetyScreen")}
          >
            <Safety width={normalize(24)} height={normalize(24)} />
            <Text style={styles.navButtonText}>{i18n.t("safety")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Tutorial")}
          >
            <HowIcon width={normalize(24)} height={normalize(24)} />
            <Text style={styles.navButtonText}>{i18n.t("howToRide")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("ChatScreen")}
          >
            <Terms width={normalize(24)} height={normalize(24)} />
            <Text style={styles.navButtonText}>{i18n.t("chat")}</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity style={styles.navButton}>*/}
          {/*  <Privacy width={normalize(24)} height={normalize(24)}/>*/}
          {/*  <Text style={styles.navButtonText}>{i18n.t('phone')}</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>
      </View>
      <TouchableOpacity
        style={{ ...styles.button, marginBottom: normalize(80) }}
        onPress={() => navigation.navigate("ChatScreen")}
      >
        <ContactButton width={normalize(342)} height={normalize(56)} />
        <Text style={styles.buttonText}>{i18n.t("contactUs")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SupportScreen;
