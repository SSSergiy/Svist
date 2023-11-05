import {StyleSheet} from "react-native";
import {normalize} from "../../responsive/fontSize";
import {GT} from "../../constants/fonts";

export const styles = StyleSheet.create({
  modalBlock:{
    backgroundColor:'#EF4E4E',

    padding:normalize(24),
    paddingBottom:0,
    paddingTop:normalize(140),
    alignSelf:'flex-start',
    flexDirection:'row',
    alignItems:'center',

    width:'100%'

  },
  absoluteBlock:{
    alignItems:'center',justifyContent:'center',position:'absolute',zIndex:100,top:normalize(48),right:normalize(24)
  },
  title:{
    fontSize:normalize(16),
    color:'white',
    // marginBottom:normalize(16),
    position:'absolute',
    fontFamily:GT,
    textAlign:'left',
    alignSelf:'flex-start',
    marginLeft:normalize(28)
  },
  text:{
    color:'white',
    fontFamily:GT,
    width:normalize(165)
  },
  gpsBlock:{
    backgroundColor:'#FF9837',

    width:38,
    height:48,
    alignItems:'center',
    justifyContent:'flex-end',

    // transform: [{ skewY: "5deg" }]
  }
})
