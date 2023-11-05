import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import LoadingModal from "../../../components/LoadingModal";
import ExitModal from "../../../components/ExitModal";
import BackButton from "../../../components/BackButton";
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import InfoMiniBlock from "../../../../assets/personalInfo/infoMiniBlock.svg";
import InfoBlock from "../../../../assets/personalInfo/infoBlock.svg";
import InfoMiniErrorBlock from "../../../../assets/personalInfo/infoMiniErrorBlock.svg";
import InfoErrorBlock from "../../../../assets/personalInfo/infoErrorBlock.svg";
import { normalize, SCREEN_HEIGHT } from "../../../responsive/fontSize";
import AuthMiniInfoButton from "../../../../assets/authMiniInfoButton.svg";
import ErrorRedIcon from "../../../../assets/personalInfo/errorRedIcon.svg";
import { useAuth } from "../../../provider/AuthProvider";
import Delete from "../../../../assets/menu/delete.svg";
import SignOut from "../../../../assets/profile/signOut.svg";
import SaveButton from "../../../../assets/reserveFocusButton.svg";
import ContactButton from "../../../../assets/reserveButton.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PersonalInfoInput from "../../../components/PersonalInfoInput/PersonalInfoInput";
import {
  deleteProfile,
  getProfileInfo,
  profileUpdate,
} from "../../../api/authApi";
import ConfirmChangeModal from "../../../components/ConfirmChangeModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteAccountModal from "../../../components/DeleteAccountModal/DeleteAccountModal";
import { useNavigation } from "@react-navigation/native";
import ErrorModal from "../../../components/ErrorModal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/paymentReducer";
import {
  setEmail,
  setName,
  setPhone,
  setSurname,
  setExit,
} from "../../../redux/authReducer";

