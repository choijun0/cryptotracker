import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor:string;
    textColor:string;
    accentColor:string;
    defaultWhiteColor: string;
    notLoadedColor:string;
  }
}