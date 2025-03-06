export interface Feed {
  id: number;
  userId: string;
  petName: string;
  title: string;
  img: string[];
  content: string;
  // comments: { memberId: string; comment: string }[];
  // like: number;
  createdAt: string;
}