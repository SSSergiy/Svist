import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card1 from "../../../assets/payment/card1.svg";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AddNewCardButton from "../../../assets/payment/addNewCardButton.svg";
import AddNewCardFilledButton from "../../../assets/payment/addNewCardFilledButton.svg";
import BackButton from "../../../assets/payment/backButton.svg";
import DebtButton from "../../../assets/payment/debtButton.svg";
import PayAgainButton from "../../../assets/payment/payAgainButton.svg";
import { deleteCard, getCards, payTrip, setMainCard } from "../../api/authApi";
import { getDebts } from "../../api/scooterApi";
import ConnectionErrorModal from "../../components/ConnectionErrorModal";
import DeleteCardModal from "../../components/DeleteCardModal";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import LoadingModal from "../../components/LoadingModal";
import MaximumCardsModal from "../../components/MaximumCardsModal";
import NegativeBalanceModal from "../../components/NegativeBalanceModal/NegativeBalanceModal";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import { GT, GT_BOLD } from "../../constants/fonts";
import { useAuth } from "../../provider/AuthProvider";
import { setDebt } from "../../redux/paymentReducer";
import { normalize } from "../../responsive/fontSize";
import CardsList from "./CardsList";
import FakeCard from "./FakeCard";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const [isMaximumCards, setIsMaximumCards] = useState(false);
  const [cards, setCards] = useState([]);
  const [openCards, setOpenCards] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hideButtons, setHideButtons] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openBalanceErrorModal, setOpenBalanceErrorModal] = useState(false);
  const [firstBalanceError, setFirstBalanceError] = useState(false);
  const [deleteCardOpen, setDeleteCardOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [error, setError] = useState("");
  const [changeColor, setChangeColor] = useState(false);
  const navigation = useNavigation();
  const [rows, setRows] = useState([]);
  const [selectCard, setSelectCard] = useState({});
  const [select, setSelect] = useState({});
  const [changeMainCard, setChangeMainCard] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const { authToken, i18n, locale } = useAuth();
  const { debt, userCards } = useSelector((state) => state.payment);
  const getCardImg = useMemo(
    // eslint-disable-next-line react/display-name
    () => (index) => {
      // if (index < 6) {// <=== Uncomment this if new design approved
      if (index < 3) {
        if (index === 0) {
          return <Card1 />;
        } else {
          const lighterColors = [
            "#FE7B03",
            "#FE9534",
            "#FFB067",
            // "#FFCA99", // <==== Uncomment this if new design approved
            // "#FFE4CB",
            // "#FFF7EF",
          ];

          let brighterFill = lighterColors[index];
          return (
            <FakeCard
              prevFill={brighterFill}
              width={normalize(352 - index * 17)}
            />
          );
        }
      }
    },
    []
  );

  const getInfo = useCallback(() => {
    getCards(authToken).then((res) => {
      const sortArray = res?.data?.data.sort((a, b) =>
        a.is_main < b.is_main ? 1 : -1
      );
      setCards(
        sortArray?.map((item, index) => {
          return {
            ...item,
            value: new Animated.Value(
              index < 3 ? index * normalize(185) : index * normalize(180)
            ),
          };
        })
      );
      setRows(
        sortArray?.map((item, index) => {
          return { ...item, value: new Animated.Value(index * normalize(180)) };
        })
      );
      setChangeColor(false);
      setSelectCard(sortArray[0]);
      setSelect(sortArray[0]);
    });
    getDebts(authToken).then((res) => {
      dispatch(setDebt(res));
    });
    setOpenCards(false);
    setHideButtons(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    getDebts(authToken)
      .then((res) => {
        dispatch(setDebt(res));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [openPaymentModal]);

  useEffect(() => {
    !!navigation.isFocused() && getInfo();
    if (!navigation.isFocused()) {
      setCards([]);
      setRows([]);
    }
  }, [navigation.isFocused(), userCards]);

  const shuffle = (indexItem, item) => {
    let array = rows;
    if (item.id === selectCard?.id) {
      closeUserCards();
    }
    return [array[indexItem]].concat(
      rows.filter((card) => card.id !== item.id)
    );
  };
  const openUserCards = useCallback(() => {
    setChangeColor(true);
    cards.map((item, index) => {
      Animated.timing(item?.value, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start((finish) => {
        if (finish && index === cards.length - 1) {
          setOpenCards(true);
        }
      });
    });
  }, [cards]);

  const closeUserCards = useCallback(() => {
    setOpenCards(false);
    cards.map((item, index) => {
      Animated.timing(item?.value, {
        toValue: index < 3 ? index * normalize(185) : index * normalize(180),
        duration: 200,
        useNativeDriver: false,
      }).start((finish) => {
        setChangeColor(false);
        if (finish && index === cards.length - 1) {
          setHideButtons(false);
          // setCloseMask(false)
        }
      });
    });
  }, [cards]);

  const payDebt = () => {
    setOpenPaymentModal(true);
    payTrip(debt?.no_payed_trip_id, authToken).then((res) => {
      setPaymentUrl(res?.data?.data?.url);
    });
  };
  useEffect(() => {
    if (changeMainCard && !!selectCard?.id && !selectCard?.is_main) {
      setMainCard(selectCard?.id, authToken).then((res) => {
        setSelectCard({ ...selectCard, is_main: 1 });
        setChangeMainCard(false);
      });
    }
  }, [changeMainCard, selectCard?.id]);

  function handleBackButtonClick() {
    navigation.navigate("MainScreen");
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  return (
    <View style={styles.container}>
      {openPaymentModal && (
        <PaymentModal
          setIsOpen={setOpenPaymentModal}
          isOpen={openPaymentModal}
          url={paymentUrl}
        />
      )}
      {debt?.amount > 0 && (
        <ConnectionErrorModal
          text={i18n.t("payLastRide")}
          onPress={() => navigation.navigate("PaymentScreen")}
        />
      )}
      {isMaximumCards ? (
        <MaximumCardsModal
          setIsOpen={setIsMaximumCards}
          isOpen={isMaximumCards}
        />
      ) : null}
      {deleteCardOpen && (
        <DeleteCardModal
          setIsOpen={setDeleteCardOpen}
          isOpen={deleteCardOpen}
          onPress={() => {
            deleteCard(authToken, select?.id).then((res) => {
              if (res?.data?.result === "success") {
                setDeleteCardOpen(false);
                getInfo();
              } else {
                setError(res);
                setErrorOpen(true);
              }
            });
          }}
        />
      )}
      {errorOpen && (
        <ErrorModal
          setIsOpen={setErrorOpen}
          isOpen={errorOpen}
          errorText={error}
        />
      )}
      {openBalanceErrorModal && (
        <NegativeBalanceModal
          setIsOpen={setOpenBalanceErrorModal}
          setOpenCards={setOpenCards}
          setHideButtons={setHideButtons}
          isOpen={openBalanceErrorModal}
        />
      )}
      {/*{openBalanceErrorModal && <TransactionFailedModal setIsOpen={setOpenBalanceErrorModal} isOpen={openBalanceErrorModal}  />}*/}
      {cards?.length === 0 && Platform.OS !== "ios" && (
        <LoadingModal
          visible={cards?.length === 0}
          setOpenLoading={setLoading}
        />
      )}
      <TouchableOpacity
        style={{ position: "absolute", left: 0, top: normalize(48) }}
        onPress={handleBackButtonClick}
      >
        <BackButton />
      </TouchableOpacity>
      <View style={styles.paymentBlock}>
        <Text style={styles.title}>{i18n.t("payment")}</Text>
        {openCards ? (
          <CardsList
            rows={rows}
            closeUserCards={closeUserCards}
            shuffle={shuffle}
            selectCard={selectCard}
            setSelectCard={setSelectCard}
            select={select}
            setSelect={setSelect}
            setHideButtons={setHideButtons}
            setRows={setRows}
            setCards={setCards}
            deleteCardOpen={deleteCardOpen}
            setDeleteCardOpen={setDeleteCardOpen}
            setOpenBalanceErrorModal={setOpenBalanceErrorModal}
            setChangeMainCard={setChangeMainCard}
          />
        ) : (
          <Pressable
            style={{ ...styles.cardsContainer, height: "55%" }}
            onPress={() => {
              if (cards?.length >= 1) {
                setHideButtons(true);
                openCards ? closeUserCards() : openUserCards();
              }
            }}
          >
            {cards?.map((item, index) => {
              return (
                <Animated.View
                  key={index}
                  style={
                    !hideButtons && index > 5
                      ? {
                          position: "absolute",
                          zIndex: cards.length - index,
                          top: 0,
                          alignItems: "center",
                        }
                      : {
                          zIndex: cards.length - index,
                          marginBottom: normalize(-170),
                          alignItems: "center",
                        }
                  }
                >
                  {getCardImg(index)}
                  <Text style={styles.cardPanNumber}>
                    {rows[index]?.card_pan?.substr(
                      rows[index]?.card_pan?.length - 4
                    )}
                  </Text>
                </Animated.View>
              );
            })}
          </Pressable>
        )}
        {!hideButtons && cards?.length > 1 && (
          <Text
            style={{ ...styles.switchClickText }}
            onPress={() => {
              setHideButtons(true);
              openCards ? closeUserCards() : openUserCards();
            }}
          >
            {i18n.t("clickToSwitchCards")}
          </Text>
        )}
      </View>
      {!hideButtons && (
        <View style={styles.buttonsBlock}>
          {debt?.amount > 0 && (
            <View style={styles.buttonRow}>
              <View
                style={{
                  ...styles.button,
                  ...styles.debtButton,
                  marginRight: normalize(16),
                }}
              >
                <DebtButton
                  style={{ position: "absolute" }}
                  width={normalize(163)}
                  height={normalize(56)}
                />
                <Text style={[styles.buttonText, styles.buttonDebtText]}>
                  -{debt?.amount} €
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.button, styles.debtButton]}
                onPress={() => payDebt()}
              >
                <PayAgainButton
                  style={{ position: "absolute" }}
                  width={normalize(163)}
                  height={normalize(56)}
                />
                <Text style={styles.buttonText} adjustsFontSizeToFit={true}>
                  {i18n.t("payAgain")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={
              cards?.length < 10
                ? () => navigation.navigate("AddNewCardScreen")
                : () => setIsMaximumCards(true)
            }
            // disabled={userCards.length > 10}
          >
            {debt?.amount >= 0 ? (
              <AddNewCardButton
                width={normalize(342)}
                height={normalize(56)}
                style={{ position: "absolute" }}
              />
            ) : (
              <AddNewCardFilledButton
                width={normalize(342)}
                height={normalize(56)}
                style={{ position: "absolute" }}
              />
            )}
            <Text
              style={{
                ...styles.buttonText,
                color: debt?.amount > 0 ? "#FE7B01" : "white",
              }}
            >
              {i18n.t("addNewCard")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: normalize(48),
    paddingBottom: normalize(80),
    paddingLeft: normalize(24),
    paddingRight: normalize(24),
    height: Dimensions.get("window").height,
    justifyContent: "space-between",
  },
  paymentBlock: {
    alignItems: "center",
    marginTop: normalize(48),
    width: "100%",
  },
  cardsContainer: {
    width: "100%",
    marginTop: normalize(32),
    alignItems: "center",
  },
  title: {
    fontSize: normalize(24),
    color: "black",
    marginTop: normalize(48),
    fontWeight: "500",
    fontFamily: GT_BOLD,
    alignSelf: "flex-start",
  },
  buttonsBlock: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: normalize(56),
    marginTop: normalize(16),
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  debtButton: {
    width: normalize(163),
    height: normalize(56),
    paddingLeft: normalize(10),
    paddingRight: normalize(10),
  },
  buttonText: {
    fontSize: normalize(23),
    color: "white",
    fontWeight: "500",
    fontFamily: GT,
    textAlign: "center",
  },
  buttonDebtText: {
    color: "#EF4E4E",
  },
  addCardText: {
    color: "#FE7B01",
  },
  switchClickText: {
    fontSize: normalize(16),
    fontFamily: GT,
    color: "#FE7B01",
    zIndex: -1,
  },
  cardPanText: {
    position: "absolute",
    zIndex: 1,
    color: "white",
    top: "50%",
    right: "30%",
  },
  cardPanNumber: {
    position: "absolute",
    zIndex: 1,
    color: "white",
    top: "51%",
    right: "25%",
    letterSpacing: 2,
    fontFamily: GT_BOLD,
  },
});
export default PaymentScreen;
