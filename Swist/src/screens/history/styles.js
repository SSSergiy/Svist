import {Dimensions, StyleSheet} from "react-native";
import {normalize, SCREEN_WIDTH} from "../../responsive/fontSize";
import {GT, GT_BOLD} from "../../constants/fonts";
import {styles as css} from "../problem/styles";

export const styles = StyleSheet.create({
  noData:{
    alignSelf:'center',
    fontFamily: GT_BOLD,
    fontSize:normalize(24),
    opacity:0.5
  },
    container: {
      backgroundColor: 'white',
      flex: 1,
      height: Dimensions.get('window').height,
      paddingTop: normalize(48)
    },
    content: {
      padding: normalize(24),
      paddingTop: normalize(72),
      flex: 1,
      height: Dimensions.get('window').height,

    },
    title: {
      color: '#1F1E1D', fontSize: normalize(24), fontFamily: GT_BOLD,
      marginBottom:normalize(40)
    },
  historyItemBlock:{
      alignSelf:'center',
      alignItems:'center',
    justifyContent:'center',
    height: normalize(72),
    flexDirection: 'row',
    marginBottom: 16,
    paddingVertical: 16,
    width:normalize(342)
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width:'100%',
    paddingHorizontal: 24,

  },
  historyItem__bg: {
    position: 'absolute',
    width:'100%'

  },
  historyItem__name: {

    color: 'black',
    marginTop: 0,
    fontSize: 16
  },
  historyItem__date: {
    color: 'black',
    fontFamily:GT_BOLD,
    fontSize: normalize(16)
  },
  historyItem__infoRow:{
    alignItems:'center',
    flexDirection:'row',
    marginTop:normalize(4)

  },
  historyItem__infoText:{
    fontFamily:GT,
    color: 'black',
    fontSize: normalize(16)
  },
  historyItem__amount: {
    fontFamily:GT,
    color: 'black',
    marginTop: 0,
    fontSize: normalize(24)
  },
  errorText: {
    fontFamily: GT,
    color: 'white',

  },
  }
)
