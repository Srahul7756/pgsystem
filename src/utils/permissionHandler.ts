import {PermissionsAndroid, Platform} from 'react-native';

/**
 * Checks and requests a given permission (or multiple permissions optionally) on Android.
 *
 * @param {string|string[]} permission - The permission or array of permissions to check and request.
 * @param {object} [options={}] - Custom dialog options.
 * @param {string} options.title - Title for the permission request dialog.
 * @param {string} options.message - Message for the permission request dialog.
 * @param {string} [options.buttonNeutral='Ask Me Later'] - Label for the neutral button.
 * @param {string} [options.buttonNegative='Cancel'] - Label for the negative button.
 * @param {string} [options.buttonPositive='OK'] - Label for the positive button.
 *
 * @returns {Promise<object|boolean>} - Returns an object with permission statuses for multiple permissions or a boolean for a single permission.
 */
export async function checkAndRequestPermission(
  permission,
  options = {
    title: '',
    message: '',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  },
) {
  if (Platform.OS !== 'android') {
    console.warn(
      'Permissions are only handled on Android using this function.',
    );
    return Array.isArray(permission)
      ? permission.reduce((acc, perm) => ({...acc, [perm]: true}), {})
      : true;
  }

  try {
    if (!Array.isArray(permission)) {
      // Single permission case
      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) return true;

      const result = await PermissionsAndroid.request(permission, {
        title: options.title,
        message: options.message,
        buttonNeutral: options.buttonNeutral,
        buttonNegative: options.buttonNegative,
        buttonPositive: options.buttonPositive,
      });
      return result === PermissionsAndroid.RESULTS.GRANTED;
    }

    // Multiple permissions case
    const results = {};
    for (const perm of permission) {
      results[perm] = await PermissionsAndroid.check(perm);
    }

    const permissionsToRequest = permission.filter(perm => !results[perm]);
    if (permissionsToRequest.length === 0) return results;

    const requestResults = await PermissionsAndroid.requestMultiple(
      permissionsToRequest,
    );

    for (const perm of permissionsToRequest) {
      results[perm] =
        requestResults[perm] === PermissionsAndroid.RESULTS.GRANTED;
    }

    return results;
  } catch (error) {
    console.warn('Permission request error:', error);
    return Array.isArray(permission)
      ? permission.reduce((acc, perm) => ({...acc, [perm]: false}), {})
      : false;
  }
}
