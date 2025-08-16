export interface FaQsProps {
  data: FAQItem[];
}

export type FAQItem = {
  id: number;
  category_name: string;
  title: string;
  content: string;
  status: string;
};

export type GroupedFAQs = {
  category: string;
  data: FAQItem[];
};
