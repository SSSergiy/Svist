import React, {useEffect, useState} from 'react';
import {Dimensions, ImageBackground, Modal, Text, TouchableOpacity, View} from "react-native";
import {useCamera} from "react-native-camera-hooks";
import {normalize} from "../../responsive/fontSize";
import BackPath from "../../../assets/backPath.svg";
import { Feather } from '@expo/vector-icons';
import HowToPark from "../../../assets/howToPark.svg";
import HowToParkInfo from "../../../assets/howToParkInfo.svg";
import InfoIcon from "../../../assets/infoIcon.svg";
import UnScannedLamp from "../../../assets/unScannedLamp.svg";
import {styles} from "./styles";
import Index from "../HowToParkModal";
import scannerBg from "../../../assets/scannerBg.png";
import ScannedLamp from "../../../assets/scannedLamp.svg";
import {Camera} from "expo-camera";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../../provider/AuthProvider";
import {useDispatch} from "react-redux";
import {setPicture} from "../../redux/rideReducer";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const scanBarWidth = SCREEN_WIDTH * 0.46;
const scanBarHeight = SCREEN_WIDTH * 0.0025;

const CameraModal = ({
                       isOpen, setIsOpen,isDamage=false,showFirstModal,setOpenFirst
}) => {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [openHowToPark, setOpenHowToPark] = useState(false)
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)
  const navigation=useNavigation()
  const {i18n}=useAuth()
  const dispatch = useDispatch()

  const captureHandle = async () => {
    try {
      const data = await cameraRef.current.takePictureAsync({quality: 0.5, base64: true});
      dispatch(setPicture(data))
      setIsOpen(false)
    } catch (error) {
      console.log(error);
    }
  }

  const __handleFlashMode = () => {
    if (flashMode === Camera.Constants.FlashMode.torch) {
      setFlashMode(Camera.Constants.FlashMode.off)
    } else if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.torch)
    }
  }

  useEffect(()=>{

    if (isOpen&&!isDamage&&!showFirstModal){
      setOpenHowToPark(true)
      setOpenFirst(true)
    }
  },[isOpen])
  return (

    <Modal
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(!isOpen);
      }}>
      {openHowToPark && <Index isOpen={openHowToPark} setIsOpen={setOpenHowToPark}/>}
      <Camera
        flashMode={flashMode}
        ref={cameraRef}
        type={Camera.Constants.Type.back}
        style={styles.preview}>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.topOverlay}>
            <TouchableOpacity onPress={() => {
              setIsOpen(false)
            }}  >
              <BackPath width={normalize(87)} height={normalize(48)} />
            </TouchableOpacity>
            {!isDamage&&<TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', }} onPress={() => setOpenHowToPark(true)}>
              {isDamage?<HowToParkInfo width={normalize(72)} height={normalize(48)}/>:
                <HowToPark width={normalize(185)}  />
              }
              <View style={{position: 'absolute', flexDirection: 'row', alignItems: 'center'}}>
                {!isDamage&&<Text style={styles.howToParkText} numberOfLines={1} adjustsFontSizeToFit={true}>{i18n.t('howPark')}</Text>}
                <InfoIcon width={normalize(24)} height={normalize(24)}/>
              </View>
            </TouchableOpacity>}
          </View>
          <ImageBackground source={scannerBg} style={{width: '100%', height: '100%', position: 'absolute'}}
                           resizeMode="cover"/>
          <View style={styles.bottomOverlay}>
            <View style={styles.cameraButton}>
              <View width={normalize(72)} height={normalize(56)}/>
              <TouchableOpacity style={styles.cameraOut} onPress={() => {
                captureHandle()
              }}>
                <View style={styles.cameraIn}/>
              </TouchableOpacity>
              {flashMode === Camera.Constants.FlashMode.torch ? <ScannedLamp onPress={__handleFlashMode}/> : <UnScannedLamp onPress={__handleFlashMode}/>}
            </View>
            <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit={true}>{i18n.t('watchOutParking')}</Text>
          </View>
        </View>
      </Camera>
    </Modal>
  );
};
export default CameraModal;
