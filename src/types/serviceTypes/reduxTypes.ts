import {TransactionType} from './requestTypes';

export type AccountData = {
  account_no: string;
  balance: number;
  branch: string;
  branch_name: string;
  closing_date: string;
  default: boolean;
  digital_account_no: string;
  id: number;
  ifsc_code: string;
  maturity_date: string;
  open_date: string;
  type: string;
  type_label: string;
};

export type AccountsInit = {
  account: Record<string, unknown>;
  accountData: AccountData[];
  noAccount: string;
  isAccountError: boolean;
  isAccountLoading: boolean;
  visible: boolean;
};

interface profileInitType {
  profile_pic: string;
  otp_preference: boolean;
  updateProfileData: any;
}

export const profileInit: profileInitType = {
  profile_pic: '',
  otp_preference: false,
  updateProfileData: {},
};

interface AutoPayDetail {
  key: string;
  value: string;
}

interface AutoPayTransaction {
  title: string;
  subtitle: string;
  amount: string;
}

export interface AutoPayBillDetails {
  title: string;
  subtitle: string;
  amount: number;
  icon: string;
  status: string;
  auto_pay_registration_id: string;
  auto_pay_details: AutoPayDetail[];
  auto_pay_transactions: AutoPayTransaction[];
}

export interface AutoPayBill {
  amount: number;
  auto_pay_registration_id: string;
  bill_name: string;
  icon: string;
  status: string;
  subtitle: string;
  title: string;
}
interface ActionButton {
  label: string;
  type: 'external' | 'in_app';
  target: string;
  parameters: any | null;
}

interface NotificationParameters {
  content: string;
  image: string;
  icon: string | null;
  action_button: ActionButton;
}

interface NotificationAction {
  type: 'in_app' | 'external';
  target: string;
  parameters: NotificationParameters;
}

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  datetime: string; // Can be converted to Date if needed
  read_status: boolean | null;
  action: NotificationAction;
}

export interface NotificationState {
  notificationData: NotificationItem[];
  remoteNotificationId: string;
  remoteNotificationData: NotificationItem[];
  notificationCountData: Record<string, number>;
}
export interface FAQListItems {
  id: string;
  name: string;
  isActive: boolean;
}
export interface FAQItems {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
}

export interface FAQsDetails {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
}

export interface FAQDetailItems {
  faqDetail: Array<FAQItems>;
}

export interface CredsAllowed {
  ID: string;
  CredID: string;
  type: string;
  subType: string;
  dType: string;
  dLength: string;
  data?: {
    code: string;
    encryptedBase64String: string;
    ki: string;
  };
}

export interface UPIAccount {
  MobRegFormat: string;
  VirtualId: string;
  MobileNumber: string;
  BankName: string;
  AccountType: string;
  AccountNumber: string;
  MaskedAccountNumber: string;
  CustomerName: string;
  Ifsc: string;
  Mmid: string;
  Aeba: string;
  Mbeba: string;
  IsDefault: string;
  Status: string;
  CredsAllowed: CredsAllowed[];
  rawBalance?: string;
  convertedBalance?: string;
  lastUpdated?: string;
  balanceVisible?: boolean;
}

export interface UPIAccountApiResponse {
  ResponseCode: string;
  ResponseMessage: string;
  Response: UPIAccount[];
}

export interface UPIAccountsState {
  accounts: UPIAccount[];
  selectedAccount: UPIAccount | null;
}

export interface FinUpiDataState {
  AppVersion: string;
  SMSKey: string;
  ApplicationId: string;
  MobileNumber: string;
  Vid: string;
  CAPABILITY: string;
  location: string;
  geoCode: string;
  payerSeqNum: number;
  transactionId: string;
  BankDomainName: string;
  ip: string;
  name: string;
  PspPin: string;
  accountNumber: string;
  ifsc: string;
  payeeName: string;
}

export interface Transaction {
  amount: string;
  payer_name: string;
  payer_upi: string;
  recipient_name: string;
  recipient_upi: string;
  transaction_datetime: string;
  transaction_id: string;
  type: string;
  utr: string | null;
  status: string;
  expense_category_icon: string;
  expense_category_name: string;
}

export interface CategoryExpense {
  expense_category_icon: string;
  expense_category_name: string;
  total_spending: number;
}

