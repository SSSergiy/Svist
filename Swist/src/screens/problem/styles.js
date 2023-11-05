import {StyleSheet} from "react-native";
import {normalize, SCREEN_HEIGHT, SCREEN_WIDTH} from "../../responsive/fontSize";
import {GT, GT_BOLD} from "../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: normalize(48),
    paddingBottom: normalize(80),
    paddingLeft: normalize(24),
    paddingRight: normalize(24),
    height: SCREEN_HEIGHT,
    justifyContent:'space-between',
    backgroundColor: 'white'
  },
  mainBlock: {
    alignItems: 'center',
    marginTop: normalize(48),
    width:'100%',
    flex: 1
  },
  mainBlock__title: {
    fontSize: normalize(24),
    color: 'black',
    marginTop: normalize(48),
    fontWeight: '500',
    fontFamily: GT_BOLD,
    alignSelf: 'flex-start'
  },
  mainBlock__description: {
    fontSize: normalize(16),
    color: 'black',
    fontWeight: '400',
    fontFamily: GT,
    alignSelf: 'flex-start',
    marginTop: 16
  },
  mainBlock__categories: {
    marginTop: 64,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  mainBlock__category: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 72,
    width: (SCREEN_WIDTH - 56) / 2,
    marginBottom: 16
  },
  mainBlock__ml20: {
    marginLeft: 20
  },
  mainBlock__bg: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  mainBlock__label: {
    fontSize: normalize(16),
    color: 'black',
    fontWeight: '400',
    fontFamily: GT,
    marginLeft: 20,
    maxWidth: '55%'
  },
  mainButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(24),
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: normalize(24),
    color: '#FE7B01',
    fontFamily: GT,
    position: 'absolute'
  },
  mainBlock__problems: {
    marginTop: 40
  },
  mainBlock__problem: {
    alignItems: 'center',
    marginTop: normalize(24),
    flexDirection: 'row'
  },
  mainBlock__problemText: {
    fontSize: normalize(16),
    color: '#FE7B01',
    fontFamily: GT,
    position: 'absolute',
    marginLeft: 34
  },
  imagePickBlock: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    width: normalize(130),
    height: normalize(130),
    position: 'absolute',
    bottom: normalize(24),
    left: normalize(20),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: 'center'
  },
  checkBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    paddingBottom: normalize(24),
    marginBottom: normalize(26),
    paddingRight:normalize(24)
  },
  checkItem: {
    backgroundColor: '#FE7B01',
    width: normalize(20),
    height: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: normalize(18)
  },
  mainBlock__imagePicker: {
    marginTop: 32
  },
  mainBlock__textareaWrapper: {
    flexDirection: 'row',
    marginVertical: 24,
    width: '100%'
  },
  mainBlock__textareaBg: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  mainBlock__textarea: {
    fontFamily: GT,
    color: '#FE7B01',
    marginLeft: '20%',
    marginTop: 10,
    height: 160,
    width: '80%',
  },
  mainBlock__ml24: {
    marginLeft: 24
  }
})