import * as React from 'react';
import { compose } from 'recompose';
import { Text, View } from 'react-native';
import { containerStyles as styles } from '../styles/shared/ContainerStyles';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button } from '../shared/components/Button';

type Props = RouteComponentProps<{}>;

const CameraComponent: React.SFC<Props> = (props) => {
  return (
    <View style={[styles.centered, styles.paddingLg]}>
      <Text>Welcome to the '/camera' route!</Text>
      <Button
        type="primary"
        full={true}
        buttonText="sign off"
        onPress={() => props.history.push('/login')}
        style={{marginTop: 10}}
      />
    </View>
  );
};

export const Camera = compose<Props, {}>(
  withRouter
)(CameraComponent);