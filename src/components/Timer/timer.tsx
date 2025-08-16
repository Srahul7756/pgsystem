import React, {useEffect, useRef, useState} from 'react';
import {TimerProps} from '../../types/componentTypes/TimerTypes';
import {AppState, View} from 'react-native';
import {useTheme} from '../../theme/useTheme';
import {RESEND_OTP, RESEND_OTP_IN, SECONDS} from '../../constants/Textkeys';
import {Button, Row, TextView} from '../../components/index';

export const Timer: React.FC<TimerProps> = props => {
  const [seconds, setSeconds] = useState(30);
  const [shouldStartTimer, setShouldStartTimer] = useState(false);
  const {font, theme} = useTheme();
  const timerRef = useRef(seconds);
  const endTimeRef = useRef<Date | null>(null);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active' && endTimeRef.current) {
        const timeRemaining = Math.max(
          0,
          Math.floor(
            (endTimeRef.current.getTime() - new Date().getTime()) / 1000,
          ),
        );
        setSeconds(timeRemaining);
        timerRef.current = timeRemaining;
      }
    };

    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateListener.remove();
    };
  }, []);

  useEffect(() => {
    timerRef.current = seconds;
    if (seconds <= 0) return;

    endTimeRef.current = new Date(new Date().getTime() + seconds * 1000);

    const timerId = setInterval(() => {
      const timeRemaining = Math.max(
        0,
        Math.floor(
          (endTimeRef.current!.getTime() - new Date().getTime()) / 1000,
        ),
      );
      setSeconds(timeRemaining);
      timerRef.current = timeRemaining;

      if (timeRemaining <= 0) {
        clearInterval(timerId);
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [shouldStartTimer]);

  const handleReset = async () => {
    await props?.handleReset();
    setSeconds(30);
    setShouldStartTimer(!shouldStartTimer);
  };

  return (
    <View>
      {seconds > 0 ? (
        <Row style={{alignItems: 'center'}}>
          <TextView
            title={RESEND_OTP_IN}
            size={font.fontConfig.fontSizes.font14}
            weight={font.fontConfig.fontWeights.regular}
            color={theme.colors.neutral.normal}
            style={{letterSpacing: -0.14, lineHeight: 17.78}}
          />
          <TextView
            title={` ${seconds} ` + SECONDS}
            size={font.fontConfig.fontSizes.font14}
            weight={font.fontConfig.fontWeights.xMedium}
            color={theme.colors.neutral.normal}
            style={{letterSpacing: -0.14, lineHeight: 17.78}}
          />
        </Row>
      ) : (
        <Button variant="primary" title={RESEND_OTP} onPress={handleReset} />
      )}
    </View>
  );
};
