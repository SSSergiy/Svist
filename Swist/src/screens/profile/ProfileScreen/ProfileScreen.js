import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BackButton from "../../../components/BackButton";
import { styles } from "./styles";
import AvatarXl from "../../../../assets/profile/avatarXl.svg";
import PersonalInfoBg from "../../../../assets/profile/personalInfo.svg";
import Person from "../../../../assets/profile/person.svg";
import Edit from "../../../../assets/profile/edit.svg";
import Support from "../../../../assets/profile/support.svg";
import Terms from "../../../../assets/profile/terms.svg";
import Privacy from "../../../../assets/profile/privacy.svg";
import About from "../../../../assets/profile/about.svg";
import Delete from "../../../../assets/menu/delete.svg";
import SignOut from "../../../../assets/profile/signOut.svg";
import { normalize } from "../../../responsive/fontSize";
import { GT } from "../../../constants/fonts";
import { useAuth } from "../../../provider/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { getProfileInfo } from "../../../api/authApi";
import LoadingModal from "../../../components/LoadingModal";
import ExitModal from "../../../components/ExitModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReserveFocusButton from "../../../../assets/reserveFocusButton.svg";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/paymentReducer";

const ProfileScreen = () => {
  const { authToken, i18n, exit } = useAuth();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.payment);
  const navigation = useNavigation();
  const [openExitModal, setOpenExitModal] = useState(false);
  useEffect(() => {
    getProfileInfo(authToken).then((info) => {
      dispatch(setUser(info));
    });
  }, []);
  const exitFromAccount = () => {
    setOpenExitModal(false);
    exit();
  };
  return (
    <View style={styles.container}>
      {/*{!user?.phone&&<LoadingModal />}*/}
      {openExitModal && (
        <ExitModal
          setIsOpen={setOpenExitModal}
          isOpen={openExitModal}
          onPress={exitFromAccount}
        />
      )}
      <BackButton />
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <AvatarXl width={normalize(103)} height={normalize(80)} />
          <View style={{ marginLeft: normalize(16) }}>
            <Text style={styles.title}>{user?.name}</Text>
            <Text style={styles.title}>{user?.surname}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.personalInfoBlock}
          onPress={() => navigation.navigate("PersonalInfoScreen")}
        >
          <PersonalInfoBg
            style={{ position: "absolute" }}
            width={normalize(366)}
            height={normalize(56)}
          />
          <View style={{ ...styles.rowContainer }}>
            <Person width={normalize(24)} height={normalize(24)} />
            <Text style={styles.personText}>{i18n.t("personalInfo")}</Text>
          </View>
          <Edit width={normalize(24)} height={normalize(24)} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.infoTitle}>{i18n.t("necessaryInfo")}</Text>
        <View>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("SupportScreen")}
          >
            <Support width={normalize(24)} height={normalize(24)} />
            <Text style={styles.navButtonText}>{i18n.t("support")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("TermsScreen")}
          >
            <Terms width={normalize(24)} height={normalize(24)} />
            <Text style={styles.navButtonText}>{i18n.t("termsService")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("PrivacyPolicyScreen")}
          >
            <Privacy width={normalize(24)} height={normalize(24)} />
            <Text style={styles.navButtonText}>{i18n.t("privacyPolicy")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("AboutAppScreen")}
          >
            <About width={normalize(24)} height={normalize(24)} />
            <Text style={styles.navButtonText}>{i18n.t("aboutApp")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.signOut}
        onPress={() => setOpenExitModal(true)}
      >
        <SignOut width={normalize(24)} height={normalize(24)} />
        <Text style={styles.signOutText}>{i18n.t("signOut")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
