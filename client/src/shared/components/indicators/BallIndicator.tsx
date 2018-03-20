import * as React from 'react';
import { View, Animated } from 'react-native';
import { Indicator, IndicatorProps, RenderComponentProps } from './Indicator';
import { ballIndicatorStyles as styles } from '../../../styles/shared/BallIndicatorStyles';

interface BallIndicatorProps {
  color?: string;
  size?: number;
}

interface DefaultProps {
  color: string;
  count: number;
  size: number;
}

type Props = IndicatorProps & BallIndicatorProps;

export class BallIndicator extends React.PureComponent<Props, {}> {
  static defaultProps: DefaultProps = {
    color: 'rgb(0, 0, 0)',
    count: 8,
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
      transform: [{rotate: angle + 'deg'}],
    };

    const inputRange = Array
      .from(new Array(count + 1), (undefined, index) =>
        index / count
      );

    const outputRange = Array
      .from(new Array(count), (undefined, index) =>
        1.2 - 0.5 * index / (count - 1)
      ) as number[];

    for (let j = 0; j < index; j++) {
      const value = outputRange.pop() as number;
      outputRange.unshift(value);
    }

    outputRange.unshift(...outputRange.slice(-1));

    const ballStyle = {
      margin: size / 20,
      backgroundColor,
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      transform: [{
        scale: progress
          .interpolate({inputRange, outputRange}),
      }],
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={ballStyle} />
      </Animated.View>
    );
  }

  render() {
    const {style, size: width, size: height, ...props} = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{width, height}}
          renderComponent={this.renderComponent}
          {...props}
        />
      </View>
    );
  }
}
