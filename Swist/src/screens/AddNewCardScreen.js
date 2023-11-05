import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { createCard, getCards } from "../api/authApi";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LoadingModal from "../components/LoadingModal";
import { normalize } from "../responsive/fontSize";
import AuthBackButton from "../../assets/authBackButton.svg";
import CreditCard from "../../assets/creditCard.svg";
import AuthWhiteButton from "../../assets/authWhiteButton.svg";
import OutlineButton from "../../assets/outlineButton.svg";
import ErrorModal from "../components/ErrorModal/ErrorModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PaymentModal from "../components/PaymentModal/PaymentModal";
import { GT, GT_BOLD } from "../constants/fonts";
import { setUserCards } from "../redux/paymentReducer";
import { useDispatch } from "react-redux";

const AddNewCardScreen = () => {
  const dispatch = useDispatch();
  const { authToken, i18n, isAdded, setIsAdded } = useAuth();
  const [errorEmail, setErrorEmail] = useState(false);
  const [focusNumber, setFocusNumber] = useState(false);
  const [focusDate, setFocusDate] = useState(false);
  const [focusCVV, setFocusCVV] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [cardId, setCardId] = useState("");
  const [tryCount, setTryCount] = useState(0);
  const [cardsLength, setCardsLength] = useState(0);
  const navigation = useNavigation();
  const [close, setClose] = useState(false);
  const [url, setUrl] = useState("");
  const [errorText, setErrorText] = useState("");

  const cardCreate = () => {
    createCard(authToken).then((res) => {
      if (res?.data?.data?.url) {
        // Linking.openURL(res.data.data.url).catch((err) =>
        //   console.error('An error occurred', err),
        // );
        setUrl(res?.data?.data?.url);
        setClose(true);
        getCards(authToken).then((card) => {
          // const array=res?.data?.data.sort((a, b) => a.is_main < b.is_main ? 1 : -1)
          // dispatch(setUserCards(array))
          setCardsLength(card?.data?.data?.length);
          console.log(res?.data?.data);
          setCardId(res?.data?.data);
        });
        setOpenError(false);
        setErrorText("");
      } else {
        setErrorText(res);
        setOpenError(true);
      }
      // setFocusNumber(true)
      // navigation.goBack()
    });
  };
  const checkCard = () => {
    if (tryCount < 10) {
      getCards(authToken).then((res) => {
        console.log(res?.data?.data?.length, cardsLength);
        const array = res?.data?.data.sort((a, b) =>
          a.is_main < b.is_main ? 1 : -1
        );
        dispatch(setUserCards(array));

        if (res?.data?.data?.length > cardsLength) {
          setOpenLoading(false);
          setCardId("");
          setTryCount(0);
          setUrl("");
          setIsAdded(true);
          navigation.goBack();
        } else {
          setTryCount(tryCount + 1);
          setOpenLoading(true);
        }
      });
    } else {
      setTryCount(0);
      setCardId("");
      setUrl("");
      setOpenLoading(false);
      // setOpenError(true)
    }
  };
  // useEffect(()=>{
  //   if (url&&!close&&cardId) {
  //     const timeout = setInterval(() => {
  //       checkCard()
  //     }, 1000)
  //     return (() => clearInterval(timeout))
  //   }
  // },[cardId,tryCount,close,url])
  useEffect(() => {
    if (url && cardId && !close) {
      checkCard();
    }
  }, [close, tryCount]);
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: errorEmail ? "#EF4E4E" : "#FE7B01",
      }}
    >
      {close && url && (
        <PaymentModal
          isOpen={close}
          setIsOpen={setClose}
          url={url}
          setUrl={setUrl}
        />
      )}
      {openLoading && !close && (
        <LoadingModal setOpenLoading={setOpenLoading} />
      )}
      {errorText && !openLoading && (
        <ErrorModal
          isOpen={openError}
          setIsOpen={setOpenError}
          errorText={errorText}
        />
      )}
      <TouchableOpacity
        style={{ position: "absolute", left: 0, top: normalize(48) }}
        onPress={() => navigation.goBack()}
      >
        <AuthBackButton />
      </TouchableOpacity>
      <View style={{ width: "100%" }}>
        <Text style={styles.title}>{i18n.t("addNewCard")}</Text>
        <Text style={styles.text}>{i18n.t("enterYourCardDetails")}</Text>
        <CreditCard
          style={{ marginTop: normalize(40), alignSelf: "center" }}
          height={normalize(222)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("link");
          openLink ? setOpenLoading(true) : cardCreate();
        }}
      >
        <OutlineButton />
        <Text
          style={{
            ...styles.buttonText,
            color: "white",
          }}
        >
          {i18n.t("addCard")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FE7B01",
    padding: normalize(24),
    alignItems: "center",
    paddingTop: normalize(175),
    justifyContent: "space-between",
    paddingBottom: normalize(40),
  },
  content: {
    width: "100%",
    marginTop: normalize(30),
  },
  centerBlock: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: normalize(60),
    position: "absolute",
    bottom: normalize(32),
  },
  buttonText: {
    position: "absolute",
    color: "#FE7B01",
    fontSize: normalize(24),

    fontFamily: GT,
  },
  title: {
    fontSize: normalize(24),
    color: "white",
    marginTop: normalize(24),
    fontWeight: "500",
    fontFamily: GT,
  },
  text: {
    fontSize: normalize(16),
    color: "white",
    fontFamily: GT,
    marginTop: normalize(16),
  },
  input: {
    position: "absolute",
    color: "white",
    width: "100%",
    paddingLeft: normalize(34),
    fontSize: normalize(16),
  },
  errorText: {
    alignSelf: "center",
    color: "white",
    fontSize: normalize(16),
    marginTop: normalize(16),
    fontFamily: GT,
  },
});

export default AddNewCardScreen;
