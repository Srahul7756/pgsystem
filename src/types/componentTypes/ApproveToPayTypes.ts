import {CollectMoneyTransactionList} from '@serviceTypes/reduxTypes';

export interface ApproveToPayProps {
  // Define your component's prop types here
  data: CollectMoneyTransactionList[];
  isApproveToPayVisible: boolean;
  setIsApproveToPayVisible: (visible: boolean) => void;
  onPressDecline: (CollectMoneyTransactionList) => void;
  onPressPay: (CollectMoneyTransactionList) => void;
}
