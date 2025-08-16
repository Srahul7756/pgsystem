export interface HeaderProps {
  title?: string;
  withBack?: boolean;
  children?:
    | React.FC<any>
    | React.ComponentType<any>
    | (() => React.JSX.Element);
  showBorder?: boolean;
  icon?: any;
  leftIcon?: any;
  bgColor?: string;
  withClose?: boolean;
  titleWidth?: string | number;
  color?: string;
  subtitle?: string;
  transparent?: boolean;
  textColor?: string;
  rightIcon?: any;
  textSize?: number;
  customSubTitle?: any;
  height?: number;
  customOnBack?: () => void;
  highlighedHeader?: boolean;
}
