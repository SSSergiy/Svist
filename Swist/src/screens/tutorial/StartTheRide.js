import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import StartRide from "../../../assets/tutorial/startRide.svg";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import {normalize, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../responsive/fontSize";
import NextButton from "../../../assets/safety/nextButton.svg";
import {useAuth} from "../../provider/AuthProvider";

const StartTheRide = () => {
  const navigation = useNavigation()
  const {i18n}=useAuth()
  return (
    <View style={{...styles.container}}>
      <StartRide width={SCREEN_WIDTH} height={SCREEN_WIDTH} style={{marginTop: 118}}/>
      <View
        style={[styles.descriptionBlock, {marginTop: -3}]}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={styles.descriptionTitle}>{i18n.t('startTheRide')}</Text>
          <Text style={styles.descriptionText} adjustsFontSizeToFit>{i18n.t('findScooterByDigits')}</Text>

        </View>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('FirstRide')}>
          <NextButton/>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default StartTheRide;
