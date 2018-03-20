import * as React from 'react';
import { Animated } from 'react-native';
import { compose, lifecycle, withProps } from 'recompose';
import { withState, WithStateProps } from '../containers/withState';

interface State {
  visible?: boolean
}

interface ParentProps {
  children: React.ReactNode;
  visible: boolean;
  style?: {}
}

interface WithProps {
  visibility: any;
}

type Props =
  ParentProps &
  WithStateProps<State> &
  WithProps;

const FadeViewComponent: React.SFC<Props> = (props) => {
  const {children, visibility, style, state} = props;
  const containerStyle = {
    width: '100%',
    opacity: visibility.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        scale: visibility.interpolate({
          inputRange: [0, 1],
          outputRange: [1.1, 1],
        }),
      },
    ],
  };
  const combinedStyle = [containerStyle, style];

  return (
    <Animated.View style={[state.visible ? combinedStyle : containerStyle]}>
      {props.state.visible ? children : null}
    </Animated.View>
  )
};

export const FadeView = compose<Props, State>(
  withProps((props: Props) => ({
    visibility: new Animated.Value(props.visible ? 1 : 0)
  })),
  withState<State>({}),
  lifecycle<Props, State>({
    componentWillMount: function () {
      const {setState, visible} = this.props;
      setState(ss => ({...ss, visible}))
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.visible) {
        this.setState({ visible: true });
      }
      Animated.timing(this.props.visibility, {
        toValue: nextProps.visible ? 1 : 0,
        duration: 500,
      }).start(() => {
        this.setState({ visible: nextProps.visible });
      });
    }
  })
)(FadeViewComponent);