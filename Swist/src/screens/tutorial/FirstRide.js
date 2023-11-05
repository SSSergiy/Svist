import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import FirstRideIcon from "../../../assets/tutorial/firstRide.svg";
import firstRideIcon from "../../../assets/tutorial/firstRide.png";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import {normalize, SCREEN_WIDTH} from "../../responsive/fontSize";
import NextButton from "../../../assets/safety/nextButton.svg";
import {useAuth} from "../../provider/AuthProvider";

const FirstRide = () => {
  const navigation = useNavigation()
  const {i18n}=useAuth()
  return (
    <View style={{...styles.container}}>
      <FirstRideIcon width={SCREEN_WIDTH} height={SCREEN_WIDTH} style={{marginLeft: -20, marginTop: 115}}/>
      <View
        style={styles.descriptionBlock}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={styles.descriptionTitle}>{i18n.t('yourFirstRide')}</Text>
          <Text style={styles.descriptionText} adjustsFontSizeToFit numberOfLines={3}>{i18n.t('standAndPushScooter')}</Text>

        </View>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('Breaking')}>
          <NextButton/>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default FirstRide;
