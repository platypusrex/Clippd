import * as React from 'react';
import { compose, withHandlers } from 'recompose';
import { withState, WithStateProps } from '../shared/containers/withState';
import { Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Posts } from './Posts';
import { Profile } from './Profile';
import { Share } from './Share';
import {
  TabViewAnimated,
  NavigationState,
  SceneRendererProps,
  TabBar,
  Route
} from 'react-native-tab-view';
import { Dictionary } from 'async';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const routeKeys = {
  posts: 'posts',
  share: 'share',
  profile: 'profile'
};

interface RouteProps {
  key: string;
  icon: string;
  color: string;
}

type State = NavigationState<Route<RouteProps>> & {
  renderTab: Dictionary<boolean>;
}
const initialState: State = {
  index: 0,
  routes: [
    {key: routeKeys.posts, icon: 'md-images', color: '#F44336'},
    {key: routeKeys.share, icon: 'md-camera', color: '#4CAF50'},
    {key: routeKeys.profile, icon: 'md-person', color: '#3F51B5'},
  ],
  renderTab: {
    [0]: true,
    [1]: false,
    [2]: false
  }
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
  const renderScene = ({route}: any) => {
    switch (route.key) {
      case routeKeys.posts:
        return (
          <React.Fragment>
            {props.state.renderTab[0] && <Posts/>}
          </React.Fragment>
        );
      case routeKeys.share:
        return (
          <React.Fragment>
            {props.state.renderTab[1] && <Share/>}
          </React.Fragment>
        );
      case routeKeys.profile:
        return (
          <React.Fragment>
            {props.state.renderTab[2] && <Profile/>}
          </React.Fragment>
        );
      default:
        return null;
    }
  };

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
    handleIndexChange: (props: Props) => (index: number) => {
      props.setState(ss => ({
        ...ss, index,
        renderTab: {
          ...ss.renderTab,
          [index]: true
        }
      }))
    }
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