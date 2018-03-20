import * as React from 'react';
import { View, Animated, Easing, EasingFunction } from 'react-native';
import { Indicator, IndicatorProps, RenderComponentProps } from './Indicator';
import { pulseIndicatorStyles as styles} from '../../../styles/shared/PulseIndicatorStyles';

interface PulseIndicatorProps {
  color?: string;
  size?: number;
}

interface DefaultProps {
  animationEasing: EasingFunction;
  color: string;
  size: number;
}

type Props = PulseIndicatorProps & IndicatorProps;

export class PulseIndicator extends React.PureComponent<Props, {}> {
  static defaultProps: DefaultProps = {
    animationEasing: Easing.out(Easing.ease),
    color: 'rgb(0, 0, 0)',
    size: 40,
  };

  constructor(props: Props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({index, count, progress}: RenderComponentProps) {
    const { size, color } = this.props as Props & DefaultProps;

    const pulseStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      backgroundColor: color,
      transform: [{
        scale: progress.interpolate({
          inputRange: [0, 0.67, 1],
          outputRange: index?
            [0.4, 0.6, 0.4]:
            [0.4, 0.6, 1.0],
        }),
      }],
      opacity: progress.interpolate({
        inputRange: [0, 0.67, 1],
        outputRange: index?
          [1.0, 1.0, 1.0]:
          [0.5, 0.5, 0.0],
      }),
    };

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={pulseStyle} />
      </Animated.View>
    );
  }

  render() {
    const {style, size: width, size: height, ...props} = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width, height }}
          renderComponent={this.renderComponent}
          {...props}
          count={2}
        />
      </View>
    );
  }
}
