export interface Feed {
  id: number;
  userId: string;
  petName: string;
  title: string;
  img: string[];
  contents: string;
  createdAt: string;
}

export interface FeedComments {
  memberId: string;
  comment: string;
}