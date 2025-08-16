import { AbstractedTheme, Theme, AbstractedFont, Font } from "./types/themes";

export function generateTheme(theme: Theme): AbstractedTheme {
  return {
    ...theme,
    jsb: theme,
  };
}

export function generateFont(font: Font): AbstractedFont {
  return {
    ...font,
    jsb: font,
  };
}

export const isEmptyOrNull = (input: any) => {
  return (
    input === null || input === undefined || input === "" || input.length == 0
  );
};
