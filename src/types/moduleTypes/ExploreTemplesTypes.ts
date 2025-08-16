import {Dispatch, SetStateAction} from 'react';

export interface ExploreTemplesProps {
  // Define your page's prop types here
}

export type GodsList = {
  id: number;
  imageUrl: string;
  name: string;
};

export interface BookSevaModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedTemple: any;
  setSelectedTemple: Dispatch<SetStateAction<any>>;
}
