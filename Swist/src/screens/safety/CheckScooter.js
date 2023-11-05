import React from 'react';
import {styles} from "./styles";
import CheckScooterIcon from "../../../assets/safety/checkScooter.svg";
import {normalize, SCREEN_WIDTH} from "../../responsive/fontSize";
import {Text, TouchableOpacity, View} from "react-native";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import NextButton from "../../../assets/safety/nextButton.svg";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../../provider/AuthProvider";
import {isSmallPhone} from "../../../utils";

const CheckScooter = () => {
  const navigation=useNavigation()
  const {i18n}=useAuth()
  return (
    <View style={styles.container}>
      <CheckScooterIcon width={SCREEN_WIDTH} height={SCREEN_WIDTH} style={{marginTop: isSmallPhone ? 180 : 0, bottom: -2}}/>
      <View
        style={[styles.descriptionBlock, {marginBottom: -60}]}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={[styles.descriptionTitle, {maxWidth: '80%'}]}>{i18n.t('checkScooter')}</Text>
          <Text style={styles.descriptionText}>{i18n.t('ensureScooterSuitableCondition')}</Text>

        </View>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=>navigation.navigate('FollowRules')}>
          <NextButton/>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default CheckScooter;
