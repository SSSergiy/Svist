import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import UseBikeLineIcon from "../../../assets/tutorial/bikeLines.svg";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import {normalize, SCREEN_WIDTH} from "../../responsive/fontSize";
import NextButton from "../../../assets/safety/nextButton.svg";
import {useAuth} from "../../provider/AuthProvider";

const UseBikeLine = () => {
  const navigation = useNavigation()
  const {i18n}=useAuth()
  return (
    <View style={{...styles.container}}>
      <UseBikeLineIcon width={SCREEN_WIDTH} height={SCREEN_WIDTH + 50} style={{top:normalize(75), marginTop: 65, marginLeft: -60}}/>
      <View
        style={{...styles.descriptionBlock }}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={styles.descriptionTitle}>{i18n.t('useBikeLines')}</Text>
        </View>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('ParkingSpot')}>
          <NextButton/>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default UseBikeLine;
