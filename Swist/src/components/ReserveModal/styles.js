import {StyleSheet} from "react-native";
import {normalize} from "../../responsive/fontSize";
import {GT} from "../../constants/fonts";

export const styles = StyleSheet.create({
  parallelogram: {
    height: 56,
    flexDirection: "row",

  },
  parallelogramInner: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "#FE7B01",
    width: 230,
    height: 100,
  },
  parallelogramRight: {
    top: 0,
    right: -50,
    position: "absolute",
  },
  parallelogramLeft: {
    top: 0,
    left: -50,
    position: "absolute",
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  screenButton: {
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 48,
  },
  scanButton: {
    alignItems: "center",
    paddingLeft: normalize(36),
    width:'100%',
    justifyContent:'space-between',
    flexDirection: "row",
    paddingRight:normalize(70),
    position: 'absolute'

  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  infoContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#EDEDF1",
    paddingBottom: normalize(14)
  },
  reserveBlock: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: normalize(25),
    width: "100%",
    marginTop: normalize(15),

  },
  reserveTitle: {
    fontFamily: GT,
    fontSize: normalize(24),
    fontWeight: "500",
  },
  cardDot: {
    width: 4, height: 4, backgroundColor: "#1F1E1D", borderRadius: 10, marginRight: normalize(5)
  },

  reserveButton: {
    borderColor: 'rgba(254, 123, 1, 0.24)',
    borderWidth: 1,
    padding: 16,
    width: '100%',
    marginTop: normalize(35),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reserveButtonText: {
    color: '#FE7B01',

    fontFamily: GT,
    fontWeight: '500',
    fontSize: normalize(24)
  },
  addCardButton:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    marginTop: normalize(35)
},
  addCardText:{
    color:'#FE7B01',fontSize:normalize(16)
  },
  cardTypeImg:{
    width: normalize(26), height: normalize(17), marginRight: normalize(20)
  },
  walletImg:{
    width: normalize(24), height: normalize(24), marginLeft: normalize(15)
  },
  scooterImg:{
    width: normalize(48), height: normalize(48)
  }
});
