import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import ParkingIcon from "../../../assets/tutorial/parking.svg";
import {normalize, SCREEN_WIDTH} from "../../responsive/fontSize";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import NextButton from "../../../assets/safety/nextButton.svg";
import {useAuth} from "../../provider/AuthProvider";
import {isSmallPhone} from "../../../utils";

const Parking = () => {
  const navigation = useNavigation()
  const {i18n}=useAuth()
  return (
    <View style={{...styles.container,justifyContent:'flex-start'}}>
      <ParkingIcon width={SCREEN_WIDTH} height={SCREEN_WIDTH + 100} style={{marginTop: isSmallPhone ? -90 : 0}}/>
      <View
        style={{...styles.descriptionBlock, marginTop: 5}}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={styles.descriptionTitle}>{i18n.t('parking')}</Text>
          <Text style={styles.descriptionText}>{i18n.t('useKickToPark')}</Text>
        </View>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('TakePhoto')}>
          <NextButton/>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default Parking;
