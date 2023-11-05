import {StyleSheet} from "react-native";
import {normalize} from "../../responsive/fontSize";
import {GT, GT_BOLD} from "../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding:normalize(24),
    paddingTop:normalize(52),
    justifyContent:'space-between'

  },

  descriptionTitle: {
    fontSize: normalize(24),
    fontFamily: GT_BOLD,
    color: 'black',
    marginBottom: normalize(16),
    maxWidth:normalize(186),

  },
  descriptionText: {
    fontSize: normalize(16),
    fontFamily: GT,
    color: 'black',
    lineHeight:24,
    marginBottom:normalize(24)
  },
  line: {
    width: '100%',
    height: 1.5,
    borderRadius: 2,
    backgroundColor: '#eceff1',
    alignSelf: 'center',
    marginVertical: 5,
  },
  beginnerModeRow:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:normalize(24),
    width:'100%'
  },
  rowContainer:{
    alignItems:'center',
    flexDirection:'row'
  },
  beginnerModeRow__title:{
    fontSize: normalize(16),
    fontFamily: GT_BOLD,
    color: 'black',
    marginBottom: normalize(8),
  },
  beginnerModeRow__text:{
    fontSize: normalize(16),
    fontFamily: GT,
    color: 'black',
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
})
