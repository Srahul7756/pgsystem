import { Alert, BackHandler } from 'react-native';

export const alertExit = () => {
    Alert.alert(
        'Exit',
        'Do you really want to exit the app?',
        [
            {
                text: 'No',
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: () => BackHandler.exitApp(),
            },
        ],
        {
            cancelable: false,
        },
    );
    return true;
};
