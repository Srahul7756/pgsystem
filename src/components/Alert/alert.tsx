import React from 'react';
import { View } from 'react-native';

export type CustomAlertProps = React.ComponentProps<typeof View> & {
  show: boolean;
  icon?: React.ReactNode;
  title?: string;
  subTitle?: string;
  onPressTryAgain: () => void;
  onPressCancel: () => void;
  singleButtonText?: string;
  success?: boolean;
  warning?: boolean;
  failure?: boolean;
  buttonText?: string;
  notButton?: boolean;
  tryAgainWidth?: number;
  cancelWidth?: number;
};

function Alert() {


  return (
    <View>

    </View>
  );
}


export { Alert };
