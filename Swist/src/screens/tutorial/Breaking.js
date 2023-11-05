import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import BreakingIcon from "../../../assets/tutorial/breaking.svg";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import {normalize, SCREEN_WIDTH} from "../../responsive/fontSize";
import NextButton from "../../../assets/safety/nextButton.svg";
import {useAuth} from "../../provider/AuthProvider";

const Breaking = () => {
  const navigation = useNavigation()
  const {i18n}=useAuth()
  return (
    <View style={{...styles.container}}>
      <BreakingIcon width={'100%'} height={SCREEN_WIDTH - 100} style={{marginTop: 220}}/>
      <View
        style={[styles.descriptionBlock, {marginTop: -5}]}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={styles.descriptionTitle}>{i18n.t('breaking')}</Text>
          <Text style={styles.descriptionText} adjustsFontSizeToFit>{i18n.t('eachBreakControls')}</Text>

        </View>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('UseBikeLine')}>
          <NextButton/>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default Breaking;
