import React from 'react';
import {
	TouchableNativeFeedback,
	TouchableOpacity,
	TouchableNativeFeedbackProperties,
	TouchableOpacityProperties,
	View,
	Text,
	Platform
} from "react-native";
import { buttonStyles as defaultStyles } from '../../styles/shared/ButtonStyles';

interface ParentProps {
  buttonText: string;
  buttonStyles?: {};
  textStyles?: {};
  type?: 'default' | 'primary' | 'warning' | 'danger' | 'success' ;
  size?: 'small' | 'large';
  clear?: boolean;
  full?: boolean;
}

type Props =
	ParentProps &
	TouchableNativeFeedbackProperties &
	TouchableOpacityProperties;

export const Button: React.SFC<Props> = (props) => {
	const {buttonText, buttonStyles, textStyles, onPress, ...otherProps} = props;
	const buttonDefaults = getButtonDefaults(props);

	const buttonInner = (
		<View style={[defaultStyles.button, buttonDefaults.backgroundColor, buttonDefaults.buttonSize, buttonStyles]}>
			<Text style={[defaultStyles.text, buttonDefaults.textColor, textStyles]}>{buttonText.toUpperCase()}</Text>
		</View>
	);

	const buttonOuter = Platform.OS === 'ios' ? (
		<TouchableOpacity onPress={onPress}{...otherProps}>
			{buttonInner}
		</TouchableOpacity>
	) : (
		<TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.SelectableBackground()}
      {...otherProps}
    >
			{buttonInner}
		</TouchableNativeFeedback>
	);

	return <View style={[ buttonDefaults.buttonWidth]}>{buttonOuter}</View>
};

function getButtonDefaults (props: Props) {
	const {type, clear, size, full, disabled} = props;
  const stylesCopy = defaultStyles as any;
  let backgroundColor;
  let textColor;
  const buttonSize = size ? defaultStyles[size] : defaultStyles.large;
  const buttonWidth = full ? defaultStyles.full : {};

  if (disabled) {
    backgroundColor = defaultStyles.disabled;
    textColor = defaultStyles.disabledTextColor;
  } else {
    if (type && clear) {
      backgroundColor = stylesCopy[type + 'Clear'];
      textColor = type !== 'default' ? stylesCopy[type + 'TextColor'] : defaultStyles.defaultTextColor;
    } else if (type && !clear) {
      backgroundColor = stylesCopy[type];
      textColor = defaultStyles.textColor
    } else if (!type && clear) {
      backgroundColor = defaultStyles.defaultClear;
      textColor = defaultStyles.defaultTextColor;
    } else {
      backgroundColor = stylesCopy.default;
      textColor = defaultStyles.defaultTextColor
    }
  }

  return {backgroundColor, textColor, buttonSize, buttonWidth};
}