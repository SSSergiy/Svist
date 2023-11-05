import React, {useEffect, useRef} from 'react';
import DateBlock from "../../../assets/dateBlock.svg";
import {Text, View} from "react-native";
import {normalize} from "../../responsive/fontSize";
import ScrollPicker from "react-native-wheel-scrollview-picker";

const WheelPicker = ({errorAge,selectMonth,dataSource,setSelectDay,selectDay,setSelectIndex,selectIndex}) => {4


  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <DateBlock style={{position: 'absolute'}}/>
      <View style={{height: normalize(240), width: normalize(103)}}>
        <ScrollPicker
          dataSource={dataSource}
          selectedIndex={3}
          renderItem={(data, index, isSelected) => {
            return (
              data>0&&<Text style={{
                fontWeight: isSelected ? '700' : '300',
                fontSize: normalize(16),
                color: isSelected ? errorAge ? '#EF4E4E' : '#FE7B01' : errorAge ? '#FD9F9F' : '#F9B26F'
              }}>{data}</Text>
            )
          }}
          onValueChange={(data, selectedIndex) => {
            setSelectIndex(selectedIndex)
            setSelectDay(data)
          }}
          wrapperHeight={normalize(235)}
          wrapperWidth='100%'
          wrapperColor='transparent'
          itemHeight={50}
          highlightColor={'transparent'}
          highlightBorderWidth={2}
          activeItemColor={'#222121'}
          itemColor={'#B4B4B4'}
        />
      </View>
    </View>
  );
};

export default WheelPicker;
