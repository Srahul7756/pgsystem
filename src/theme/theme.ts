import { ThemeProps } from "styled-components/native";
import {
  ColorMap,
  FontMap,
  PaddingMap,
  Theme,
  AbstractedTheme,
  AbstractedFont,
} from "./types/themes";

function style(
  get: (t: Theme) => string
): (props: ThemeProps<AbstractedTheme>) => string {
  return (props): string => get(props.theme.jsb);
}

function color(
  getColor: (c: ColorMap) => string
): (props: ThemeProps<AbstractedTheme>) => string {
  return (props): string => getColor(props.theme.jsb.colors);
}

function font(
  getFont: (f: FontMap) => string
): (props: ThemeProps<AbstractedFont>) => string {
  return (props): string => getFont(props.theme.jsb.fontConfig);
}

function paddingHorizontal(
  getPadding: (f: PaddingMap) => string
): (props: ThemeProps<AbstractedTheme>) => string {
  return (props): string => getPadding(props.theme.jsb.paddingHorizontal);
}

export default {
  style,
  color,
  font,
  paddingHorizontal,
};
