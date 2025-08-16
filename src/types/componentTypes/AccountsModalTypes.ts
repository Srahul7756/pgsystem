import {UPIAccount} from '../serviceTypes/reduxTypes';

export interface AccountsModalProps {
  accountsModal: boolean;
  setAccountsModal: (accountsModal: boolean) => void;
  accountsData: Array<UPIAccount>;
  onAccountSelect: (account: UPIAccount) => void;
  isChoose?: boolean;
  selectedAccount: UPIAccount;
}

interface Account {
  accountNumber: string;
  accountType: string;
}
