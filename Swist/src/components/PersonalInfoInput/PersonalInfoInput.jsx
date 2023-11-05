import React, { useEffect, useState } from "react";
import { styles } from "../../screens/profile/PersonalInfoScreen/styles";
import { normalize } from "../../responsive/fontSize";
import { Animated, Pressable, TextInput } from "react-native";
import InfoMiniBlock from "../../../assets/personalInfo/infoMiniBlock.svg";
import InfoMiniErrorBlock from "../../../assets/personalInfo/infoMiniErrorBlock.svg";
import ErrorRedIcon from "../../../assets/personalInfo/errorRedIcon.svg";
import { useAuth } from "../../provider/AuthProvider";

const PersonalInfoInput = ({ error, value, children, style, label }) => {
  const { i18n } = useAuth();
  const [top, setTop] = useState(new Animated.Value(normalize(17)));
  const [left, setLeft] = useState(new Animated.Value(normalize(24)));
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  // useEffect(() => {
  //   setTop(new Animated.Value(normalize(17)))
  //   setLeft(new Animated.Value(normalize(24)))
  //   setOpacity(new Animated.Value(0))
  // }, [])
  useEffect(() => {
    if (!value) {
      Animated.timing(top, {
        toValue: normalize(-10),
        // easing: Easing.back(),
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(left, {
        toValue: normalize(24),
        // easing: Easing.back(),
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, {
        toValue: 1,
        // easing: Easing.back(),
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(top, {
        toValue: normalize(17),
        // easing: Easing.back(),
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(left, {
        toValue: normalize(24),
        // easing: Easing.back(),
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, {
        toValue: 0,
        // easing: Easing.back(),
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  }, [value]);
  return (
    <Pressable style={{ ...style }}>
      <Animated.Text
        style={{
          position: "absolute",
          top: top,
          left: left,
          backgroundColor: "white",
          zIndex: 5,
          opacity: opacity,
          color: error ? "#EF4E4E" : "black",
        }}
      >
        {label}
      </Animated.Text>
      {/*{!name&&<Text style={{position:'absolute',top:normalize(-10),left:normalize(24),backgroundColor:'white',zIndex:5}}>{i18n.t('name')}</Text>}*/}
      {children}
    </Pressable>
  );
};

export default PersonalInfoInput;
