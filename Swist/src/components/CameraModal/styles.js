import {Dimensions, StyleSheet} from "react-native";
import {normalize} from "../../responsive/fontSize";
import {GT} from "../../constants/fonts";

export const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,


  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: normalize(300),
    width: '90%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 20
  },

  topOverlay: {
    position:'absolute',
    width: Dimensions.get("window").width,
    justifyContent: "space-between",
    flexDirection: 'row',
    top: normalize(48),
    zIndex:100

  },

  bottomOverlay: {
    position:'absolute',
    width:'100%',
    alignItems:'center',
    bottom:normalize(0),
    maxHeight:normalize(200),
    height:'100%',zIndex:100

  },

  leftAndRightOverlay: {
    height: '100%',
    width: Dimensions.get("window").width,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  scanBar: {
    width: Dimensions.get("window").width * 0.46,
    height: Dimensions.get("window").width * 0.0025,
  },
  howToParkText: {
    color: 'white',
    fontSize: normalize(16),
    fontFamily: GT,
    marginRight: normalize(18)
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    width: '100%',
    paddingRight: normalize(24),
    paddingLeft: normalize(24)
  },
  cameraOut: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(80),
    height: normalize(80),
    alignSelf: 'center'

  },
  cameraIn: {
    backgroundColor: 'white',
    width: normalize(64),
    height: normalize(64),
    borderRadius: 100
  },
  text: {
    marginTop:normalize(60),
    color: 'white',
    fontSize: normalize(16),
    alignSelf: 'center'
  }
});
