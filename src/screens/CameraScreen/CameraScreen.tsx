import { View, Text,StyleSheet, Pressable } from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import {Camera, CameraType, FlashMode, CameraRecordingOptions, CameraPictureOptions, VideoQuality} from "expo-camera"

import colors from '../../theme/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { CameraNavigatorProp } from '../../types/navigation';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Camera.Constants.Type.back               - CameraType.back
// Camera.Constants.Type.front              - CameraType.front
// Camera.Constants.VideoQuality['640:480'] - VideoQuality["480p"] 

const flashModes =[
  FlashMode.off,
  FlashMode.on,
  FlashMode.auto,
  FlashMode.torch,
]
const flashModeToIcon = {
  [FlashMode.off]: 'flash-off',
  [FlashMode.on]: 'flash-on',
  [FlashMode.auto]: 'flash-auto',
  [FlashMode.torch]: 'highlight',
}


const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null >(null)
  const [cameraType, setCameraType] = useState(CameraType.back)
  const [flash, setFlash] = useState(FlashMode.off)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const inset = useSafeAreaInsets()

const camera=useRef<Camera>(null)
const navigation = useNavigation<CameraNavigatorProp>()

useEffect(() => {
  const getPermission=async()=>{
    const cameraPermission= await Camera.requestCameraPermissionsAsync()
    const microphonePermission= await Camera.requestMicrophonePermissionsAsync()
    setHasPermission(cameraPermission.status === 'granted' &&  microphonePermission.status === 'granted');
  }
  getPermission()
}, [])

const flipCamera =()=>{
  setCameraType(currentCameraType=>currentCameraType===CameraType.back?CameraType.front:CameraType.back)
}
const flipFlash =()=>{
  const currentIndex= flashModes.indexOf(flash) //index actual
  const nextIndex = currentIndex === flashModes.length - 1 ? 0: currentIndex+1;
  setFlash(flashModes[nextIndex])
}

const options:CameraPictureOptions={
  quality: 0.5, //0- max compress and 1- max quality
  base64:false,
  skipProcessing: true, //para que no de problemas Android

}
const takePicture =async ()=>{
  if (!isCameraReady || !camera.current || isRecording) return;
  const result= await camera.current?.takePictureAsync(options)
  navigation.navigate("Create",{image:result.uri,})

  console.log()
}
const startRecording= async ()=>{
if (!isCameraReady || !camera.current || isRecording) { return}
const options: CameraRecordingOptions={
  quality: VideoQuality["480p"],
  maxDuration:60, //seconds
  maxFileSize: 10 * 1024 * 1024, //bytes
  mute:false,
}
  setIsRecording(true)
  try {
  const result= await camera.current.recordAsync(options)
  navigation.navigate('Create',{video:result.uri})
  }catch(e){
    console.log(e)
  }
  setIsRecording(false) //quizas se detenga al grabar mas de 60s o 1 Gb automáticamente
}
const stopRecording=()=>{
  if (isRecording) {camera.current?.stopRecording()
  setIsRecording(false)}

}


const openImageGallery=()=>{
  launchImageLibrary({mediaType:'mixed',selectionLimit:5},({didCancel,errorCode,assets})=>{
      if (!didCancel && !errorCode && assets && assets.length>0){
        if (assets.length===1){
          if (assets[0].type?.startsWith('video')){
            navigation.navigate("Create",{
              video:assets[0].uri
            })
            } else {
            navigation.navigate("Create",{
            image:assets[0].uri,
          })}}else if (assets.length>1){
            navigation.navigate("Create",{
              images:assets.map(asset=>asset.uri as string),
            })
            } 
        }
  });
}


if (hasPermission===null){<Text>Loading....</Text>}
if (hasPermission===false){<Text>No access to the camera</Text>}

console.warn(flash)
  return (
    <View  style={styles.page}>
      <Camera style={styles.camera} type={cameraType} ratio="4:3" flashMode={flash}
      onCameraReady={()=>setIsCameraReady(true)} ref={camera}/>
      <View style={[styles.buttonsContainer,{top:inset.top + 25}]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <Pressable onPress={flipFlash}>
          <MaterialIcons name={flashModeToIcon[flash]} size={30} color={colors.white} />
        </Pressable>
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>
      <View style={[styles.buttonsContainer,{bottom:25}]}>
        <Pressable onPress={openImageGallery}>
          <MaterialIcons name="photo-library" size={30} color={colors.white} />
        </Pressable>
        { isCameraReady && (
          <Pressable onPress={takePicture} onLongPress={startRecording} onPressOut={stopRecording}>
            <View style={[styles.circle,{backgroundColor:isRecording?colors.accent:colors.white}]}></View>
          </Pressable>)}
        <Pressable onPress={flipCamera}>
          <MaterialIcons name="flip-camera-ios" size={30} color={colors.white} />
        </Pressable>


      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  page:{
    flex:1,
    justifyContent:'center',
    backgroundColor:colors.black,

  },
  camera:{
    width:'100%',
    aspectRatio:3/4,
  },
  buttonsContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:'100%',
    position:'absolute',
  },
  circle:{
    width:75,
    aspectRatio:1,
    borderRadius:75,
    backgroundColor:colors.white,
  }

})

export default CameraScreen