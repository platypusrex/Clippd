import * as React from 'react';
import { compose, withHandlers } from 'recompose';
import { withState, WithStateProps } from '../shared/containers/withState';
import { Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Posts } from './Posts';
import { Profile } from './Profile';
import { Camera } from './Camera';
import {
  TabViewAnimated,
  NavigationState,
  SceneRendererProps,
  TabBar,
  SceneMap,
  Route
} from 'react-native-tab-view';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

interface RouteProps {
  key: string;
  icon: string;
  color: string;
}

type State = NavigationState<Route<RouteProps>>
const initialState: State = {
  index: 0,
  routes: [
    {key: 'posts', icon: 'md-images', color: '#F44336'},
    {key: 'camera', icon: 'md-camera', color: '#4CAF50'},
    {key: 'profile', icon: 'md-person', color: '#3F51B5'},
  ],
};

interface WithHandlers {
  handleIndexChange: (index: number) => any;
}

type Props =
  WithStateProps<State> &
  WithHandlers;

const TabsComponent: React.SFC<Props> = (props) => {
  const {state} = props;

  const renderIcon = ({route}: any) => <Ionicons name={route.icon} size={24} style={styles.icon} />;
  const renderFooter = (srProps: SceneRendererProps) => <TabBar {...srProps} renderIcon={renderIcon}/>;
  const renderScene = SceneMap({posts: Posts, camera: Camera, profile: Profile});

  return (
    <TabViewAnimated
      style={styles.container}
      navigationState={state}
      renderScene={renderScene}
      renderFooter={renderFooter}
      onIndexChange={props.handleIndexChange}
      initialLayout={initialLayout}
    />
  );
};

export const Tabs = compose<Props, State>(
  withState<State>(initialState),
  withHandlers<Props, WithHandlers>({
    handleIndexChange: (props: Props) => (index: number) => props.setState(ss => ({...ss, index}))
  })
)(TabsComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
  }
});