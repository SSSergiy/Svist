import {StyleSheet} from "react-native";
import {normalize} from "../../responsive/fontSize";
import {GT, GT_BOLD} from "../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent:'center',
    paddingBottom:normalize(130),
  },
  descriptionBlock: {
    width: normalize(366),
    height: normalize(256),
    paddingTop: normalize(24),
    paddingRight: normalize(24),
    paddingLeft: normalize(56),
    justifyContent: 'space-between',
    paddingBottom: normalize(40),
    marginRight: -50
  },
  descriptionTitle: {
    fontSize: normalize(24),
    fontFamily: GT_BOLD,
    color: 'black',
    marginBottom: normalize(16),
    maxWidth: '100%',
    // backgroundColor: 'red'
  },
  descriptionText: {
    fontSize: normalize(16),
    fontFamily: GT,
    color: 'black',

    lineHeight:24
  }
})
