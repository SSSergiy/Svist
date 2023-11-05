import React from 'react';
import {CommonActions, StackActions,useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import DoNotDriveIntoxicatedIcon from "../../../assets/safety/doNotDriveIntoxicated.svg";
import {normalize, SCREEN_WIDTH} from "../../responsive/fontSize";
import DescriptionBlock from "../../../assets/safety/descriptionBlock.svg";
import NextButton from "../../../assets/safety/nextButton.svg";
import {useAuth} from "../../provider/AuthProvider";
import {isSmallPhone} from "../../../utils";

const DoNotDriveIntoxicated = () => {
  const navigation=useNavigation()
  const {i18n}=useAuth()
  return (
    <View style={styles.container}>
      <DoNotDriveIntoxicatedIcon width={SCREEN_WIDTH} height={SCREEN_WIDTH}
                                 style={{bottom:normalize(-20),alignSelf:'center', marginTop: isSmallPhone ? 180 : 0}}/>
      <View
        style={[styles.descriptionBlock, {marginBottom: -60}]}>
        <DescriptionBlock width={normalize(366)} height={normalize(256)} style={{position: 'absolute'}}/>
        <View>
          <Text style={styles.descriptionTitle}>{i18n.t('dontRideIntoxicated')}</Text>

        </View>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=> {
          navigation.dispatch(StackActions.popToTop())
          navigation.dispatch(CommonActions.goBack())
        }}>
          <NextButton/>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default DoNotDriveIntoxicated;
