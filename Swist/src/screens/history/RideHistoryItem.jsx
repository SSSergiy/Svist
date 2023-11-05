import React from 'react';
import {styles} from "./styles";
import {Text, TouchableOpacity, View} from "react-native";
import HistoryBlockSvg from '../../../assets/history/historyItemBlock.svg'
import sized from "../../utils/sized";
import {normalize, SCREEN_WIDTH} from "../../responsive/fontSize";
import {useAuth} from "../../provider/AuthProvider";
import {Line, Svg} from "react-native-svg";
import {useNavigation} from "@react-navigation/native";
const RideHistoryItem = ({item}) => {
  const PromoBlockIcon = sized(HistoryBlockSvg, SCREEN_WIDTH - 48, 72)
  const {i18n, authToken} = useAuth()
  const navigation=useNavigation()
  const getDuration=(duration)=>{
    if (duration>=60&&duration<3600){
      return `${Math.floor((duration / 60) * 100) / 100} ${i18n.t('min')}`
    }else if (duration>=3600){
      return `${Math.floor((duration / 3600) * 100) / 100} ${i18n.t('hour')}`
    }else return `${duration} ${i18n.t('second')}`
  }
  
  return (
    <>
    <TouchableOpacity style={styles.historyItemBlock} onPress={() => {
      navigation.navigate('HistoryInfo', {item})
    }}>
      <HistoryBlockSvg style={styles.historyItem__bg} width={normalize(342)}/>
      <View style={styles.historyItem}>
      <View  >
        <Text style={styles.historyItem__date}>{item?.date_start_formated?.replace(' ',', ')}</Text>
        <View style={styles.historyItem__infoRow}>
          <Text style={styles.historyItem__infoText}>{item?.distance_formated_2}</Text>
          <Svg width="4" height="19" viewBox="0 0 4 19" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft:normalize(8),
            marginRight:normalize(8)}}>
            <Line x1="3.4932" y1="0.0821995" x2="0.493197" y2="18.0822" stroke="#FFDFC2"/>
          </Svg>
          <Text style={styles.historyItem__infoText}>{item?.duration_formated}</Text>

        </View>

      </View>
      <Text style={styles.historyItem__amount}> {item?.amount} € </Text>
      </View>
    </TouchableOpacity>
    </>
  );
};

export default RideHistoryItem;
