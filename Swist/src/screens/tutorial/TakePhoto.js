import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import TakePhotoIcon from "../../../assets/tutorial/takePhotot.svg";
import {normalize, SCREEN_WIDTH} from "../../responsive/fontSize";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import NextButton from "../../../assets/safety/nextButton.svg";
import {useAuth} from "../../provider/AuthProvider";

const TakePhoto = () => {
  const navigation = useNavigation()
  const {i18n}=useAuth()
  return (
    <View style={{...styles.container }}>
      <TakePhotoIcon width={SCREEN_WIDTH + 50} height={SCREEN_WIDTH + 60} style={{marginTop: 95, bottom: 30, right: 10}}  />
      <View
        style={{...styles.descriptionBlock, marginTop: -40}}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={styles.descriptionTitle}>{i18n.t('takeParkedScooterPicture')}</Text>

        </View>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('Safety')}>
          <NextButton/>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default TakePhoto;
