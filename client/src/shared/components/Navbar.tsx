import * as React from 'react';
import { Platform, TouchableOpacity, View, Text, StatusBar } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';
import { Ionicons } from '@expo/vector-icons';
import { iosNavbar, androidNavbar, sharedNavbar } from '../../styles/shared/Navbar';
import { primary } from '../../styles/variables/colors';

interface Body {
  title: string;
  style?: {};
}

interface NavbarButton {
  title?: string;
  style?: {};
  icon?: IconProps;
  handler?: () => any;
  disabled?: boolean;
}

interface Props {
  leftButton?: NavbarButton;
  rightButton?: NavbarButton;
  body: Body;
  style?: {}
}

export const Navbar: React.SFC<Props> = (props) => {
  const {leftButton, rightButton, body} = props;
  const styles = Platform.OS === 'ios' ? iosNavbar : androidNavbar;

  const button = (btnProps?: NavbarButton) => {
    return btnProps ? (
      <TouchableOpacity
        activeOpacity={0.5}
        style={btnProps.style}
        disabled={btnProps.disabled}
        onPress={btnProps.handler}
      >
        {btnProps.title &&
        <Text style={sharedNavbar.buttonText}>{btnProps.title}</Text>}

        {btnProps.icon &&
        <Ionicons
          name={btnProps.icon.name}
          size={btnProps.icon.size || 36}
          color={btnProps.icon.color || '#2a2a2a'}
          style={styles.buttonIcon}
        />}
      </TouchableOpacity>
    ) : null;
  };

  return (
    <View style={[sharedNavbar.navWrapper, styles.navWrapper, props.style]}>
      <StatusBar backgroundColor={primary} barStyle="light-content"/>
      <View style={[sharedNavbar.navInnerWrapper, styles.navInnerWrapper]}>
        <View style={sharedNavbar.leftButton}>
          {button(leftButton)}
        </View>

        <View style={sharedNavbar.titleWrapper}>
          <Text style={[sharedNavbar.title, body.style]}>{body.title}</Text>
        </View>

        <View style={sharedNavbar.rightButton}>
          {button(rightButton)}
        </View>
      </View>
    </View>
  );
};