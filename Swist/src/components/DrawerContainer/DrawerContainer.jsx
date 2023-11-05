import React, { useEffect, useState } from "react";
import { normalize } from "../../responsive/fontSize";
import {
  Dimensions,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../../../assets/logo.svg";
import { GT, GT_BOLD } from "../../constants/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../provider/AuthProvider";
import DrawerLabel from "../../../assets/drawerLabel.svg";
import UserAvatar from "../../../assets/userAvatar.svg";
import LanguageBlock from "../../../assets/langContainer.svg";
import MenuPayment from "../../../assets/menu/menuPayment.svg";
import MenuSupport from "../../../assets/menu/menuSupport.svg";
import MenuPromoCodes from "../../../assets/menu/menuPromoCodes.svg";
import ChangeLanguageLine from "../../../assets/changeLanguageLine.svg";
import MenuLanguageButton from "../../../assets/menu/menuLanguageButton.svg";
import Delete from "../../../assets/menu/delete.svg";
import History from "../../../assets/menu/menuHistory.svg";
import { useDrawerStatus } from "@react-navigation/drawer";
import { styles } from "./styles";
import AddCardModal from "../AddCardModal";
import { Defs } from "react-native-svg";
import { deleteProfile } from "../../api/authApi";
import ExitModal from "../ExitModal";
import { getPromoMinutes } from "../../api/promocodesApi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectScooter, setFreeMinutes } from "../../redux/rideReducer";
import { setDebt, setUser, setUserCards } from "../../redux/paymentReducer";
import {
  setAge,
  setEmail,
  setName,
  setPhone,
  setSurname,
} from "../../redux/authReducer";

const DrawerContainer = ({ props }) => {
  const isOpen = useDrawerStatus() === "open";
  const { authToken, setIsAuth, i18n, locale, setLocale } = useAuth();
  const { user, debt, userCards } = useSelector((state) => state.payment);
  const { freeMinutes } = useSelector((state) => state.ride);
  const [changeLanguage, setChangeLanguage] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [openExitModal, setOpenExitModal] = useState(false);
  const dispatch = useDispatch();
  const exit = () => {
    setOpenExitModal(false);
    dispatch(setUser({}));
    dispatch(setSelectScooter({}));
    dispatch(setUserCards([]));
    dispatch(setDebt({}));
    dispatch(setName(""));
    dispatch(setPhone(""));
    dispatch(setEmail(""));
    dispatch(setAge(""));
    dispatch(setSurname(""));
    AsyncStorage.removeItem("auth");
    setIsAuth(false);
  };
  const deleteAccount = () => {
    deleteProfile(authToken).then((res) => {
      if (res?.data?.success) {
        exit();
      }
    });
  };
  useEffect(() => {
    getPromoMinutes(authToken).then((data) =>
      dispatch(setFreeMinutes(data?.totalMinutes))
    );
  }, []);
  useEffect(() => {
    setChangeLanguage(false);
  }, [useDrawerStatus()]);
  return (
    <>
      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          setChangeLanguage(false);
        }}
        style={{ flex: 1 }}
      >
        {isOpen && Platform.OS === "ios" && (
          <TouchableOpacity
            style={styles.label}
            onPress={() => props.navigation.closeDrawer()}
          >
            <DrawerLabel width={normalize(76)} height={normalize(48)} />
          </TouchableOpacity>
        )}
        <View style={styles.container}>
          {addCard && <AddCardModal setIsOpen={setAddCard} isOpen={addCard} />}
          {openExitModal && (
            <ExitModal
              setIsOpen={setOpenExitModal}
              isOpen={openExitModal}
              onPress={deleteAccount}
            />
          )}
          <View
            style={{ paddingTop: normalize(10), marginBottom: normalize(40) }}
          >
            {isOpen && Platform.OS === "android" && (
              <TouchableOpacity
                style={styles.label}
                onPress={() => props.navigation.closeDrawer()}
              >
                <DrawerLabel width={normalize(76)} height={normalize(48)} />
              </TouchableOpacity>
            )}
            <Logo />
          </View>
          <TouchableOpacity
            style={styles.rowContainer}
            onPress={() => {
              props.navigation.navigate("ProfileScreen");
            }}
          >
            <UserAvatar width={normalize(72)} height={normalize(56)} />
            <View style={{ marginLeft: normalize(16) }}>
              <Text style={styles.title}>{user?.name}</Text>
              <Text
                style={{
                  color: "#1F1E1D",
                  fontSize: normalize(12),
                  fontFamily: GT,
                }}
              >
                {i18n.t("goToProfile")}
              </Text>
            </View>
          </TouchableOpacity>

          {!Platform.isPad && (
            <>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  { alignItems: debt?.amount > 0 ? "flex-start" : "center" },
                ]}
                onPress={() => {
                  userCards?.length > 0
                    ? props.navigation.navigate("PaymentScreen")
                    : setAddCard(true);
                }}
              >
                <MenuPayment width={normalize(24)} height={normalize(24)} />
                <View>
                  <Text style={styles.menuItemText}>{i18n.t("payment")}</Text>
                  {debt?.amount > 0 && (
                    <Text
                      style={{
                        color: "#1F1E1D",
                        fontSize: normalize(16),
                        marginLeft: normalize(15),
                        fontFamily: GT,
                        marginTop: normalize(8),
                      }}
                    >
                      {i18n.t("negativeBalance")}:
                      <Text style={{ color: "#EF4E4E", fontFamily: GT_BOLD }}>
                        {" "}
                        -{debt?.amount}€
                      </Text>
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Promocodes");
                  console.log("here");
                }}
                style={{ ...styles.menuItem, alignItems: "flex-start" }}
              >
                <MenuPromoCodes width={normalize(24)} height={normalize(24)} />
                <View>
                  <Text style={styles.menuItemText}>
                    {i18n.t("promoCodes")}
                  </Text>
                  {freeMinutes > 0 && (
                    <Text
                      style={{
                        color: "#1F1E1D",
                        fontSize: normalize(16),
                        marginLeft: normalize(18),
                        fontFamily: GT,
                        marginTop: normalize(8),
                      }}
                    >
                      {i18n.t("freeMinutes")}:
                      <Text style={{ color: "#FE7B01", fontFamily: GT_BOLD }}>
                        {" "}
                        {(freeMinutes / 60).toFixed(1)}
                      </Text>
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => props.navigation.navigate("HistoryOfRides")}
              >
                <History width={normalize(24)} height={normalize(24)} />
                <Text style={styles.menuItemText}>{i18n.t("history")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  props.navigation.navigate("SupportScreen");
                }}
              >
                <MenuSupport width={normalize(24)} height={normalize(24)} />
                <Text style={styles.menuItemText}>{i18n.t("support")}</Text>
              </TouchableOpacity>
            </>
          )}
          {!changeLanguage ? (
            <TouchableOpacity
              style={styles.languageBlock}
              onPress={() => setChangeLanguage(true)}
            >
              <MenuLanguageButton
                width={normalize(79)}
                height={normalize(48)}
              />
              <Text
                style={{
                  ...styles.menuItemText,
                  position: "absolute",
                  textTransform: "uppercase",
                }}
              >
                {i18n.locale === "sk"
                  ? "SK"
                  : i18n.locale === "eng"
                  ? "EN"
                  : "UA"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{ ...styles.languageBlock, alignItems: "flex-start" }}>
              <LanguageBlock width={normalize(250)} />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => setChangeLanguage(false)}
              >
                <Text
                  style={{
                    ...styles.menuItemText,
                    marginRight: normalize(23),
                    color: "#FE7B01",
                    textTransform: "uppercase",
                  }}
                >
                  {i18n.locale === "sk"
                    ? "SK"
                    : i18n.locale === "eng"
                    ? "EN"
                    : "UA"}
                </Text>
                <ChangeLanguageLine
                  width={normalize(9)}
                  height={normalize(50)}
                />
                <TouchableOpacity
                  onPress={() => {
                    setLocale("sk");
                    AsyncStorage.setItem("locale", "sk");
                    setChangeLanguage(false);
                  }}
                >
                  <Text
                    style={{
                      ...styles.menuItemText,
                      fontSize: normalize(20),
                      marginLeft: 12,
                    }}
                  >
                    SK
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLocale("eng");
                    AsyncStorage.setItem("locale", "eng");
                    setChangeLanguage(false);
                  }}
                >
                  <Text
                    style={{
                      ...styles.menuItemText,
                      fontSize: normalize(20),
                      marginLeft: 22,
                    }}
                  >
                    ENG
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLocale("ukr");
                    AsyncStorage.setItem("locale", "ukr");
                    setChangeLanguage(false);
                  }}
                >
                  <Text
                    style={{
                      ...styles.menuItemText,
                      fontSize: normalize(20),
                      marginLeft: 22,
                    }}
                  >
                    UA
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Pressable>
    </>
  );
};

export default DrawerContainer;
