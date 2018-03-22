import * as React from 'react';
import { compose } from 'recompose';
import { View } from 'react-native';
import { containerStyles as styles } from '../styles/shared/ContainerStyles';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button } from '../shared/components/Button';
import { Navbar } from '../shared/components/Navbar';
import { Fade } from '../shared/components/Fade';
import { H2 } from '../shared/components/H2';
import { Camera } from '../shared/components/Camera';
import { withState, WithStateProps } from '../shared/containers/withState';

interface State {
  decisionVisible: boolean;
  cameraView: boolean;
}
const initialState: State = {
  decisionVisible: true,
  cameraView: false
};

type Props =
  RouteComponentProps<{}> &
  WithStateProps<State>;

const ShareComponent: React.SFC<Props> = (props) => {
  const {state, setState} = props;

  const DecisionView = (
    <Fade visible={state.decisionVisible} style={styles.paddingLg}>
      <Button
        full={true}
        type="primary"
        buttonText="Take a snapshot?"
        onPress={() => {
          setState(ss => ({...ss,  decisionVisible: false}));
          setTimeout(() => {
            setState(ss => ({...ss, cameraView: true}));
          }, 400)
        }}
      />

      <View style={[{height: 60, justifyContent: 'center', alignItems: 'center'}]}>
        <H2>Or</H2>
      </View>

      <Button
        full={true}
        buttonText="Use existing photo?"
        onPress={() => {
          setState(ss => ({...ss,  decisionVisible: false}));
          setTimeout(() => {
            setState(ss => ({...ss, cameraView: true}));
          }, 400)
        }}
      />
    </Fade>
  );

  const CameraView = (
    <Fade visible={state.cameraView} style={{flex: 1}}>
      <Camera/>
    </Fade>
  );

  return (
    <View style={styles.full}>
      <Navbar body={{title: 'Share'}}/>

      {DecisionView}
      {CameraView}
    </View>
  );
};

export const Share = compose<Props, {}>(
  withRouter,
  withState<State>(initialState)
)(ShareComponent);