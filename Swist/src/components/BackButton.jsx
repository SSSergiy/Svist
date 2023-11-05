import React from 'react';
import {normalize} from "../responsive/fontSize";
import {TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import BackBlack from "../../assets/backBlackPath.svg";
import BackWhite from "../../assets/backPath.svg";
import BackWhiteFill from "../../assets/backFillPath.svg";
import Logo from "../../assets/svistLogo.svg";

const BackButton = ({black = true, withLogo = false, fill = false}) => {
  const navigation = useNavigation()
  return (
    withLogo ?
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        left: 0,
        top: normalize(48),
        width: '100%',
        paddingRight: normalize(24),
        zIndex: 1000
      }}>
        <TouchableOpacity style={{zIndex: 1000}} onPress={() => navigation.goBack()}>
          {fill ? <BackWhiteFill width={normalize(87)} height={normalize(48)}/>:
            black ? <BackBlack width={normalize(87)} height={normalize(48)}/> :

              <BackWhite width={normalize(87)} height={normalize(48)}/>}

        </TouchableOpacity>
        <Logo/>
      </View> :
      <TouchableOpacity style={{position: 'absolute', left: 0, top: normalize(48), zIndex: 1000}}
                        onPress={() => navigation.goBack()}>
        {fill ? <BackWhiteFill width={normalize(87)} height={normalize(48)}/>:
          black ? <BackBlack width={normalize(87)} height={normalize(48)}/> :

            <BackWhite width={normalize(87)} height={normalize(48)}/>}
      </TouchableOpacity>
  );
};

export default BackButton;
