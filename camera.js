import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';
import { Camera } from 'expo-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
function getTime() {
  const t =
    (new Date().getFullYear() - 2000) +
    '' +
    (new Date().getMonth() + 1) +
    '' +
    new Date().getDate() +
    '' +
    new Date().getHours() +
    '' +
    new Date().getMinutes() +
    '' +
    new Date().getSeconds() +
    '.jpg';
  return t;
}

export default function CameraScr() {
  const [hasPermission, setHasPermission] = useState(null);
  const [fbtype, setfb] = useState(Camera.Constants.Type.back);
  const [ftype, setf] = useState(Camera.Constants.FlashMode.off);
  const [cameraRef, setCameraRef] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ratio={'1:1'}
        type={fbtype}
        flashMode={ftype}
        ref={(ref) => {
          setCameraRef(ref);
        }}
        autoFocus={Camera.Constants.AutoFocus.on}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setfb(
                fbtype === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons
              name={
                fbtype === Camera.Constants.Type.back
                  ? 'camera-reverse-outline'
                  : 'camera-reverse-sharp'
              }
              size={30}
              color={'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: 'grey',
                height: 50,
                justifyContent: 'center',
                borderRadius: 100,
                borderColor: 'white',
                borderWidth: 5,
              },
            ]}
            onPress={async () => {
              if (cameraRef) {
                let photo = await cameraRef.takePictureAsync({
                  quality: 0.94,
                  base64: false,
                });
                const img = await fetch(photo.uri);
                const file = await img.blob();
                firebase
                  .storage()
                  .ref(getTime())
                  .put(file)
                  .then(() => {
                    console.log('Success!');
                  });
              }
            }}>
            <Ionicons name={'camera'} size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setf(
                ftype === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.torch
                  : Camera.Constants.FlashMode.off
              );
            }}>
            <Ionicons
              name={
                ftype === Camera.Constants.FlashMode.off
                  ? 'flash-off'
                  : 'flash-outline'
              }
              size={30}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
  camera: {
    width: Dimensions.get('window').height,
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height - 150,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 15,
    height: 70,
  },
  button: {
    flex: 0.1,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
