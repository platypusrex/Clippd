import * as React from 'react';
import { Animated, Easing, EasingFunction } from 'react-native';

interface ArrayConstructor {
  from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): Array<U>;
  from<T>(arrayLike: ArrayLike<T>): Array<T>;
}

interface State {
  progress: Animated.Value;
  animation?: Animated.CompositeAnimation | null;
}

export interface RenderComponentProps {
  index: number;
  count: number;
  progress: Animated.Value;
}

export interface IndicatorProps {
  interaction?: boolean;
  animationEasing?: EasingFunction;
  animationDuration?: number;
  animating?: boolean;
  count?: number;
  style?: {}
}

interface DefaultProps {
  animationEasing: EasingFunction;
  animationDuration: number;
  animating: boolean;
  interaction: boolean;
  count: number;
}

type Props = IndicatorProps & {
  renderComponent: (props: RenderComponentProps) => any;
}

export class Indicator extends React.PureComponent<Props, State> {
  static defaultProps: DefaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,
    animating: true,
    interaction: true,
    count: 1,
  };

  mounted: boolean;

  constructor(props: Props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);

    this.state = {progress: new Animated.Value(0)};

    this.mounted = false;
  }

  startAnimation({ finished }: any = {}) {
    const {progress} = this.state;
    const {interaction, animationEasing, animationDuration} = this.props;

    if (!this.mounted || false === finished) {
      return;
    }

    const animation =
      Animated.timing(progress, {
        duration: animationDuration,
        easing: animationEasing,
        useNativeDriver: true,
        isInteraction: interaction,
        toValue: 1,
      });

    if (Animated.loop) {
      Animated
        .loop(animation)
        .start();
    } else {
      progress.setValue(0);
      animation.start(this.startAnimation);
    }

    this.setState({animation});
  }

  stopAnimation() {
    const {animation} = this.state;

    if (null == animation) {
      return;
    }

    animation.stop();

    this.setState({animation: null});
  }

  componentDidMount() {
    const {animating} = this.props;

    this.mounted = true;

    if (animating) {
      this.startAnimation();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(props: Props) {
    const {animating} = this.props;

    if (animating !== props.animating) {
      if (animating) {
        this.stopAnimation();
      } else {
        this.startAnimation();
      }
    }
  }

  renderComponent(undefined: any, index: number) {
    const {progress} = this.state;
    const {renderComponent, count} = this.props as Props & DefaultProps;

    if ('function' === typeof renderComponent) {
      return renderComponent({index, count, progress});
    } else {
      return null;
    }
  }

  render() {
    const {count, ...props} = this.props;

    return (
      <Animated.View {...props}>
        {Array.from(new Array(count), this.renderComponent)}
      </Animated.View>
    );
  }
}
