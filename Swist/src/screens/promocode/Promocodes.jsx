import React, { useCallback, useEffect, useState } from "react";
import { styles as mainStyles } from "../problem/styles";
import {
  Animated,
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { normalize, SCREEN_WIDTH } from "../../responsive/fontSize";
import BackButton from "../../../assets/backPath.svg";
import { useAuth } from "../../provider/AuthProvider";
import WhiteBlockSvg from "../../../assets/promocodes/white_block_short.svg";
import WhiteBorderSvg from "../../../assets/promocodes/white_border_short.svg";
import { styles } from "./styles";
import sized from "../../utils/sized";
import OutlineButton from "../../../assets/outlineButton.svg";
import AddNewCardFilledButton from "../../../assets/payment/addNewCardFilledButton.svg";
import WhiteButton from "../../../assets/authWhiteButton.svg";
import {
  activatePromoCode,
  findPromoCode,
  getPromoCodes,
  getPromoMinutes,
} from "../../api/promocodesApi";
import CongratsSvg from "../../../assets/promocodes/congrats.svg";
import PromocodeItem from "./PromocodeItem";
import ErrorIcon from "../../../assets/errorIcon.svg";
import { setFreeMinutes } from "../../redux/rideReducer";
import { useDispatch, useSelector } from "react-redux";
import SwistMan from "../../../assets/swist-man.svg";

const WhiteBlockIcon = sized(WhiteBlockSvg, SCREEN_WIDTH / 2, 40);
const WhiteBorderIcon = sized(WhiteBorderSvg, SCREEN_WIDTH / 2, 40);
const CongratsIcon = sized(CongratsSvg, SCREEN_WIDTH - 82, 240);

const Promocodes = ({ navigation }) => {
  const { authToken, i18n } = useAuth();
  const { freeMinutes } = useSelector((state) => state.ride);
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState("promocode");
  const [promoCode, setPromoCode] = useState("");
  const [focusInput, setFocusInput] = useState(false);

  const [activatedMinutes, setActivatedMinutes] = useState(null);
  const [promoCodes, setPromoCodes] = useState([]);
  const [errorText, setErrorText] = useState(null);
  const [bottom, setBottom] = useState(new Animated.Value(normalize(40)));
  const [isKeyboard, setIsKeyboard] = useState(false);

  const activatePromo = useCallback((promoCode) => {
    // setActivatedMinutes(20)
    findPromoCode(authToken, promoCode)
      .then((data) => {
        if (data.bonus_minutes) {
          setActivatedMinutes(data.bonus_minutes);
          setErrorText("");
          activatePromoCode(authToken, data.id)
            .then((res) => {
              console.log("activatePromoCode::: ", res);
            })
            .catch((e) => console.error(e));
        } else if (data.response.data) {
          // setErrorText()
          setErrorText(data.response.data.errors[0].message);
        }
      })
      .catch((e) => console.log(e));
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setIsKeyboard(true);
        Animated.timing(bottom, {
          toValue: e.endCoordinates.height - 65,
          // easing: Easing.back(),
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboard(false);
        Animated.timing(bottom, {
          toValue: normalize(40),
          // easing: Easing.back(),
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (!activatedMinutes) {
      getPromoMinutes(authToken).then((data) => {
        dispatch(setFreeMinutes(data?.totalMinutes));
      });
      getPromoCodes(authToken).then((data) => {
        setPromoCodes(data);
      });
    }
  }, [activatedMinutes]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={Keyboard.dismiss}
      style={[
        styles.container,
        {
          justifyContent: "space-between",
          backgroundColor: !errorText ? "#FE7B01" : "#EF4E4E",
          paddingTop: focusInput ? 0 : normalize(48),
        },
      ]}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          left: 0,
          top: focusInput ? normalize(36) : normalize(48),
        }}
        onPress={() => {
          // if (selectedTab === "usedCodes") setSelectedTab("promocode");
          // else if (activatedMinutes) setActivatedMinutes(null);
          // else navigation.goBack();
          navigation.navigate("MainScreen");
        }}
      >
        <BackButton />
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          marginTop: normalize(48),
          width: "100%",
        }}
      >
        <View style={styles.mainBlock__buttons}>
          <TouchableOpacity
            onPress={() => setSelectedTab("promocode")}
            style={styles.mainBlock__button}
          >
            {selectedTab === "promocode" ? (
              <WhiteBlockIcon style={styles.mainBlock__buttonBg} />
            ) : (
              <WhiteBorderIcon style={styles.mainBlock__buttonBg} />
            )}
            <Text
              style={[
                styles.mainBlock__description,
                { textAlign: "center", width: "100%", marginLeft: 12 },
                selectedTab === "promocode" && {
                  color: !errorText ? "#FE7B01" : "#EF4E4E",
                },
              ]}
            >
              {i18n.t("promoCode")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab("usedCodes")}
            style={styles.mainBlock__button}
          >
            {selectedTab === "usedCodes" ? (
              <WhiteBlockIcon style={styles.mainBlock__buttonBg} />
            ) : (
              <WhiteBorderIcon style={styles.mainBlock__buttonBg} />
            )}
            <Text
              style={[
                styles.mainBlock__description,
                { textAlign: "center", width: "100%", marginLeft: 12 },
                selectedTab === "usedCodes" && {
                  color: !errorText ? "#FE7B01" : "#EF4E4E",
                },
              ]}
            >
              {i18n.t("usedCodes")}
            </Text>
          </TouchableOpacity>
        </View>
        {selectedTab === "promocode" ? (
          <>
            {activatedMinutes ? (
              <>
                <Text style={styles.mainBlock__title}>
                  {i18n.t("congratsPromo")}
                </Text>
                {/*<CongratsIcon style={{marginTop: 24}}/>*/}
                <CongratsSvg
                  style={{ marginTop: 5 }}
                  width={normalize(308)}
                  height={normalize(233)}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <View>
                    <Text
                      style={[
                        styles.mainBlock__title,
                        { fontSize: 86, marginRight: 16 },
                      ]}
                    >
                      {activatedMinutes}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.mainBlock__title,
                        {
                          marginBottom: 20,
                          textTransform: "lowercase",
                        },
                      ]}
                    >
                      {i18n.t("freeMinutes")}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.mainBlock__title}>
                  {i18n.t("enterPromoCode")}
                </Text>
                <Text style={styles.mainBlock__description}>
                  {i18n.t("enterPromoCodeDescription")}
                </Text>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginTop: normalize(40),
                    width: "100%",
                  }}
                >
                  {focusInput ? (
                    <OutlineButton width={"100%"} />
                  ) : (
                    <OutlineButton opacity={"0.24"} width={"100%"} />
                  )}
                  <TextInput
                    placeholder={i18n.t("enterPromoCode")}
                    style={styles.input}
                    placeholderTextColor={"white"}
                    onChangeText={setPromoCode}
                    value={promoCode}
                    onFocus={() => setFocusInput(true)}
                    onBlur={() => setFocusInput(false)}
                  />
                  {errorText && (
                    <ErrorIcon
                      style={{ position: "absolute", right: normalize(34) }}
                    />
                  )}
                </TouchableOpacity>
                {errorText && <Text style={styles.errorText}>{errorText}</Text>}
              </>
            )}
          </>
        ) : (
          <>
            <Text style={[styles.mainBlock__title, { marginBottom: 40 }]}>
              {i18n.t("historyOfPromoCodes")}
            </Text>
            {promoCodes?.length > 0 && (
              <FlatList
                data={promoCodes}
                style={{ marginBottom: normalize(150) }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>
                  item?.id && <PromocodeItem item={item} />
                }
                keyExtractor={(item) => item?.id}
              />
            )}
            {promoCodes?.length === 0 && (
              <View width={"100%"}>
                <Text
                  style={[
                    styles.mainBlock__title,
                    { fontSize: 30, marginTop: 20 },
                  ]}
                >
                  {i18n.t("notCodeYet")}
                </Text>
              </View>
            )}
          </>
        )}
      </View>
      {!activatedMinutes && selectedTab === "promocode" && (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.mainBlock__description}>
            {i18n.t("freeMinutes")}:{" "}
            <Text style={styles.mainBlock__title}>{freeMinutes / 60}</Text>
          </Text>
        </View>
      )}
      {selectedTab === "promocode" && (
        <Animated.View style={{ marginBottom: bottom }}>
          {activatedMinutes ? (
            <TouchableOpacity
              style={mainStyles.mainButton}
              disabled={promoCode.length === 0}
              onPress={() => {
                setActivatedMinutes(null);
                setPromoCode("");
              }}
            >
              {promoCode.length > 0 ? (
                <OutlineButton width={"100%"} height={normalize(56)} />
              ) : (
                <OutlineButton
                  opacity={"0.24"}
                  width={"100%"}
                  height={normalize(56)}
                />
              )}
              <Text style={[mainStyles.buttonText, { color: "white" }]}>
                {i18n.t("continue")}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={mainStyles.mainButton}
              disabled={promoCode.length === 0}
              onPress={() => activatePromo(promoCode)}
            >
              {promoCode.length > 0 ? (
                <WhiteButton width={"100%"} height={normalize(56)} />
              ) : (
                <OutlineButton
                  opacity={"0.24"}
                  width={"100%"}
                  height={normalize(56)}
                />
              )}
              <Text
                style={[
                  mainStyles.buttonText,
                  promoCode.length === 0
                    ? { color: "white" }
                    : { color: !errorText ? "#FE7B01" : "#EF4E4E" },
                ]}
              >
                {i18n.t("use")}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}
      {selectedTab === "usedCodes" && promoCodes?.length === 0 && (
        <SwistMan style={styles.swistMan} />
      )}
    </TouchableOpacity>
  );
};

export default Promocodes;
