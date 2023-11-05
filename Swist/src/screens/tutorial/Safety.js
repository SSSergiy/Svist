import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import SafetyIcon from "../../../assets/tutorial/safety.svg";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import {normalize, SCREEN_WIDTH} from "../../responsive/fontSize";
import NextButton from "../../../assets/safety/nextButton.svg";
import {useAuth} from "../../provider/AuthProvider";
import {isSmallPhone} from "../../../utils";

const Safety = () => {
  const navigation = useNavigation()
  const {i18n}=useAuth()
  return (
    <View style={{...styles.container,justifyContent:'flex-start'}}>
      <SafetyIcon width={SCREEN_WIDTH} height={SCREEN_WIDTH + 40} style={{marginTop: isSmallPhone ? -90 : 0}} />
      <View
        style={{...styles.descriptionBlock,marginTop:65}}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={styles.descriptionTitle}>{i18n.t('safety')}</Text>
          <Text style={styles.descriptionText}>{i18n.t('toFindSafety')}</Text>
        </View>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('GreatJob')}>
          <NextButton/>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default Safety;
