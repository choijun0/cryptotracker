import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentColor: string;
    elementColor: string;
    notLoadedColor: string;
    headerBgColor: string;
  }
}