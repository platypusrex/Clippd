import * as React from 'react';
import { View, Animated } from 'react-native';
import { Indicator, IndicatorProps, RenderComponentProps } from './Indicator';
import { barIndicatorStyles as styles } from '../../../styles/shared/BarIndicatorStyles';

interface BarIndicatorProps {
  color?: string;
  size?: number;
}

interface DefaultProps {
  animationDuration: number;
  count: number;
  color: string;
  size: number;
}

type Props = BarIndicatorProps & IndicatorProps;

export class BarIndicator extends React.PureComponent<Props, {}> {
  static defaultProps: DefaultProps = {
    animationDuration: 1200,
    count: 3,
    color: 'rgb(0, 0, 0)',
    size: 40,
  };

  constructor(props: Props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  outputRange(base: number, index: number, count: number, samples: number) {
    const range = Array.from(new Array(samples), (undefined, index) => {
      return base * Math.abs(Math.cos(Math.PI * index / (samples - 1)));
    });

    for (let j = 0; j < index * (samples / count); j++) {
      let value = range.pop() as number;
      range.unshift(value);
    }

    range.unshift(...range.slice(-1));

    return range;
  }

  renderComponent({index, count, progress}: RenderComponentProps) {
    const {color: backgroundColor, size, animationDuration} = this.props as Props & DefaultProps;

    const frames = 60 * animationDuration / 1000;
    let samples = 0;

    do
      samples += count;
    while (samples < frames);

    const inputRange = Array
      .from(new Array(samples + 1), (undefined, index) => index / samples);

    const
      width  = Math.floor(size / 5),
      height = Math.floor(size / 2),
      radius = Math.ceil(width / 2);

    const containerStyle = {
      height: size,
      width: width,
      marginHorizontal: radius,
    };

    const topStyle = {
      width,
      height,
      backgroundColor,
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      transform: [{
        translateY: progress.interpolate({
          inputRange,
          outputRange: this.outputRange(+(height - radius) / 2, index, count, samples),
        }),
      }],
    };

    const bottomStyle = {
      width,
      height,
      backgroundColor,
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
      transform: [{
        translateY: progress.interpolate({
          inputRange,
          outputRange: this.outputRange(-(height - radius) / 2, index, count, samples),
        }),
      }],
    };

    return (
      <View style={containerStyle} {...{key: index}}>
        <Animated.View style={topStyle} />
        <Animated.View style={bottomStyle} />
      </View>
    );
  }

  render() {
    const {style, ...props} = this.props;

    return (
      <Indicator
        style={[styles.container, style]}
        renderComponent={this.renderComponent}
        {...props}
      />
    );
  }
}
