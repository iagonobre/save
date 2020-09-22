import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    colors: {
      background: string;
      backgroundPurple: string;
      primaryLighter: string;
      primaryLight: string;
      primary: string;
      textPurple: string;
      primaryDark: string;
      line: string;
      primaryDarker: string;
      secondary: string;
      secondaryDark: string;
      titlePrimary: string;
      textPrimary: string;
      textTitle: string;
      textComplement: string;
      textBase: string;
      lineWhite: string;
      inputBackground: string;
      buttonText: string;
      boxBase: string;
      boxFooter: string;
      warnColor: string;
      tintColor: string;
    };
  }
}
