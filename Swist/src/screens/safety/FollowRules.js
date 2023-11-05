import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import FollowRulesIcon from "../../../assets/safety/followRules.svg";
import {normalize, SCREEN_WIDTH} from "../../responsive/fontSize";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import NextButton from "../../../assets/safety/nextButton.svg";
import {useAuth} from "../../provider/AuthProvider";
import {isSmallPhone} from "../../../utils";

const FollowRules = () => {
  const navigation = useNavigation()
  const {i18n}=useAuth()
  return (
    <View style={styles.container}>
      <FollowRulesIcon width={SCREEN_WIDTH - 100} height={SCREEN_WIDTH - 100}
                       style={{right: normalize(21),marginBottom:normalize(70), marginTop: isSmallPhone ? 180 : 0}}/>
      <View
        style={[styles.descriptionBlock, {marginBottom: -60}]}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={styles.descriptionTitle} adjustsFontSizeToFit numberOfLines={2}>{i18n.t('followRules')}</Text>
          <Text style={styles.descriptionText} adjustsFontSizeToFit >{i18n.t('ensureNotBreachingRules')}</Text>

        </View>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('DoNotDrive')}>
          <NextButton/>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default FollowRules;
