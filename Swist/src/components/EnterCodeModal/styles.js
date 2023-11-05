import {StyleSheet} from "react-native";
import {normalize} from "../../responsive/fontSize";
import {GT} from "../../constants/fonts";

export const styles = StyleSheet.create({
  container:{
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.48)', alignItems: 'center',
    justifyContent: 'flex-end',
    // padding: 15,
    paddingBottom: 0,

  },
  modalBlock: {
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: normalize(24),
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: normalize(24),
    color: '#1F1E1D',
    marginBottom: 16,
    fontFamily: GT
  },
  text: {
    fontSize: normalize(16),
    color: '#1F1E1D',
    fontFamily: GT
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(40),
    alignSelf: 'center',
    width:'100%',
    justifyContent:'center'
  },
  codeInputBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(8)
  },
  input:{
    position: 'absolute', fontSize: normalize(16), textAlign: 'center'
  },
  invalidCodeBlock:{
    borderRadius: 25,
    marginTop: normalize(15),
    paddingTop: normalize(18),
    height: '70%',
    width: '100%'
  },
  invalidCodeText:{
    color: 'white', marginBottom: normalize(18), fontSize: normalize(16), marginLeft: normalize(24)
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom:normalize(100),
    marginTop:normalize(20),
    alignSelf: 'center'
  },
  buttonText:{
    fontSize: normalize(24),
    fontFamily: GT,
    position: 'absolute'
  }
})
