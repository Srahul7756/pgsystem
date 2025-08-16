import {
  CollectMoneyTransactionList,
  FavoriteBeneficiaryItem,
  UPIAccount,
} from '@serviceTypes/reduxTypes';

export interface PaymentFormProps {
  headerTitle?: string;
  buttonTitle?: string;
  mcCode: string;
  recipientName: string;
  recipientImageUri: string;
  recipientUpi: string;
  onSubmit: (amount: string, note: string) => void;
  isScanToPay?: boolean;
  isContact?: boolean;
  isFromAccountSelected?: boolean;
  fromAccount?: UPIAccount;
  toAccount?: UPIAccount;
  isSelfTransfer?: boolean;
  isCollectRequest?: boolean;
  selectedBenificiary?: FavoriteBeneficiaryItem;
  expiry?: string;
  amount?: string;
  currency?: string;
  isBankTransfer?: boolean;
  beneficiary_account_no?: string;
  Ifsc?: string;
  qrCodeData?: string;
  isMandate?: string;
  remark?: string;
  isApproveToPay?: boolean;
  /** Required if isApproveToPay is true */
  collectMoneyRequest?: CollectMoneyTransactionList;
}
