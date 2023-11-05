import {StyleSheet} from "react-native";
import {normalize} from "../../responsive/fontSize";
import {GT} from "../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.48)', alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  modalBlock: {
    backgroundColor: '#FE7B01',
    borderRadius: 25,
    padding: normalize(24),
    width: '100%'
  },
  title: {
    fontSize: normalize(24),
    color: 'white',
    marginBottom: 16,
    fontFamily: GT
  },
  text: {
    fontSize: normalize(16),
    color: 'white',
    fontFamily: GT
  },
  gpsBlock: {
    backgroundColor: '#FF9837',

    width: normalize(38),
    height: normalize(48),
    alignItems: 'center',
    justifyContent: 'center',

    // transform: [{ skewY: "5deg" }]
  },
  logoBlock:{
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: normalize(25),
    width: normalize(58)
  },
  button:{
    alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: normalize(40)
  },
  buttonText:{
    fontSize: normalize(24),
    color: 'white',
    fontFamily: GT,
    position: 'absolute'
  }
})
