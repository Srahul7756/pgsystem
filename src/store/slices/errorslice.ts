import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  openDialog: false,
  message: '',
  title: '',
  onPressTryAgain: () => {},
  icon: () => {},
  singleButtonText: '',
  onOk: () => {},
  success: false,
  warning: false,
  failure: false,
  swapButton: false,
  buttonText: 'Ok',
  noButton: false,
  tryAgainWidth: 130,
  cancelWidth: 130,
  cancelText: '',
};

export const errorSlice = createSlice({
  name: 'error-slice',
  initialState: initialState,
  reducers: {
    showError(state, action) {
      state.openDialog = true;
      const {
        title,
        message,
        onPressTryAgain,
        onOk,
        icon,
        singleButtonText,
        success,
        warning,
        failure,
        buttonText,
        noButton,
        tryAgainWidth,
        cancelWidth,
        swapButton,
        cancelText,
      } = action.payload;
      state.message = message;
      state.title = title;
      (state.onPressTryAgain = onPressTryAgain),
        (state.icon = icon),
        (state.singleButtonText = singleButtonText),
        (state.success = success),
        (state.warning = warning);
      state.failure = failure;
      state.onOk = onOk;
      state.buttonText = buttonText;
      state.noButton = noButton;
      state.tryAgainWidth = tryAgainWidth;
      state.cancelWidth = cancelWidth;
      state.swapButton = swapButton;
      state.cancelText = cancelText;
    },
    clearError(state) {
      state.openDialog = false;
      state.message = '';
      state.title = '';
      state.onPressTryAgain = () => {};
      state.onOk = () => {};
      state.icon = () => {};
      state.singleButtonText = '';
      state.success = false;
      state.warning = false;
      state.failure = false;
      state.buttonText = 'Ok';
      state.noButton = false;
      state.swapButton = false;
      state.cancelText = '';
    },
  },
});

export const {showError, clearError} = errorSlice.actions;
