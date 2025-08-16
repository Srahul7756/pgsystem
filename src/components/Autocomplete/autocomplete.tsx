import React from 'react';
import {AutocompleteProps} from '../../types/componentTypes/AutocompleteTypes';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {useTheme} from '../../theme/useTheme';
import Feather from 'react-native-vector-icons/Feather';
import {View} from 'react-native';
import {Divider} from '../../components/Divider';

export const Autocomplete: React.FC<AutocompleteProps> = props => {
  const {placeholderText, autoCompleteRef, renderItem, ...rest} = props;
  const {theme, font} = useTheme();

  return (
    <AutocompleteDropdown
      {...rest}
      {...(renderItem ? {renderItem} : {})}
      ref={autoCompleteRef}
      inputContainerStyle={{
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.colors.neutral.lightActive,
      }}
      suggestionsListContainerStyle={{
        backgroundColor: theme.colors.white,
        borderWidth: 0.2,
        borderColor: theme.colors.neutral.normal,
      }}
      ItemSeparatorComponent={() => (
        <Divider
          dashColor={theme.colors.neutral.lightActive}
          dashThickness={0.3}
          dashGap={0}
        />
      )}
      ChevronIconComponent={
        <Feather
          name="chevron-down"
          size={16}
          color={theme.colors.neutral.normal}
        />
      }
      ClearIconComponent={
        <Feather
          name="x-circle"
          size={16}
          color={theme.colors.neutral.normal}
        />
      }
      textInputProps={{
        placeholder: placeholderText,
        placeholderTextColor: theme.colors.neutral.lightActive,
        style: {
          color: theme.colors.neutral.normal,
          fontWeight: font.fontConfig.fontWeights.medium,
          fontSize: font.fontConfig.fontSizes.font14,
        },
      }}
      suggestionsListTextStyle={{
        fontSize: font.fontConfig.fontSizes.font14,
        fontWeight: font.fontConfig.fontWeights.medium,
        color: theme.colors.neutral.normal,
      }}
    />
  );
};
