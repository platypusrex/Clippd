import * as React from 'react';
import { View, Animated } from 'react-native';
import { Indicator, IndicatorProps, RenderComponentProps } from './Indicator';
import { uiActivityIndicatorStyles as styles } from '../../../styles/shared/UIActivityIndicatorStyles';

interface UIActivityIndicatorProps {
  color?: string;
  size?: number;
}

interface DefaultProps {
  color: string;
  count: number;
  size: number;
}

type Props = UIActivityIndicatorProps & IndicatorProps;

export class UIActivityIndicator extends React.PureComponent<Props, {}> {
  static defaultProps: DefaultProps = {
    color: 'rgb(0, 0, 0)',
    count: 12,
    size: 40,
  };

  constructor(props: Props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({index, count, progress}: RenderComponentProps) {
    const { size, color: backgroundColor } = this.props as Props & DefaultProps;
    const angle = index * 360 / count;

    const layerStyle = {
      transform: [{
        rotate: angle + 'deg',
      }],
    };

    const inputRange = Array
      .from(new Array(count + 1), (undefined, index) =>
        index / count
      );

    const outputRange = Array
      .from(new Array(count), (undefined, index) =>
        Math.max(1.0 - index * (1 / (count - 1)), 0)
      );

    for (let j = 0; j < index; j++) {
      const value = outputRange.pop() as number;
      outputRange.unshift(value);
    }

    outputRange.unshift(...outputRange.slice(-1));

    const barStyle = {
      width: size / 10,
      height: size / 4,
      borderRadius: size / 20,
      backgroundColor,
      opacity: progress
        .interpolate({ inputRange, outputRange }),
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={barStyle} />
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
