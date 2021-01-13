import { Role } from './constant';

export class User {
constructor(
    public userName?: string,
    public accessToken?: string,
    public role?: Role
  ) { }
}
