import {
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export interface ISize {
  width: number;
  height: number;
}
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

const filteredBalanceWithoutCommas = (amount: string) => {
  let balanceTrim = Number(amount).toFixed(2);
  return balanceTrim;
};

export {DeviceWidth, DeviceHeight, filteredBalanceWithoutCommas};

export const getMaskedValue = (input: string) => {
  if (input?.length <= 4) {
    return input;
  }
  const maskedPart = '•'.repeat(input?.length - 4);
  return maskedPart + input?.slice(-4);
};

export const getMaskedAccountNumber = (input: string) => {
  if (input.length <= 4) {
    return input;
  }
  const maskedPart = 'X'.repeat(input.length - 4);
  return maskedPart + input.slice(-4);
};

function getImageSize(uri: string): Promise<ISize> {
  const success =
    (resolve: (value?: ISize | PromiseLike<ISize>) => void) =>
    (width: number, height: number) => {
      resolve({
        width,
        height,
      });
    };
  const error = (reject: (reason?: any) => void) => (failure: Error) => {
    reject(failure);
  };

  return new Promise<ISize>((resolve, reject) => {
    Image.getSize(uri, success(resolve), error(reject));
  });
}

export {getImageSize};

export const rowButtonWidth = (DeviceWidth - 48) / 2;

export const sortedContacts = contacts =>
  contacts.sort((a, b) => {
    const nameA = a?.givenName?.toString() || '';
    const nameB = b?.givenName?.toString() || '';

    const isNameAStartingWithNumber = ContactRegex.test(nameA);
    const isNameBStartingWithNumber = ContactRegex.test(nameB);

    if (!isNameAStartingWithNumber && isNameBStartingWithNumber) return -1;
    if (isNameAStartingWithNumber && !isNameBStartingWithNumber) return 1;
    return nameA.localeCompare(nameB, undefined, {numeric: true});
  });

export const getAvatarInitials = (textString: string) => {
  if (!textString) return '';
  const text = textString.trim();
  const textSplit = text.split(' ');
  if (textSplit.length <= 1) return text.charAt(0);
  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
  return initials;
};

export function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function getInterFontByWeight(weight: string) {
  switch (weight) {
    case '400':
      return 'Inter-Regular';
    case '500':
      return 'Inter-Medium';
    case '600':
      return 'Inter-SemiBold';
    case '700':
      return 'Inter-Bold';
    default:
      return 'Inter-Regular';
  }
}

export const formatNumberToShortForm = (number: number): string => {
  if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M+';
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(1).replace(/\.0$/, '') + 'K+';
  }
  return (number || 0) + '+';
};

export const requestStoragePermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        ]);
        return Object.values(result).every(
          val => val === PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        return Object.values(result).every(
          val => val === PermissionsAndroid.RESULTS.GRANTED,
        );
      }
    }
    return true;
  } catch (error) {
    console.warn('Permission error:', error);
    return false;
  }
};

export const downloadPdf = async (fileUrl: string, fileName?: string) => {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    Alert.alert(
      'Permission Denied',
      'Storage permission is required to download files.',
    );
    return;
  }

  const {config, fs} = RNFetchBlob;
  const filePath = `${fs.dirs.DownloadDir}/${fileName || 'mandirsetu.pdf'}`;

  try {
    const res = await config({
      fileCache: true,
      appendExt: 'pdf',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
        description: 'Downloading PDF...',
        title: fileName || 'Mandirsetu',
        mime: 'application/pdf',
        mediaScannable: true,
      },
    }).fetch('GET', fileUrl);

    console.log('PDF downloaded successfully to:', res.path());
    Alert.alert('Download Complete', 'PDF has been downloaded successfully.');
  } catch (error) {
    console.error('Download failed:', error);
    Alert.alert(
      'Download Failed',
      'Something went wrong while downloading the PDF.',
    );
  }
};
