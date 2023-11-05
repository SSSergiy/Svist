import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import DoNotDriveIcon from "../../../assets/safety/doNotDrive.svg";
import {normalize, SCREEN_WIDTH} from "../../responsive/fontSize";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import NextButton from "../../../assets/safety/nextButton.svg";
import {useAuth} from "../../provider/AuthProvider";
import {isSmallPhone} from "../../../utils";

const DoNotDriveInBadWeather = () => {
  const navigation=useNavigation()
  const {i18n}=useAuth()
  return (
    <View style={styles.container}>
      <DoNotDriveIcon width={SCREEN_WIDTH} height={SCREEN_WIDTH}
                      style={{marginTop: isSmallPhone ? 180 : 0}}
      />
      <View
        style={[styles.descriptionBlock, {marginBottom: -60}]}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={styles.descriptionTitle}>{i18n.t('dontDriveInBadWeather')}</Text>
        </View>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=>navigation.navigate('StayAlerted')}>
          <NextButton/>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default DoNotDriveInBadWeather;
