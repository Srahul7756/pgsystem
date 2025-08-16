import {
  ACCESS_YOUR_PAST_BOOKINGS,
  CONTACT_US,
  CONTACT_US_DETAILS,
  FAQS,
  LEARN_MORE_QUERIES,
  MANAGE_NOTIFICATION,
  MY_BOOKINGS,
  PRIVACY_POLICY,
  PRIVACY_POLICY_DETAILS,
  PUSH_NOTIFICATIONS,
  TERMS_OF_USE,
  TERMS_OF_USE_DETAILS,
} from '@constants/Textkeys';

export const typeData = [
  {id: ' 1', lable: 'offline'},
  {id: ' 2', title: 'online'},
];

export const extraDataForPackages = [
  {
    primary: '#FC1891',
    secondary: '#883C9D',
    tertiary: '#ECC4DA',
  },
  {
    primary: '#00C4EE',
    secondary: '#014ABF',
    tertiary: '#DDF9FF',
  },
  {
    primary: '#FC1891',
    secondary: '#883C9D',
    tertiary: '#ECC4DA',
  },
  {
    primary: '#00C4EE',
    secondary: '#014ABF',
    tertiary: '#DDF9FF',
  },
];

export const profileList = [
  {
    title: MY_BOOKINGS,
    subTitle: ACCESS_YOUR_PAST_BOOKINGS,
    path: MY_BOOKINGS,
  },
  {
    title: PRIVACY_POLICY,
    subTitle: PRIVACY_POLICY_DETAILS,
    path: PRIVACY_POLICY,
  },
  {
    title: TERMS_OF_USE,
    subTitle: TERMS_OF_USE_DETAILS,
    path: TERMS_OF_USE,
  },
  {
    title: PUSH_NOTIFICATIONS,
    subTitle: MANAGE_NOTIFICATION,
    path: '',
    icon: true,
  },
  {
    title: FAQS,
    subTitle: LEARN_MORE_QUERIES,
    path: FAQS,
  },
  {
    title: CONTACT_US,
    subTitle: CONTACT_US_DETAILS,
    path: CONTACT_US,
  },
];
