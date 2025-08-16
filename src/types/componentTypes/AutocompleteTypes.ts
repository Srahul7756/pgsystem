import {IAutocompleteDropdownProps} from 'react-native-autocomplete-dropdown';

export interface AutocompleteProps extends IAutocompleteDropdownProps {
  placeholderText: string;
  autoCompleteRef?: React.Ref<unknown>;
}
