import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import StayAlertedIcon from "../../../assets/safety/stayAlerted.svg";
import {normalize, SCREEN_WIDTH} from "../../responsive/fontSize";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import NextButton from "../../../assets/safety/nextButton.svg";
import {useAuth} from "../../provider/AuthProvider";
import {isSmallPhone} from "../../../utils";

const StayAlerted = () => {
  const navigation=useNavigation()
  const {i18n}=useAuth()
  return (
    <View style={styles.container}>
      <StayAlertedIcon width={SCREEN_WIDTH - 20} height={SCREEN_WIDTH - 20}
                       style={{bottom:-3,alignSelf:'center',marginLeft:normalize(30), marginTop: isSmallPhone ? 180 : 0}}/>
      <View
        style={[styles.descriptionBlock, {marginBottom: -60}]}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={styles.descriptionTitle}>{i18n.t('stayAlerted')}</Text>
          <Text style={styles.descriptionText}>{i18n.t('ensureYouCanSeeAndHear')}</Text>
        </View>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=>navigation.navigate('DoNotDriveIntoxicated')}>
          <NextButton/>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default StayAlerted;
