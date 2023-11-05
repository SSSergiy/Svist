import React from 'react';
import {normalize} from "../../responsive/fontSize";
import {Text, View} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {styles} from "./statusHeaderStyle"
import {useAuth} from "../../provider/AuthProvider";

const ConnectionErrorStatus = () => {
  const {i18n}=useAuth()
  return (
    <View style={{...styles.header,backgroundColor: '#EF4E4E'}}>
      <View style={styles.block}>
        <AntDesign name={'wifi'} style={{fontSize: normalize(24), color: 'white'}}/>
        <Text style={styles.text}>{i18n.t('connectionError')}</Text>
      </View>
    </View>
  );
};

export default ConnectionErrorStatus;
