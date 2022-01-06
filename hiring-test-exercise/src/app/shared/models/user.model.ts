export interface UserType {
  id: String;
  username: String;
}

export interface AuthResponseType {
  access_token: String;
  refresh_token: string;
  user: UserType
}