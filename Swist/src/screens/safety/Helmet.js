import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import HelmetIcon from "../../../assets/safety/helmet.svg"
import NextButton from "../../../assets/safety/nextButton.svg"
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg"
import {normalize, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../responsive/fontSize";
import {GT} from "../../constants/fonts";
import {styles} from "./styles"
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../../provider/AuthProvider";
import {isSmallPhone} from "../../../utils";
const Helmet = () => {
  const {i18n}=useAuth()
  const navigation=useNavigation()
  return (
    <View style={styles.container}>
      <HelmetIcon width={SCREEN_WIDTH} height={SCREEN_WIDTH} style={{bottom: normalize(-67)}}/>
      <View
        style={[styles.descriptionBlock, {marginBottom: -60}]}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={styles.descriptionTitle}>{i18n.t('helmet')}</Text>
          <Text style={styles.descriptionText} adjustsFontSizeToFit>{i18n.t('wearingHelmet')}</Text>
        </View>
        <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={()=>navigation.navigate('CheckScooter')}>
          <NextButton  />
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default Helmet;
