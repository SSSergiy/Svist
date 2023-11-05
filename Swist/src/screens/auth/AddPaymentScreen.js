import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";

import { useNavigation } from "@react-navigation/native";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { normalize } from "../../responsive/fontSize";
import OutlineButton from "../../../assets/outlineButton.svg";
import AuthWhiteButton from "../../../assets/authWhiteButton.svg";
import CreditCard from "../../../assets/creditCard.svg";
import AuthMiniInfoButton from "../../../assets/authMiniInfoButton.svg";
import LoadingModal from "../../components/LoadingModal";
import { createCard, getCards } from "../../api/authApi";
import AuthBackButton from "../../../assets/authBackButton.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { WebView } from "react-native-webview";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import { GT } from "../../constants/fonts";
import { setUserCards } from "../../redux/paymentReducer";
import { useDispatch } from "react-redux";
import {
  setAge,
  setEmail,
  setName,
  setPhone,
  setSurname,
} from "../../redux/authReducer";
import OutlineBtnGrey from "../../../assets/outlineBtnGrey.svg";

const AddPaymentScreen = () => {
  const dispatch = useDispatch();
  const { authToken, setIsAuth, i18n } = useAuth();
  const [errorEmail, setErrorEmail] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [cardId, setCardId] = useState("");
  const [tryCount, setTryCount] = useState(0);
  const [cardsLength, setCardsLength] = useState(0);
  const [openError, setOpenError] = useState(false);
  const navigation = useNavigation();
  const [url, setUrl] = useState("");
  const [canGoBack, setCanGoBack] = useState(false);
  const [close, setClose] = useState(false);
  //a08b8af1a8b15ee5b58603e987cbf25e
  const checkCard = () => {
    if (tryCount < 10) {
      getCards(authToken).then((res) => {
        if (res?.data?.data?.length > cardsLength) {
          const array = res?.data?.data.sort((a, b) =>
            a.is_main < b.is_main ? 1 : -1
          );
          dispatch(setUserCards(array));
          setOpenLoading(false);
          setCardId("");
          setTryCount(0);
          AsyncStorage.setItem("auth", authToken);
          setIsAuth(true);
          dispatch(setName(""));
          dispatch(setPhone(""));
          dispatch(setEmail(""));
          dispatch(setAge(""));
          dispatch(setSurname(""));
          setUrl("");
        } else {
          setTryCount(tryCount + 1);
          setOpenLoading(true);
        }
      });
    } else {
      setTryCount(0);
      setCardId("");
      setOpenLoading(false);
      // setOpenError(true)
    }
  };
  const cardCreate = () => {
    createCard(authToken).then((res) => {
      console.log("url", res.data.data.url);
      if (res.data.data.url) {
        // Linking.openURL(res.data.data.url).catch((err) =>
        //   console.error('An error occurred', err),
        // );
        setUrl(res?.data?.data?.url);
        setClose(true);
        getCards(authToken).then((card) => {
          setCardsLength(card?.data?.data?.length);
          console.log(res?.data?.data);
          setCardId(res?.data?.data);
        });
      } else {
        setOpenError(true);
      }
      // setFocusNumber(true)
      // navigation.goBack()
    });
  };
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
      {openLoading && !close && (
        <LoadingModal setOpenLoading={setOpenLoading} />
      )}
      {close && url && (
        <PaymentModal
          isOpen={close}
          setIsOpen={setClose}
          url={url}
          setUrl={setUrl}
        />
      )}
      {openError && (
        <ErrorModal
          isOpen={openError}
          setIsOpen={setOpenError}
          errorText={i18n.t("arrorAddingCard")}
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
        {/*<Text style={styles.text}>*/}
        {/*  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas*/}
        {/*  risus pellentesque.*/}
        {/*</Text>*/}
        <CreditCard
          style={{ marginTop: normalize(40), alignSelf: "center" }}
          height={normalize(222)}
        />
      </View>
      <View style={{ position: "absolute", bottom: normalize(32) }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            cardCreate();
          }}
        >
          <AuthWhiteButton />

          <Text
            style={{
              ...styles.buttonText,
              color: "#FE7B01",
            }}
          >
            {i18n.t("addCard")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            AsyncStorage.setItem("auth", authToken);
            setIsAuth(true);
          }}
        >
          <OutlineBtnGrey width={normalize(342)} />

          <Text
            style={{
              ...styles.buttonText,
              color: "white",
            }}
          >
            {i18n.t("skip")}
          </Text>
        </TouchableOpacity>
      </View>
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
    marginTop: normalize(20),
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
    alignSelf: "center",
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

export default AddPaymentScreen;
