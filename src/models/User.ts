// src/models/User.ts
export type UserType = 'Investor' | 'Company' | 'Admin' | 'uknown';

export default class User {
  constructor(
    public uid: string,
    public name: string,
    public email: string,
    public userType: string
  ) {}

  toJSON() {
    return {
      uid: this.uid,
      name: this.name,
      email: this.email,
      userType: this.userType,
    };
  }

  userToJSON() {
    return this.toJSON();
  }

  static fromJSON(json: any): User {
    return new User(json.uid, json.name, json.email, json.userType);
  }
}
