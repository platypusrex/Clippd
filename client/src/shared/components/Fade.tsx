import * as React from 'react';
import { Animated } from 'react-native';

interface ParentProps {
  visible: boolean;
  style?: {}
  children: React.ReactNode;
}

interface State {
  visible: boolean;
}

export class Fade extends React.Component<ParentProps, State> {
  constructor(props: ParentProps) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  };

  _visibility: any;

  componentWillMount() {
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.visible) {
      this.setState({ visible: true });
    }
    Animated.timing(this._visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 300,
    }).start(() => {
      this.setState({ visible: nextProps.visible });
    });
  }

  render() {
    const { style, children, ...rest } = this.props;

    const containerStyle = {
      width: '100%',
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    const combinedStyle = [containerStyle, style];

    return (
      <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
        {this.state.visible ? children : null}
      </Animated.View>
    );
  }
}