export interface TransactionState {
  allTransactions: Transaction[];
  categoryExpenses: CategoryExpense[];
  totalCount: number;
  monthly_budget?: number | null;
  spent_amount?: number | null;
  spent_percentage?: number | null;
}

export type SecurityQuestionType = Array<{
  Id: string;
  Question: string;
}>;

//{"ifsc": "AUBL",
// "iin": "608088",
// "logo": "https://kipl-fintech-dev.s3.ap-south-1.amazonaws.com/product/images/AU-Bank-new-1744205871.png",
//  "name": "AU Small Finance Bank"}
export interface Bank {
  VersionSupported: {
    Version: {
      no: number;
      noSpecified: boolean;
      description: number;
      descriptionSpecified: boolean;
      mandatory: number;
      mandatorySpecified: boolean;
    };
  };
  logo: string;
  name: string;
  iin: string;
  ifsc: string;
  active: string;
  activeSpecified: boolean;
  url: string;
  spocName: string;
  spocEmail: string;
  spocPhone: string;
  prods: string;
  lastModifedTs: string;
  mobRegFormat: string;
}

export interface UpiBankList {
  ResponseCode: string;
  ResponseMessage: string;
  featured_banks: Array<Bank>;
  all_banks: Array<Bank>;
}

export type BillData = Array<{
  customer_name: string;
  consumer_no: string;
  amount: string;
  due_date: string | null;
  mode: string;
  category_id: number;
  service_provider_id: number;
  service_provider_name: string;
  biller_id: string;
  parameters: Array<{Name: string; Value: string}>;
  operator_logo: string;
  status: string | null;
}>;
export interface Beneficiary {
  SerialNumber: number;
  MobileNumber: string;
  Name: string;
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
}

export interface BeneficiaryState {
  beneficiaries: Beneficiary[];
}
export interface FavoriteBeneficiaryItem {
  AadharNumber: string;
  AccountNumber: string;
  AccountType?: string;
  Amount: string;
  BeneficiaryMobileNumber: string;
  FavoriteType: number;
  FavoriteVirtualAddress: string;
  Ifsc: string;
  Iin: string;
  IsBlocked: string; // "Y" | "N"
  Mmid: string;
  MobileNumber: string;
  Name: string;
  SerialNumber: number;
  TransactionType: number; // 0 = UPI, 1 = AccountNo
}

export interface ImageData {
  id: number;
  image: string;
  url: string;
  status: string;
}

export interface ImagePositionData {
  home_top: Array<ImageData>;
  home_bottom: Array<ImageData>;
}

export interface BannersState {
  ads: ImagePositionData;
}

export interface RecentTransfer {
  amount: string;
  beneficiary_account_no: string;
  from_account_id: string;
  ifsc: string;
  mc_code: string;
  profile_pic: string;
  recipient_image_url: string;
  recipient_name: string;
  recipient_upi: string;
  source: TransactionType;
  status: string;
  to_account_id: string;
  transaction_datetime: string;
  transaction_id: string;
  type: string;
  utr: string;
}

export interface RecentTransfersState {
  records: Array<RecentTransfer>;
  totalCount: number;
}

export interface CreateUserType {
  name: string;
  email: string;
  mobile: string;
  question_id: string;
  answer: string;
}

export interface SecurityQuestion {
  id: string;
  question: string;
}

export type SecurityQuestionsArray = SecurityQuestion[];

export type CollectMoneyTransactionList = {
  TransactionId: string;
  MessageId: string;
  CustomerRefId: string;
  PayerAddress: string;
  PayerName: string;
  PayeeAddress: string;
  PayeeName: string;
  ExpireOn: string;
  Amount: string;
  MinimumAmount: string;
  Note: string;
  ResponseCode: string;
};

export interface CollectMoneyTransactionListResponse {
  ResponseCode: string;
  ResponseMessage: string;
  Response: Array<CollectMoneyTransactionList>;
}

export interface ExpenseCategory {
  id: number;
  icon: string;
  name: string;
  status: string;
  isModificationAllowed: boolean;
}

export interface ExpenseCategoriesState {
  expenseCategoriesData: ExpenseCategory[];
  loading: boolean;
  error: string | null;
}

export interface CategoryIconsState {
  categoryIconsData: CategoryIcons[];
  error: string | null;
  loading: boolean;
}

export interface CategoryIcons {
  id: number;
  icon: string;
  mcc_code_id: string;
}
