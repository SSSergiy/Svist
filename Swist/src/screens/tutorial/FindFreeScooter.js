import React, {useEffect} from 'react';
import {styles} from "./styles";
import FindScooter from "../../../assets/tutorial/findScooter.svg";
import {normalize, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../responsive/fontSize";
import {Image, Text, TouchableOpacity, View} from "react-native";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import NextButton from "../../../assets/safety/nextButton.svg";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../../provider/AuthProvider";
import {isSmallPhone} from "../../../utils";

const FindFreeScooter = () => {
  const navigation = useNavigation()
  const {i18n}=useAuth()
  
  return (
    <View style={{...styles.container,justifyContent:'space-between'}}>
      {/*<FindScooter width={'100%'}   />*/}
      <Image source={require('../../../assets/tutorial/findScooter.png')}
             style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH + 100, resizeMode: 'contain', marginTop: isSmallPhone ? -90 : 0}} />
      <View
        style={styles.descriptionBlock}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={styles.descriptionTitle}>{i18n.t('findFreeScooter')}</Text>
          <Text style={styles.descriptionText} adjustsFontSizeToFit>{i18n.t('locateCloseScooter')}</Text>
        </View>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('StartTheRide')}>
          <NextButton/>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default FindFreeScooter;
