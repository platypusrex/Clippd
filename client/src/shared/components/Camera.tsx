import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera as ExpoCamera, CameraObject, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { containerStyles } from '../../styles/shared/ContainerStyles';
import { cameraStyles } from '../../styles/shared/CameraStyles';

const cameraType = {
  front: 'front',
  back: 'back'
};

const flashMode = {
  on: 'on',
  off: 'off'
};

interface State {
  hasCameraPermission: boolean | null;
  type: string;
  flashMode: string;
  photoUri?: string;
}

export class Camera extends React.Component<{}, State> {
  camera: any;

  constructor (props: {}) {
    super(props);

    this.handleTakePhoto = this.handleTakePhoto.bind(this);
    this.handleChangeCameraType = this.handleChangeCameraType.bind(this);
    this.handleChangeFlashMode = this.handleChangeFlashMode.bind(this);

    this.state = {
      hasCameraPermission: null,
      type: cameraType.back,
      flashMode: flashMode.off
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState(ss => ({...ss, hasCameraPermission: status === 'granted'}));
  }

  handleTakePhoto = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({quality: 1});
      console.log(photo);
    }
  };

  handleChangeCameraType = () => {
    this.setState(ss => ({...ss, type: ss.type === cameraType.back ? cameraType.front : cameraType.back}))
  };

  handleChangeFlashMode = () => {
    this.setState(ss => ({...ss, flashMode: ss.flashMode === flashMode.off ? flashMode.on : flashMode.off}))
  };

  render() {
    const {hasCameraPermission} = this.state;

    if (!hasCameraPermission) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={containerStyles.full}>
        <ExpoCamera
          style={containerStyles.full}
          type={this.state.type}
          flashMode={this.state.flashMode}
          ref={(ref: any) => this.camera = ref as CameraObject}
        />

        <View style={cameraStyles.actionBar}>
          <TouchableOpacity style={cameraStyles.rotateBtn} onPress={this.handleChangeCameraType}>
            <Ionicons name="ios-sync" size={32} color="#fff"/>
          </TouchableOpacity>

          <TouchableOpacity style={cameraStyles.centerBtnWrapper} activeOpacity={0.75} onPress={this.handleTakePhoto}>
            <View style={cameraStyles.centerBtnOuter}>
              <View style={cameraStyles.centerBtnInner}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={cameraStyles.flashBtn} onPress={this.handleChangeFlashMode}>
            {this.state.flashMode === flashMode.on && <Ionicons name="ios-flash" size={42} color="#fff"/>}
            {this.state.flashMode === flashMode.off && <Ionicons name="ios-flash-outline" size={42} color="#fff"/>}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}