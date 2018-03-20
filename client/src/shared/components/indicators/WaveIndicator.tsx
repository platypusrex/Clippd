import * as React from 'react';
import { View, Animated, Easing, EasingFunction } from 'react-native';
import { Indicator, IndicatorProps, RenderComponentProps } from './Indicator';
import { waveIndicatorStyles as styles } from '../../../styles/shared/WaveIndicatorStyles';

interface WaveIndicatorProps {
  waveFactor?: number;
  waveMode?: string;
  color?: string;
  size?: number
}

interface DefaultProps {
  animationEasing: EasingFunction;
  animationDuration: number;
  waveFactor: number;
  waveMode: string;
  color: string;
  count: number;
  size: number;
}

type Props = IndicatorProps & WaveIndicatorProps;

export  class WaveIndicator extends React.PureComponent<Props, {}> {
  static defaultProps: DefaultProps = {
    animationEasing: Easing.out(Easing.ease),
    animationDuration: 1600,
    waveFactor: 0.54,
    waveMode: 'fill',
    color: 'rgb(0, 0, 0)',
    count: 4,
    size: 40,
  };

  constructor(props: Props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({index, count, progress}: RenderComponentProps) {
    const { size, color, waveFactor, waveMode } = this.props as Props & DefaultProps;
    const fill = 'fill' === waveMode;

    const waveStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      borderWidth: fill? 0 : Math.floor(size / 20),
      [fill? 'backgroundColor' : 'borderColor']: color,
      transform: [{
        scale: progress.interpolate({
          inputRange: [0, 1 - Math.pow(waveFactor, index), 1],
          outputRange: [0, 0, 1],
        }),
      }],
      opacity: progress.interpolate({
        inputRange: [0, 1 - Math.pow(waveFactor, index), 1],
        outputRange: [1, 1, 0],
      }),
    };

    return (
      <Animated.View style={styles.layer} {...{key: index}}>
        <Animated.View style={waveStyle} />
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
        />
      </View>
    );
  }
}
