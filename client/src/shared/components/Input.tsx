import * as  React from 'react';
import {
	View, Text, TextInput, TextInputProperties, TextInputAndroidProperties, TextInputIOSProperties
} from 'react-native';
import { inputStyles } from "../../styles/shared/InputStyles";

interface ParentProps {
  error?: string;
  textArea?: boolean;
}

type Props =
	ParentProps &
	TextInputProperties &
	TextInputAndroidProperties &
	TextInputIOSProperties;

export const Input = (props: Props) => {
	const {error, textArea, ...inputProps} = props;

	return (
		<View style={inputStyles.inputWrapper}>
			<TextInput
				{...inputProps}
				underlineColorAndroid="transparent"
        autoCapitalize={inputProps.autoCapitalize || 'none'}
				style={[inputStyles.input, inputProps.style, textArea ? inputStyles.textArea : null]}
				placeholderTextColor="#5a5a5a"
			/>

			{error && <Text style={inputStyles.inputError}>{error}</Text>}
		</View>
	)
};