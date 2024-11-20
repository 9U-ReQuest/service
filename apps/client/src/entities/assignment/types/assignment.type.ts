export type AssignmentCardType = {
  id: string;
  company: {
    name: string;
    category: string;
    logo: string;
  };
  title: string;
  date: string;
  isBookmarked?: boolean;
};

export type AssingmentCardList = AssignmentCardType[];
