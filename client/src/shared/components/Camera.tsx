import * as React from 'react';
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Camera as ExpoCamera, CameraObject, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { containerStyles } from '../../styles/shared/ContainerStyles';
import { cameraStyles } from '../../styles/shared/CameraStyles';
import { Loading } from './Loading';
import { Input } from './Input';
import { Button } from './Button';
import { compose } from 'recompose';
import { withCreatePost, WithCreatePostProps } from '../../api/post/withCreatePost';
const apolloUploadClient = require('apollo-upload-client');

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
  isPictureLoading: boolean;
  pictureUri?: string;
  caption?: string;
  isSubmitting: boolean;
}
const initialState: State = {
  hasCameraPermission: null,
  type: cameraType.back,
  flashMode: flashMode.off,
  isPictureLoading: false,
  isSubmitting: false
};

type Props = WithCreatePostProps;

class CameraFormComponent extends React.Component<Props, State> {
  camera: any;

  constructor (props: Props) {
    super(props);

    this.handleTakePhoto = this.handleTakePhoto.bind(this);
    this.handleChangeCameraType = this.handleChangeCameraType.bind(this);
    this.handleChangeFlashMode = this.handleChangeFlashMode.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);

    this.state = initialState;
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState(ss => ({...ss, hasCameraPermission: status === 'granted'}));
  }

  handleTakePhoto = async () => {
    if (this.camera) {
      this.setState(ss => ({...ss, isPictureLoading: true}));
      const {uri} = await this.camera.takePictureAsync({quality: 1});
      this.setState(ss => ({...ss, pictureUri: uri, isPictureLoading: false}));
    }
  };

  handleChangeCameraType = () => {
    this.setState(ss => ({...ss, type: ss.type === cameraType.back ? cameraType.front : cameraType.back}))
  };

  handleChangeFlashMode = () => {
    this.setState(ss => ({...ss, flashMode: ss.flashMode === flashMode.off ? flashMode.on : flashMode.off}))
  };

  handleCreatePost = async () => {
    const {pictureUri, caption} = this.state;

    if (this.state.isSubmitting) {
      return;
    }

    if (!pictureUri || !caption) {
      return;
    }

    try {
      this.setState(ss => ({...ss, isSubmitting: true}));

      const picture = new apolloUploadClient.ReactNativeFile({uri: pictureUri, type: 'image/jpg', name: 'image.jpg'});
      await this.props.createPost({caption, picture});

      this.setState(ss => ({
        ...ss,
        caption: undefined,
        photoUri: undefined,
        isSubmitting: false,
        isPictureLoading: false
      }));
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {hasCameraPermission} = this.state;

    if (!hasCameraPermission) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={containerStyles.full}>
        {this.state.isPictureLoading && <Loading />}

        {!this.state.pictureUri &&
        <React.Fragment>
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
        </React.Fragment>}

        {this.state.pictureUri &&
        <KeyboardAvoidingView behavior="padding" style={[containerStyles.full]}>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image source={{uri: this.state.pictureUri}} resizeMode="cover" style={{flex: 1}}/>
          </View>

          <View style={[containerStyles.paddingSm]}>
            <Input
              multiline={true}
              numberOfLines={2}
              placeholder="Add a caption..."
              textArea={true}
              value={this.state.caption}
              onChangeText={caption => this.setState(ss => ({...ss, caption}))}
            />

            <Button
              type="primary"
              full={true}
              buttonText="Share photo"
              onPress={this.handleCreatePost}
            />
          </View>
        </KeyboardAvoidingView>}
      </View>
    );
  }
}

export const CameraForm = compose<Props, any>(
  withCreatePost
)(CameraFormComponent);