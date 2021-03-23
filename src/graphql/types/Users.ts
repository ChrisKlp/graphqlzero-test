export type UserCompanyData = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type UserData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: UserCompanyData;
};

export type UsersData = {
  data: UserData[];
};

export type UsersQuery = {
  users: UsersData;
};
