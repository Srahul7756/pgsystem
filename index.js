import {AppRegistry, Text, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json'; // This should match the name in app.json
import {Provider} from 'react-redux';
import store from './src/store';

// Override Text scaling
if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

// Override Text scaling in input fields
if (TextInput.defaultProps) {
  TextInput.defaultProps.allowFontScaling = false;
} else {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

const Root = () => {
  return (
    <Provider store={store}>
        <App />
    </Provider>
  );
};

// Ensure this matches the name in app.json
AppRegistry.registerComponent(appName, () => Root);
