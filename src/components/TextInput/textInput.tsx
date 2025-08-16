import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TextInput as DefaultInput,
  TouchableWithoutFeedback,
  ViewStyle,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  TouchableOpacity,
  Keyboard,
  TextInputSubmitEditingEventData,
  TextStyle,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTheme} from '../../theme/useTheme';
import {
  DeleteButtonProps,
  ShowTextProps,
  PlaceholderProps,
  AnimatedInputProps,
  RightButtonProps,
} from '../../types/componentTypes/TextInputTypes';
import {
  AlphaNumericRegex,
  AmountRegex,
  DecimalOnlyRegex,
  NumberOnlyRegex,
} from '../../utils/commonRegex';
import Feather from 'react-native-vector-icons/Feather';

const AnimatedIcon = Animated.createAnimatedComponent(Entypo);

const TextInput = React.forwardRef<DefaultInput, AnimatedInputProps>(
  (
    {
      placeholder,
      placeholderTextColor: phtc,
      backgroundColor,
      borderColor,
      deleteIconColor,
      style,
      containerStyle,
      placeholderTextStyle,
      defaultValue,
      onChangeText,
      onCustomValueChange,
      onFocus,
      onBlur,
      secureTextEntry,
      searchIcon,
      multiline,
      isIcon,
      icon,
      rightIcon,
      handlePressRight,
      value,
      editable,
      type,
      hint,
      validationError,
      setShow,
      noBorder,
      fontWeight,
      fontSize,
      height,
      formattedNumber,
      formattedAmount,
      searchIconColor,
      color,
      ...rest
    }: AnimatedInputProps,
    ref,
  ) => {
    const [text, setText] = useState(defaultValue ?? value ?? '');
    const [isFocused, setIsFocused] = useState(false);
    const {theme, font} = useTheme();
    const inputRef = ref ?? useRef<DefaultInput>(null);
    const [showPass, setShowPass] = useState(secureTextEntry ? true : false);
    const placeholderTextColor = phtc ? phtc : theme.colors.neutral.lightActive;
    const fws = value
      ? font.fontConfig.fontWeights.xMedium
      : font.fontConfig.fontWeights.regular;
    const styles = {
      container: {
        backgroundColor: theme.colors.white,
        borderColor: validationError
          ? theme.colors.failureRed
          : borderColor
          ? borderColor
          : theme.colors.neutral.lightActive,
        borderWidth: noBorder ? 0 : 1,
        height: height ? height : 48,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 14,
        ...containerStyle,
      } as ViewStyle,
      textInput: {
        fontSize: fontSize || 14,
        flex: 1,
        fontFamily: 'Inter',
        color: color || theme.colors.neutral.normal,
        fontWeight: fws,
      } as TextStyle,
    };

    // ---> Animations
    const deleteButtonAnimationProgress = useSharedValue(text === '' ? 0 : 1);
    const placeholderAnimationProgress = useSharedValue(text === '' ? 0 : 1);

    useEffect(() => {
      deleteButtonAnimationProgress.value = withTiming(text === '' ? 0 : 1);
      placeholderAnimationProgress.value = withDelay(
        20,
        withTiming(text === '' && !isFocused ? 0 : 1, {duration: 350}),
      );
    }, [isFocused, text]);

    // ---> Functions
    const focusInput = () => {
      // @ts-ignore
      inputRef?.current?.focus();
    };

    const handlePressDelete = () => {
      handleChangeText('');
      // @ts-ignore
      inputRef?.current?.focus();
    };

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChangeText = (input: string) => {
      const updateAll = (raw: string, formatted: string) => {
        setText(formatted);
        onChangeText?.(raw);
        onCustomValueChange?.({raw, formatted});
      };

      const getDigitsOnly = (str: string, maxLength?: number) => {
        let digits = str.replace(/\D/g, '');
        return maxLength ? digits.slice(0, maxLength) : digits;
      };

      if (formattedNumber) {
        const rawValue = getDigitsOnly(input, 10);
        let formattedValue = rawValue;

        if (rawValue.length > 6) {
          formattedValue = `${rawValue.slice(0, 3)} ${rawValue.slice(
            3,
            6,
          )} ${rawValue.slice(6)}`;
        } else if (rawValue.length > 3) {
          formattedValue = `${rawValue.slice(0, 3)} ${rawValue.slice(3)}`;
        }

        return updateAll(rawValue, formattedValue);
      }

      if (formattedAmount) {
        const RS = '₹';
        const rawValue = getDigitsOnly(input);

        let formattedValue = rawValue;
        if (rawValue.length > 3) {
          const lastThree = rawValue.slice(-3);
          const others = rawValue.slice(0, -3).replace(AmountRegex, ',');
          formattedValue = `${others ? others + ',' : ''}${lastThree}`;
        }

        const finalValue = rawValue ? `${RS} ${formattedValue}` : RS;
        return updateAll(rawValue, finalValue);
      }

      if (type === 'debitCardNoExpiry') {
        const rawValue = getDigitsOnly(input, 4);
        const formattedValue =
          rawValue.length >= 3
            ? `${rawValue.slice(0, 2)}/${rawValue.slice(2)}`
            : rawValue;

        return updateAll(rawValue, formattedValue);
      }

      let updatedText = input;

      if (type === 'number') {
        updatedText = input.replace(NumberOnlyRegex, '');
      } else if (type === 'decimal') {
        updatedText = input.replace(DecimalOnlyRegex, '');
        if (updatedText.startsWith('.')) updatedText = '';

        const dotCount = updatedText.split('.').length - 1;
        if (dotCount > 1) {
          updatedText = updatedText.replace(/\./g, (match, offset) =>
            offset === updatedText.indexOf('.') ? match : '',
          );
        }

        const [integerPart, decimalPart] = updatedText.split('.');
        if (decimalPart && decimalPart.length > 2) {
          updatedText = `${integerPart}.${decimalPart.slice(0, 2)}`;
        }
      } else if (type === 'alphanumeric') {
        updatedText = input.replace(AlphaNumericRegex, '');
      }

      setText(updatedText);
      onChangeText?.(updatedText);
    };

    const onShow = () => {
      setShowPass(!showPass);
    };

    const handleKeyboardDismiss = (
      e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    ) => {
      Keyboard.dismiss();
      rest.onSubmitEditing && rest.onSubmitEditing(e);
    };

    return (
      <TouchableWithoutFeedback onPress={focusInput}>
        <View style={styles.container}>
          {searchIcon && (
            <Feather
              style={{zIndex: 999}}
              name="search"
              size={20}
              color={searchIconColor || theme.colors.primary.darker}
            />
          )}
          {isIcon ? <View>{icon}</View> : <></>}
          <DefaultInput
            {...rest}
            // When formattedNumber is true, override maxLength and keyboardType
            maxLength={formattedNumber ? 12 : rest.maxLength}
            keyboardType={formattedNumber ? 'number-pad' : rest.keyboardType}
            placeholder={hint} // force native placeholder to be empty string
            style={[styles.textInput, style]}
            secureTextEntry={showPass}
            ref={inputRef}
            value={text}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={handleKeyboardDismiss}
            placeholderTextColor={theme.colors.neutral.lightActive}
            editable={editable}
            selectionColor={theme.colors.neutral.normal}
            textAlign={rest.textAlign}
          />

          {secureTextEntry && !setShow ? (
            <ShowText
              {...{
                deleteIconColor,
                deleteButtonAnimationProgress,
                textColor: 'orange',
                onShow,
                showPass,
                theme,
              }}
            />
          ) : rightIcon ? (
            <RightIcon
              {...{
                rightIcon,
                handlePressRight,
                deleteIconColor,
                deleteButtonAnimationProgress,
              }}
            />
          ) : (
            editable && (
              <DeleteButton
                {...{
                  handlePressDelete,
                  deleteIconColor,
                  deleteButtonAnimationProgress,
                }}
              />
            )
          )}
          <Placeholder
            {...{
              searchIcon,
              placeholder,
              placeholderTextColor,
              placeholderTextStyle,
              placeholderAnimationProgress,
              backgroundColor,
              isIcon,
              multiline,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

const DeleteButton = ({
  deleteButtonAnimationProgress,
  deleteIconColor,
  handlePressDelete,
}: DeleteButtonProps) => {
  const style = useAnimatedStyle(() => ({
    marginRight: 14,
    opacity: interpolate(deleteButtonAnimationProgress.value, [0, 1], [0, 1]),
    transform: [
      {
        translateX: interpolate(
          deleteButtonAnimationProgress.value,
          [0, 1],
          [8, 0],
        ),
      },
    ],
  }));

  return (
    <TouchableWithoutFeedback onPress={handlePressDelete}>
      <Animated.View style={style}>
        <AnimatedIcon
          name="circle-with-cross"
          size={24}
          color={deleteIconColor}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const RightIcon = ({rightIcon, handlePressRight}: RightButtonProps) => {
  const RIcon = rightIcon;
  return (
    <TouchableOpacity onPress={handlePressRight}>
      <RIcon />
    </TouchableOpacity>
  );
};

const ShowText = ({
  deleteButtonAnimationProgress,
  textColor,
  onShow,
  showPass,
  theme,
}: ShowTextProps) => {
  const style = useAnimatedStyle(() => ({
    marginRight: 14,
    opacity: interpolate(deleteButtonAnimationProgress.value, [0, 1], [0, 1]),
    transform: [
      {
        translateX: interpolate(
          deleteButtonAnimationProgress.value,
          [0, 1],
          [8, 0],
        ),
      },
    ],
  }));

  return (
    <TouchableWithoutFeedback onPress={onShow}>
      <Animated.View style={style}>
        <Feather
          name={showPass ? 'eye-off' : 'eye'}
          size={24}
          color={theme.colors.neutral.light}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const Placeholder = ({
  placeholder,
  placeholderTextColor,
  placeholderTextStyle,
  placeholderAnimationProgress,
  backgroundColor,
  searchIcon,
  isIcon,
  multiline,
}: PlaceholderProps) => {
  const {theme} = useTheme();
  const styles = {
    placeholderContainerStyle: useAnimatedStyle(() => ({
      position: 'absolute',
      backgroundColor: backgroundColor ?? theme.colors.white,
      paddingHorizontal: interpolate(
        placeholderAnimationProgress.value,
        [0.6, 1],
        [0, 5],
        Extrapolation.CLAMP,
      ),
      marginHorizontal: isIcon
        ? interpolate(
            placeholderAnimationProgress.value,
            [0.6, 1],
            [25, 0],
            Extrapolation.CLAMP,
          )
        : interpolate(
            placeholderAnimationProgress.value,
            [0.6, 1],
            [5, 0],
            Extrapolation.CLAMP,
          ),
      transform: [
        {
          translateY: interpolate(
            placeholderAnimationProgress.value,
            [0, 1],
            [0.765, multiline ? -48 : -28],
          ),
        },
        {translateX: 20},
      ],
    })),
    placeholderStyle: useAnimatedStyle(() => ({
      color: placeholderTextColor,
      fontSize: interpolate(
        placeholderAnimationProgress.value,
        [0, 1],
        [15.5, 11],
      ),
      ...placeholderTextStyle,
    })),
  };

  return (
    <>
      {placeholder && placeholder !== '' ? (
        <Animated.View style={styles.placeholderContainerStyle}>
          <Animated.Text style={styles.placeholderStyle}>
            {placeholder?.length > 32
              ? placeholder?.slice(0, 34) + '...'
              : placeholder}
          </Animated.Text>
        </Animated.View>
      ) : null}
    </>
  );
};

export {TextInput};
