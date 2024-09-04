import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, Pressable } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '@/components/ThemedText';

interface Props {
    text: string,
    disabled: boolean,
    style?: StyleProp<ViewStyle>,
    onPress: () => void;
}

export function Button({text, disabled, style, onPress}: Props) {
  const backgroundColor = useThemeColor({}, disabled ? 'buttonColorDisabled' : 'buttonColor')
  const backgroundColorPressed = useThemeColor({}, disabled ? 'buttonColorPressedDisabled' : 'buttonColorPressed')

  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        { backgroundColor: pressed ? backgroundColorPressed : backgroundColor },
        styles.button,
        style,
    ]}
    >
      <ThemedText>{text}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
  },
});
