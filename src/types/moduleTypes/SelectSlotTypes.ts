import {Dispatch, SetStateAction} from 'react';

export interface SelectSlotModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSelect: (date: string) => void;
  data: {
    temple_id: number;
    quantity: number;
    darshan_id: number;
  };
}
