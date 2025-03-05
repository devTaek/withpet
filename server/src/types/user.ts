interface User {
  userName: string;
}

export interface Feed {
  feed_id: number;
  user_id: string;
  pet_name: string;
  title: string;
  imgs: string[];
  contents: string;
  // comments: { memberId: string; comment: string }[];
  // like: number;
  created_at: string;
}