import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import {useAuth} from "../../provider/AuthProvider";
import PromoBlockSvg from '../../../assets/outlineButton.svg'
import sized from "../../utils/sized";
import {SCREEN_WIDTH} from "../../responsive/fontSize";

const PromoBlockIcon = sized(PromoBlockSvg, SCREEN_WIDTH - 48, 72)

const PromocodeItem = ({item}) => {
  const {i18n} = useAuth()
  return (
    <>
      
      <TouchableOpacity activeOpacity={1} style={styles.promo}>
        <PromoBlockIcon style={styles.promo__bg} />
        <View>
          <Text style={styles.promo__name}>{item?.name}</Text>
          <Text style={styles.promo__date}>{item?.begin_date}</Text>
        </View>
        <Text style={styles.promo__minutes}>+ {item?.bonus_minutes} {i18n.t('min')}.</Text>
      </TouchableOpacity>
    </>
  );
};


export default PromocodeItem;
