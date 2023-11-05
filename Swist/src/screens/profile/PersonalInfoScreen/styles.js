import {Dimensions, Platform, StyleSheet} from "react-native";
import {normalize, SCREEN_HEIGHT} from "../../../responsive/fontSize";
import {GT, GT_BOLD} from "../../../constants/fonts";


export const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex: 1,
    // height: Dimensions.get('window').height,
    paddingTop:normalize(48),
    paddingBottom:normalize(48),
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center'
  },
  rowContainer:{
    flexDirection:'row',alignItems:'center'
  },
  centerBlock:{
    justifyContent:'center',
    alignItems:'center',
    marginBottom:normalize(16),
    alignSelf:'center'
  },
  content:{
    padding: normalize(24),
    paddingTop: normalize(96),
    flex: 1,
    minHeight: SCREEN_HEIGHT - 220,

  },
  infoTitle:{
    color:'#1F1E1D',fontSize:normalize(24),fontFamily:GT_BOLD
  },
  personalInfoBlock:{
    marginTop:normalize(40),
    borderBottomWidth:1,
    borderColor:'#DEDEDE',
    paddingBottom:normalize(24),
    marginBottom:normalize(18),
    width:'100%'
  },
  input: {
    position: 'absolute',
    color: 'black',
    width: '95%',
    paddingLeft: normalize(24),
    paddingRight: normalize(24),
    fontSize: normalize(16),
    height: '90%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    zIndex:6
    // backgroundColor:'red'

  },
  phoneText:{
    fontSize:normalize(12),
    fontFamily:GT,
  },
  errorIcon:{
    position: 'absolute', right: normalize(24)
  },
  button:{
    alignItems:'center',
    justifyContent:'center',
    marginBottom:normalize(16)
  },
  buttonText:{
fontSize:normalize(24),
    fontFamily:GT,
    color:'#FE7B01',
    position:'absolute'
  },
  delete:{
    flexDirection:'row',
    alignItems:'center',
    // marginBottom:normalize(80),
  },
  deleteText:{
    color:'#EF4E4E',
    fontSize:normalize(16),
    fontFamily:GT_BOLD,
    marginLeft:normalize(26)
  },
  errorText: {
    alignSelf: 'center',
    color: '#EF4E4E',
    fontSize: normalize(16),
    marginTop: normalize(5),
    fontFamily: GT
  },
})
