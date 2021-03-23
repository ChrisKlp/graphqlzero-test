export type PostUserData = {
  name: string;
};

export type PostCommentData = {
  id: string;
  name: string;
  email: string;
  body: string;
};

export type PostCommentsData = {
  data: PostCommentData[];
};

export type PostData = {
  id: string;
  title: string;
  body: string;
  user: PostUserData;
  comments: PostCommentsData;
};

export type PostQuery = {
  post: PostData;
};

export type PostVariables = {
  id: string;
};