const PersonalInfoScreen = () => {
  const { i18n, authToken, locale, exit } = useAuth();
  const { user } = useSelector((state) => state.payment);
  const { name, surname, email, phone } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [errorName, setErrorName] = useState(false);
  const [errorSurName, setErrorSurName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorText, setErrorText] = useState("");

  const navigation = useNavigation();
  const validateEmail = () => {
    return !!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };
  const checkInfo = () => {
    console.log("email", !!validateEmail(), name.match(/\d+/g));
    let matchesName = name.match(/\d+/g);
    let matchesSurName = surname.match(/\d+/g);
    name
      ? matchesName !== null
        ? setErrorName(true)
        : setErrorName(false)
      : setErrorName(true);
    surname
      ? matchesSurName !== null
        ? setErrorSurName(true)
        : setErrorSurName(false)
      : setErrorSurName(true);
    setErrorEmail(!!!validateEmail());

    return (
      matchesName === null &&
      matchesSurName === null &&
      surname &&
      name &&
      !!validateEmail()
    );
  };
  const editUser = () => {
    profileUpdate(name, surname, email, user?.birth_date, authToken).then(
      (res) => {
        if (res?.data?.data?.success) {
          setOpenChangeModal(false);
          dispatch(
            setUser({
              ...user,
              name: name,
              phone: phone,
              email: email,
              surname: surname,
            })
          );
          navigation.goBack();
        } else {
          console.log(res);
        }
      }
    );
  };
  const deleteAccount = () => {
    deleteProfile(authToken).then((res) => {
      console.log(res?.data);
      if (res?.data?.success) {
        setErrorModal(false);
        setErrorText("");
        exit();
        dispatch(setExit());
        dispatch(setUser({}));
      } else {
        setOpenDeleteModal(false);
        setErrorModal(true);
        setTimeout(() => {
          setErrorText(res);
        }, 100);
      }
    });
  };
  useEffect(() => {
    setLoading(true);
    getProfileInfo(authToken).then((info) => {
      dispatch(setName(info?.name));
      dispatch(setSurname(info?.surname));
      dispatch(setPhone("+" + info?.phone));
      dispatch(setEmail(info?.email));
      setLoading(false);
    });
  }, []);

  return (
    <KeyboardAwareScrollView style={{ maxHeight: SCREEN_HEIGHT }}>
      <View style={styles.container}>
        {openChangeModal && (
          <ConfirmChangeModal
            onPress={editUser}
            isOpen={openChangeModal}
            setIsOpen={setOpenChangeModal}
          />
        )}
        {openDeleteModal && (
          <DeleteAccountModal
            onPress={deleteAccount}
            isOpen={openDeleteModal}
            setIsOpen={setOpenDeleteModal}
          />
        )}
        {errorText && (
          <ErrorModal
            isOpen={errorModal}
            setIsOpen={setErrorModal}
            errorText={errorText}
          />
        )}
        <BackButton />
        {loading ? (
          <ActivityIndicator
            size={"large"}
            color={"#FE7B01"}
            style={{ flex: 1 }}
          />
        ) : (
          <View>
            <View style={[styles.content]}>
              <Text style={styles.infoTitle}>{i18n.t("editYourInfo")}</Text>
              <View style={styles.personalInfoBlock}>
                <View
                  style={{ ...styles.rowContainer, justifyContent: "center" }}
                >
                  <PersonalInfoInput
                    error={errorName}
                    value={name}
                    label={i18n.t("name")}
                    style={{ ...styles.centerBlock, marginRight: normalize(8) }}
                  >
                    {!errorName ? (
                      <InfoMiniBlock
                        width={normalize(167)}
                        height={normalize(56)}
                      />
                    ) : (
                      <InfoMiniErrorBlock
                        width={normalize(167)}
                        height={normalize(56)}
                      />
                    )}
                    <TextInput
                      style={{
                        ...styles.input,
                        color: errorName ? "#EF4E4E" : "black",
                        paddingRight: errorName ? normalize(42) : normalize(24),
                      }}
                      value={name}
                      onChangeText={(e) => dispatch(setName(e))}
                    />
                    {errorName && <ErrorRedIcon style={styles.errorIcon} />}
                  </PersonalInfoInput>
                  <PersonalInfoInput
                    value={surname}
                    label={i18n.t("surname")}
                    error={errorSurName}
                    style={styles.centerBlock}
                  >
                    {!errorSurName ? (
                      <InfoMiniBlock
                        width={normalize(167)}
                        height={normalize(56)}
                      />
                    ) : (
                      <InfoMiniErrorBlock
                        width={normalize(167)}
                        height={normalize(56)}
                      />
                    )}
                    <TextInput
                      style={{
                        ...styles.input,
                        color: errorSurName ? "#EF4E4E" : "black",
                        paddingRight: errorName ? normalize(42) : normalize(24),
                      }}
                      value={surname}
                      onChangeText={(e) => dispatch(setSurname(e))}
                    />
                    {errorSurName && <ErrorRedIcon style={styles.errorIcon} />}
                  </PersonalInfoInput>
                </View>
                <PersonalInfoInput
                  style={{ ...styles.centerBlock, width: normalize(342) }}
                  value={email}
                  label={i18n.t("email")}
                >
                  {!errorEmail ? (
                    <InfoBlock width={normalize(342)} height={normalize(56)} />
                  ) : (
                    <InfoErrorBlock
                      width={normalize(342)}
                      height={normalize(56)}
                    />
                  )}
                  <TextInput
                    style={{
                      ...styles.input,
                      paddingLeft: normalize(35),
                      color: errorEmail ? "#EF4E4E" : "black",
                    }}
                    value={email}
                    keyboardType="email-address"
                    onChangeText={(e) => dispatch(setEmail(e.replace(" ", "")))}
                    textContentType="emailAddress"
                  />
                  {errorEmail && (
                    <ErrorRedIcon
                      style={{ ...styles.errorIcon, right: normalize(35) }}
                    />
                  )}
                </PersonalInfoInput>

                <PersonalInfoInput
                  style={{ ...styles.centerBlock, width: normalize(342) }}
                  value={phone}
                  label={i18n.t("phone")}
                >
                  {!errorPhone ? (
                    <InfoBlock width={normalize(342)} height={normalize(56)} />
                  ) : (
                    <InfoErrorBlock
                      width={normalize(342)}
                      height={normalize(56)}
                    />
                  )}
                  <TextInput
                    style={{
                      ...styles.input,
                      paddingLeft: normalize(35),
                      color: errorPhone ? "#EF4E4E" : "black",
                    }}
                    value={phone}
                    onChangeText={(e) => dispatch(setPhone(e))}
                    editable={false}
                  />
                  {errorPhone && (
                    <ErrorRedIcon
                      style={{ ...styles.errorIcon, right: normalize(35) }}
                    />
                  )}
                </PersonalInfoInput>
                <Text style={styles.phoneText}>{getText(locale)}</Text>
                {errorName && (
                  <Text style={styles.errorText}>
                    {i18n.t("incorrectName")}
                  </Text>
                )}
                {errorSurName && (
                  <Text style={styles.errorText}>
                    {i18n.t("incorrectSurName")}
                  </Text>
                )}
                {errorEmail && (
                  <Text style={styles.errorText}>{i18n.t("invalidEmail")}</Text>
                )}
              </View>
              {/* <View style={{ height: 90 }} /> */}
              <TouchableOpacity
                style={styles.delete}
                onPress={() => setOpenDeleteModal(true)}
              >
                <Delete width={normalize(24)} height={normalize(24)} />
                <Text style={styles.deleteText}>{i18n.t("deleteAccount")}</Text>
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (checkInfo()) {
                    setOpenChangeModal(true);
                  }
                }}
              >
                <SaveButton width={normalize(342)} height={normalize(56)} />
                <Text style={{ ...styles.buttonText, color: "white" }}>
                  {i18n.t("save")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("ChatScreen")}
              >
                <ContactButton width={normalize(342)} height={normalize(56)} />
                <Text style={styles.buttonText}>{i18n.t("contactUs")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};
const getText = (locale) => {
  return locale === "eng" ? (
    <Text style={styles.phoneText}>
      Your phone number cannot be changed. Contact the{" "}
      <Text style={{ textDecorationLine: "underline" }}>Support Team</Text> to
      link your account to another phone number.
    </Text>
  ) : locale === "ukr" ? (
    <Text style={styles.phoneText}>
      Ваш номер телефону не можна змінити. Зв’яжіться зі{" "}
      <Text style={{ textDecorationLine: "underline" }}>Службою підтримки</Text>
      , щоб зв’язати свій обліковий запис з іншим номером телефону.
    </Text>
  ) : (
    <Text style={styles.phoneText}>
      Vaše telefónne číslo nie je možné zmeniť. Ak chcete priradiť svoj účet k
      inému telefónnemu číslu,
      <Text style={{ textDecorationLine: "underline" }}>
        {" "}
        Kontaktujte podporu.
      </Text>{" "}
    </Text>
  );
};
export default PersonalInfoScreen;
