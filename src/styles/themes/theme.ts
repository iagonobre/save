import { DefaultTheme } from 'styled-components';

const light: DefaultTheme = {
  title: 'light',
  colors: {
    background: '#F0F0F7',
    backgroundPurple: '#6B3B8B',
    primaryLighter: '#A579C7',
    primaryLight: '#9764BE',
    primary: '#894EB4',
    primaryDark: '#7B44A0',
    line: '#7B44A0',
    textPurple: '#6B3B8B',
    primaryDarker: '#6B3B8B',
    secondary: '#EDC86B',
    secondaryDark: '#E9BF52',
    titlePrimary: '#FFFFFF',
    textPrimary: '#D4C2FF',
    textTitle: '#6B3B8B',
    textComplement: '#9C98A6',
    textBase: '#6A6180',
    lineWhite: '#E6E6F0',
    inputBackground: '#F8F8FC',
    buttonText: '#FFFFFF',
    boxBase: '#FFFFFF',
    boxFooter: '#FAFAFC',
    warnColor: '#E33D3D',
    tintColor: '#c1bccc',
  },
};

const dark: DefaultTheme = {
  title: 'dark',
  colors: {
    background: '#2D2D2D',
    backgroundPurple: '#222222',
    primaryLighter: '#4D4D4D',
    primaryLight: '#3D3D3D',
    primary: '#894EB4',
    primaryDark: '#7B44A0',
    line: '#2D2D2D',
    textPurple: '#E9BF52',
    primaryDarker: '#6B3B8B',
    secondary: '#EDC86B',
    secondaryDark: '#E9BF52',
    titlePrimary: '#FFFFFF',
    textPrimary: '#D4C2FF',
    textTitle: '#FFFFFF',
    textComplement: '#8D8D8D',
    textBase: '#DCDCDC',
    lineWhite: '#3D3D3D',
    inputBackground: '#F8F8FC',
    buttonText: '#FFFFFF',
    boxBase: '#222222',
    boxFooter: '#333333',
    warnColor: '#E33D3D',
    tintColor: '#4D4D4D',
  },
};

export { light, dark };
export default light;
