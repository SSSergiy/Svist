import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { normalize } from "../../responsive/fontSize";
import CodeInput from "../../../assets/codeInput.svg";
import { CommonActions, useNavigation } from "@react-navigation/native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { createTrip, getCurrentTrip } from "../../api/scooterApi";
import { useAuth } from "../../provider/AuthProvider";
import ReserveFocusButton from "../../../assets/reserveFocusButton.svg";
import ReserveButton from "../../../assets/reserveButton.svg";
import CodeInputS from "../../../assets/codeInputS.svg";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorModal from "../ErrorModal/ErrorModal";
import CloseButton from "../CloseButton";
import { useDispatch, useSelector } from "react-redux";
import { setSeconds, setReservation } from "../../redux/rideReducer";
import CodeInputs from "./CodeInputs";

const EnterCodeModal = ({ setIsOpen, isOpen }) => {
  const [value, setValue] = useState("");
  const { authToken, i18n } = useAuth();
  const { costSettings } = useSelector((state) => state.ride);
  const dispatch = useDispatch();
  const ref = useBlurOnFulfill({ value, cellCount: 5 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [invalidCode, setInvalidCode] = useState(false);
  const [error, setError] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const navigation = useNavigation();
  const codeStyles = StyleSheet.create({
    root: { padding: 1 },
    title: { textAlign: "center", fontSize: 30 },
    // codeFieldRoot: {width:'100%'},
    cell: {
      lineHeight: normalize(38),
      fontSize: normalize(16),
      textAlign: "center",
      position: "absolute",
      color: "black",
    },
    focusCell: {
      borderColor: "#000",
    },
  });
  const tripStart = () => {
    getCurrentTrip(authToken).then((res) => {
      if (res?.is_reserve && res?.status === "in_process") {
        if (res?.name_scooter === `S${value}`) {
          console.log("---created trip reserved ss ---");
          AsyncStorage.setItem("reservation", "");
          setIsOpen(false);
          dispatch(setSeconds(costSettings?.max_reserve_minutes * 60));
          dispatch(setReservation(false));
          navigation.navigate("RideScreen");
        } else {
          setError("You have active ride already");
          setErrorOpen(true);
        }
      } else {
        createTrip(authToken, `S${value}`)
          .then((res) => {
            if (res.result === "success") {
              AsyncStorage.setItem("reservation", "");
              setIsOpen(false);
              navigation.navigate("RideScreen");
            } else {
              console.log(res);
              setError(res?.message || res);
              setErrorOpen(true);
            }
          })
          .catch((e) => console.error(e));
      }
    });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(!isOpen);
      }}
    >
      {errorOpen && (
        <ErrorModal
          setIsOpen={setErrorOpen}
          isOpen={errorOpen}
          errorText={error}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.container}
      >
        <CloseButton onPress={() => setIsOpen(false)} />
        <View
          style={{
            backgroundColor: invalidCode ? "#EF4E4E" : "transparent",
            ...styles.invalidCodeBlock,
          }}
        >
          {invalidCode && (
            <Text
              style={styles.invalidCodeText}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              {i18n.t("invalidCode")}
            </Text>
          )}

          <View style={styles.modalBlock}>
            <Text style={styles.title}>{i18n.t("enterCodeToUnlock")}</Text>
            <Text style={styles.text}>{i18n.t("scooterReadyEnterCode")}</Text>
            <View
              style={{
                justifyContent: "space-between",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <View style={styles.codeRow}>
                <View style={styles.codeInputBlock}>
                  <CodeInputS width={normalize(50)} height={normalize(56)} />

                  <Text
                    style={{
                      position: "absolute",
                      fontSize: normalize(16),
                      textAlign: "center",
                      color: "#FE7B01",
                    }}
                  >
                    S
                  </Text>
                </View>
                <CodeField
                  ref={ref}
                  {...props}
                  value={value}
                  onChangeText={setValue}
                  cellCount={5}
                  // rootStyle={codeStyles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <View style={{ ...styles.codeInputBlock }} key={index}>
                      <CodeInputs
                        width={normalize(50)}
                        isFocused={
                          !symbol && isOpen && !isFocused
                            ? "#EDEDF1"
                            : "#000000"
                        }
                        height={normalize(56)}
                      />
                      <Text
                        key={index}
                        style={[
                          codeStyles.cell,
                          isFocused && codeStyles.focusCell,
                        ]}
                        onLayout={getCellOnLayoutHandler(index)}
                      >
                        {symbol || (isFocused ? <Cursor /> : "X")}
                      </Text>
                    </View>
                  )}
                />
              </View>

              <TouchableOpacity
                disabled={!value}
                style={styles.button}
                onPress={() => {
                  if (value.length !== 5) {
                    setInvalidCode(true);
                  } else {
                    setInvalidCode(false);
                    tripStart();
                  }
                }}
              >
                {value.length !== 5 ? (
                  <ReserveButton width={"100%"} height={normalize(56)} />
                ) : (
                  <ReserveFocusButton width={"100%"} height={normalize(56)} />
                )}

                <Text
                  style={{
                    color: value.length !== 5 ? "#FE7B01" : "white",
                    ...styles.buttonText,
                  }}
                >
                  {i18n.t("continue")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EnterCodeModal;
