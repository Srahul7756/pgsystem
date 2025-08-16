import {Dispatch} from '@utils/commonTypes';
import {CredsAllowed} from './reduxTypes';

export interface LoginType {
  username: string;
}

export interface InitiateMpinPayload {
  current_mpin: string;
  new_mpin: string;
}

export interface ResendPasswordOtpPayload {
  update_type: string;
}

export type InitiateMpinChangeApi = (
  payload: InitiateMpinPayload,
  handleSubmit?: (data: any) => void,
  username?: string,
) => (dispatch: Dispatch) => Promise<void>;

export interface completeMpinPayload {
  key: string;
}

export interface MpinPayload {
  mpin: string;
}

export interface RegisterUPIUserParams {
  VirtualId: string;
  MobileNumber: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  DateOfBirth: string;
  Gender: string;
  Email: string;
  AadhaarNumber: string;
  GcmToken: string;
  PspPin: string;
  AppVersion: string;
  AppOs: string;
  DeviceId: string;
  Imei: string;
  SecurityQuestionId: number;
  SecurityAnswer: string;
}

export interface GetBenificiaryParams {
  SerialNumber?: number;
  MobileNumber: string;
  TransactionType?: number;
  FavoriteVirtualAddress?: string | null;
  FavoriteType?: number;
  AccountNumber?: string | null;
  Ifsc?: string | null;
  BeneficiaryMobileNumber?: string | null;
  Mmid?: string | null;
  AadharNumber?: string | null;
  Iin?: string | null;
  Amount?: number | null;
  Name?: string | null;
}
export interface AddBankAccountParams {
  MobRegFormat: string;
  ID: string;
  VirtualId: string;
  MobileNumber: string;
  BankName: string;
  AccountType: string;
  AccountNumber: string;
  CustomerName: string;
  Ifsc: string;
  Mmid: string;
  Aeba: string;
  Mbeba: string;
  AccountBalance: string;
  BalanceButtonvisisble: boolean;
  Balancevisisble: boolean;
  SwitchAndroid: boolean;
  SwitchIOS: boolean;
  CredsAllowed: Array<CredsAllowed>;
}

export interface DeRegisterPayload {
  VirtualId: string;
  MobileNumber: string;
  AccountNumber: string;
  Ifsc: string;
  Status: number;
}

export interface PostTransactionDataRawDataType {
  TransactionId: string;
  TransactionDate: string;
  TransactionType: string;
  FlowType: string;
  TransactionFlow: string;
  PayerAddress: string;
  PayerName: string;
  PayeeAddress: string;
  PayeeName: string;
  Amount: string;
  Note: string;
  PayerType?: string;
  PayeeType?: string;
  MessageId?: string;
  ActualTxnDate: string;
  PayerCode?: string;
  PayeeCode?: string;
  ComplaintStatus?: string;
  PayerAccountNumber?: string;
  PayeeAccountNumber?: string;
  ResponseCode: string;
  ResponseMessage: string;
  Response: string;
  CustomerRefNo: string;
  ApprovalNumber: string;
  ReferenceId: string;
  TimeStamp: string;
  from_account_id?: string;
  to_account_id?: string;
  beneficiary_account_no?: string;
  Ifsc?: string;
}

export type TransactionType = 'UPI' | 'BANK_TRANSFER' | 'SELF_TRANSFER';

export interface PostTransactionDataType {
  type: TransactionType;
  raw_data: PostTransactionDataRawDataType;
}

export type CollectRequestPayload = {
  TransactionType: string;
  CollectExpiryAfter: string;
  IsPreApproved: boolean;
  Amount: string;
  PayerDeviceDetails: {
    LOCATION: string;
    APP: string;
    OS: string;
    IP: string;
    ID: string;
    CAPABILITY: string;
    TYPE: string;
    MOBILE: string;
    GEOCODE: string;
  };
  PaymentTxn: {
    purpose: string;
    initiationMode: string;
  };
  PayerAccountDetails: {
    AddressType: number;
    AccountType: string;
    Ifsc: string;
    AccountNumber: string;
  };
  PayeeDetails: Array<{
    PayeeDeviceDetails: {
      LOCATION: string;
      APP: string;
      OS: string;
      IP: string;
      ID: string;
      CAPABILITY: string;
      TYPE: string;
      MOBILE: string;
      GEOCODE: string;
    };
    Type: string;
    Address: string;
    Amount: string;
    SequenceNumber: string;
    PayeeAccountDetails: {
      AddressType: number;
      AccountType: string;
      Ifsc: string;
      AccountNumber: string;
    };
    Code: string;
    Name: string;
  }>;
  PayerDetails: {
    Type: string;
    Address: string;
    SequenceNumber: string;
    Code: string;
    Name: string;
  };
  IsCollectAccepted: boolean;
  Note: string;
  MinAmount: string;
};

export interface AddFavoriteBeneficiaryPayload {
  MobileNumber: string;
  TransactionType: number;
  FavoriteVirtualAddress: string;
  FavoriteType: number;
  AccountNumber: string;
  Ifsc: string;
  BeneficiaryMobileNumber: string;
  Mmid: string;
  AadharNumber: string;
  Iin: string;
  Amount: string;
  Name: string;
}

export interface BeneficiaryPayload {
  MobileNumber: string;
  SerialNumber?: string | number;
}
export interface getHelpRequestType {
  transaction_id: string;
  category_id: string;
  complaint: string;
  attachments: Array<any>;
}

export interface SecurityQuestion {
  question_id: number;
  answer: string;
}

export interface AddCategoryTypes {
  name: string;
  icon: string;
  mcc_code_id: string;
}
