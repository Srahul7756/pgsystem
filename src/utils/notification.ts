import { Dispatch } from './../types/common';
import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { onNotification } from '../store/slices/notificationslice';
import { notificationToken } from '../services/notificationservice';
import { getNotificationToken, setNotificationToken } from './userstorage';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

async function requestUserPermission() {
  await messaging().requestPermission();
  // await PermissionsAndroid.request(
  //   PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  // );
}

async function androidNotificationPermission() {
  const permissionName = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
  const result = await request(permissionName);
  if (result === RESULTS.GRANTED) {
  } else {
  }
}

async function initiatePushNotification(dispatch: any) {
  try {
    if (Platform.OS === 'android') {
      androidNotificationPermission();
    } else if (Platform.OS === 'ios') {
      requestUserPermission();
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      messaging().setAPNSToken(token.token);
      getNotificationToken().then(data => {
        if (!data) {
          messaging()
            .getToken()
            .then(token => {
              dispatch(notificationToken(token));
              setNotificationToken(token);
            });
        }
      });
      // messaging().subscribeToTopic('test');
    },
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
      // process the notification here
      // required on iOS only
      dispatch(onNotification(notification.id));
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    // Android only
    senderID: '1090501687137',
    // iOS only
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
  const type = 'notification';
  PushNotificationIOS.addEventListener(type, onRemoteNotification);
  return () => {
    PushNotificationIOS.removeEventListener(type);
  };
}

const onRemoteNotification = (notification: any) => {
  const isClicked = notification.getData()?.userInteraction === 1;
  if (isClicked) {
    // Navigate user to another screen
  } else {
    // Do something else with push notification
  }
  // Use the appropriate result based on what you needed to do for this notification
  const result = PushNotificationIOS.FetchResult.NoData;
  notification.finish(result);
};

export { initiatePushNotification };
