import * as React from 'react';
import { Animated, Easing, EasingFunction } from 'react-native';
import { Indicator, IndicatorProps, RenderComponentProps } from './Indicator';
import { dotIndicatorStyles as styles } from '../../../styles/shared/DotIndicatorStyles';

interface DotIndicatorProps {
  color?: string;
  size?: number
}

interface DefaultProps {
  animationEasing: EasingFunction;
  color: string;
  count: number;
  size: number;
}

type Props = IndicatorProps & DotIndicatorProps;

export class DotIndicator extends React.PureComponent<Props, {}> {
  public static defaultProps: DefaultProps = {
    animationEasing: Easing.inOut(Easing.ease),
    color: 'rgb(0, 0, 0)',
    count: 4,
    size: 16,
  };

  constructor(props: Props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({index, count, progress}: RenderComponentProps) {
    const {size, color: backgroundColor} = this.props as Props & DefaultProps;

    const style = {
      width: size,
      height: size,
      margin: size / 2,
      borderRadius: size / 2,
      backgroundColor,
      transform: [{
        scale: progress.interpolate({
          inputRange: [
            0.0,
            (index + 0.5) / (count + 1),
            (index + 1.0) / (count + 1),
            (index + 1.5) / (count + 1),
            1.0,
          ],
          outputRange: [
            1.0,
            1.36,
            1.56,
            1.06,
            1.0,
          ],
        }),
      }],
    };

    return (
      <Animated.View style={style} {...{ key: index }} />
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
