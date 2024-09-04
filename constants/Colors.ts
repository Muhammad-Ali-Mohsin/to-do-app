/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    taskBackground: '#e6f8fe',
    taskOutline: '#0a7ea4',
    checkboxColor: '#0a7ea4',
    buttonColor: '#96e0f9',
    buttonColorPressed: '#4ecbf4',
    buttonColorDisabled: '#d2d3d2',
    buttonColorPressedDisabled: '#d2d3d2'
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    taskBackground: '#36393e',
    taskOutline: '#1e2124',
    checkboxColor: 'grey',
    buttonColor: '#0a7ea4',
    buttonColorPressed: '#086482',
    buttonColorDisabled: '#04313f',
    buttonColorPressedDisabled: '#04313f'
  },
};
