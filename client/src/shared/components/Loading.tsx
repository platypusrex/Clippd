import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo';
import { BarIndicator } from './indicators/BarIndicator';
import { compose, withProps } from 'recompose';
import { PulseIndicator } from './indicators/PulseIndicator';
import { PacmanIndicator } from './indicators/PacmanIndicator';
import { DotIndicator } from './indicators/DotIndicator';
import { SkypeIndicator } from './indicators/SkypeIndicator';
import { BallIndicator } from './indicators/BallIndicator';

interface ParentProps {
  type?: 'bar' | 'dot' | 'pac' | 'pulse' | 'skype' | 'ball';
  random?: boolean
}

interface WithProps {
  backgroundColor: string;
  intensity: number;
}

type Props =
  ParentProps &
  WithProps;

export const LoadingComponent: React.SFC<Props> = (props) => {
  const {backgroundColor, intensity, } = props;
  const Indicator = getSelectedIndicator(props);

  return (
    <View style={{...StyleSheet.absoluteFillObject, backgroundColor, zIndex: 1000}}>
      <BlurView intensity={intensity} tint="default" style={{...StyleSheet.absoluteFillObject}}>
        {Indicator}
      </BlurView>
    </View>
  )
};

function getLoadingIndicators (): {[key: string]: React.ReactNode} {
  const color = '#fff';

  return {
    bar: <BarIndicator key="bar" color={color} count={6} size={50}/>,
    dot: <DotIndicator key="dot" color={color}/>,
    pac: <PacmanIndicator key="pac" color={color} size={100}/>,
    pulse: <PulseIndicator key="pulse" color={color} size={80}/>,
    skype: <SkypeIndicator key="skype" color={color} size={80}/>,
    ball: <BallIndicator key="ball" color={color} size={60}/>
  }
}

function getSelectedIndicator (props: Props) {
  const {type, random} = props;
  const Indicators = getLoadingIndicators();
  const IndicatorArray = [
    Indicators.bar,
    Indicators.dot,
    Indicators.pac,
    Indicators.pulse,
    Indicators.skype,
    Indicators.ball
  ];
  const indicatorIndex = Math.floor(Math.random() * IndicatorArray.length);

  if (type) {
    return Indicators[type];
  } else if (random) {
    return IndicatorArray[indicatorIndex];
  } else {
    return Indicators.bar;
  }
}

export const Loading = compose<Props, {}>(
  withProps(() => {
    const isIos = Platform.OS === 'ios';

    return {
      backgroundColor: isIos ? 'rgba(16,100,253, 0.65)' : 'rgba(16,100,253, 0.85)',
      intensity: isIos ? 90 : 100
    };
  })
)(LoadingComponent);