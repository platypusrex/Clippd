import * as React from 'react';
import { compose } from 'recompose';
import { Text, View } from 'react-native';
import { containerStyles as styles } from '../styles/shared/ContainerStyles';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button } from '../shared/components/Button';
import { Navbar } from '../shared/components/Navbar';

type Props = RouteComponentProps<{}>;

const PostsComponent: React.SFC<Props> = (props) => {
  return (
    <View>
      <Navbar
        body={{title: 'Posts'}}
        rightButton={{icon: {name: 'md-camera', size: 28}, handler: () => console.log('button clicked')}}
      />
      <View style={[styles.centered, styles.paddingLg]}>
        <Text>Welcome to the '/posts' route!</Text>
        <Button
          type="primary"
          full={true}
          buttonText="sign off"
          onPress={() => props.history.push('/login')}
          style={{marginTop: 10}}
        />
      </View>
    </View>
  );
};

export const Posts = compose<Props, {}>(
  withRouter
)(PostsComponent);