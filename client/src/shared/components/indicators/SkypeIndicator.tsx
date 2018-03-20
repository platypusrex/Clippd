import * as React from 'react';
import { View, Animated, Easing } from 'react-native';
import { Indicator, IndicatorProps, RenderComponentProps } from './Indicator';
import { skypeIndicatorStyles as styles } from '../../../styles/shared/SkypeIndicatorStyles';

interface SkypeIndicatorProps {
  color?: string;
  size?: number;
  minScale?: number;
  maxScale?: number;
}

interface DefaultProps {
  animationDuration: number;
  color: string;
  count: number;
  size: number;
  minScale: number;
  maxScale: number;
}

type Props = SkypeIndicatorProps & IndicatorProps;

export class SkypeIndicator extends React.PureComponent<Props, {}> {
  public static defaultProps: DefaultProps = {
    animationDuration: 1600,
    color: 'rgb(0, 0, 0)',
    count: 5,
    size: 40,
    minScale: 0.2,
    maxScale: 1.0,
  };

  constructor(props: Props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({index, count, progress}: RenderComponentProps) {
    const {
      size,
      minScale,
      maxScale,
      color: backgroundColor,
      animationDuration
    } = this.props as Props & DefaultProps;

    const frames = 60 * animationDuration / 1000;
    const offset = index / (count - 1);
    const easing = Easing.bezier(0.5, offset, 0.5, 1.0);

    const inputRange = Array
      .from(new Array(frames), (undefined, index) => index / (frames - 1));

    const outputRange = Array
      .from(new Array(frames), (undefined, index) => easing(index / (frames - 1)) * 360 + 'deg');

    const layerStyle = {
      transform: [{
        rotate: progress.interpolate({ inputRange, outputRange }),
      }],
    };

    let ballStyle = {
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      backgroundColor,
      transform: [{
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [
            maxScale - (maxScale - minScale) * offset,
            minScale + (maxScale - minScale) * offset,
          ],
        }),
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
          style={{ width, height }}
          renderComponent={this.renderComponent}
          {...props}
        />
      </View>
    );
  }
}
