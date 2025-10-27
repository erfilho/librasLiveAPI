export default interface User {
  uid?: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
}
