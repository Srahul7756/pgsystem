import {NavigationProp} from '@react-navigation/native';

export type Dispatch = (arg0: any) => any;
export type Navigation = NavigationProp<Record<string, object | undefined>>;

export interface FAQItems {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
}

export interface FAQListItems {
  id: string;
  name: string;
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

export interface FAQAccordionItemProps {
  item: {
    icon?: React.ElementType;
    title: string;
    content: string;
  };
  margin?: number;
}

export interface CategoryItemProps {
  item: {
    item: {
      category_id: string;
      id: string;
      name?: string;
      title?: string;
    };
  };
  keyword: string;
}
