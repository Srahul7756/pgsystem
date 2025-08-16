export const MobileNumberRegEx: RegExp = /^[6-9]\d{9}$/;
export const CreditCardRegEx: RegExp = /^\d{16}$/;
export const MpinRegex: RegExp = /^\d{4}$/;
export const NumberOnlyRegex: RegExp = /[^0-9]/g;
export const DecimalOnlyRegex: RegExp = /[^0-9.]/g;
export const EmailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const AlphaNumericRegex: RegExp = /[^a-zA-Z0-9]/g;
export const AmountRegex: RegExp = /\B(?=(\d{2})+(?!\d))/g;
export const ContactRegex = /^[^a-zA-Z]/;
export const ValidNameRegex = /[^a-zA-Z\s]/g;
export const AccountNoRegex = /^[0-9]{10,20}$/;
export const IfscRegex = /^[A-Z|a-z]{4}0([\d|a-z|A-Z]){6}$/;
export const BeneficiaryRegex = /^[a-zA-Z0-9 ]*$/;
export const UpiIdRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z]+)$/;
export const NameRegex: RegExp =
  /^([A-Za-z-.]{1,})( [A-Za-z-.]{1,})?( [A-Za-z-.]{2,})?$/;
export const FullNameRegex: RegExp = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;