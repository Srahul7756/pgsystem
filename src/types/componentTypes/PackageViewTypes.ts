export interface PackageViewProps {
  headerColors: [string, string];
  footerColors: [string, string];
  title: string;
  subtitle: string;
  imageUrl: string;
  benefits: string[];
  cost: string;
  onParticipate?: () => void;
  colors: ColorProps;
  item: any;
}

type ColorProps = {
  primary: string;
  secondary: string;
  tertiary: string;
};
