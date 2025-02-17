export interface User {
  _id?: string;
  name: string;
  email: string;
  age: number;
  gender: "male" | "female" | "other";
  hobbies: string[];
  bio: string;
  isActive: boolean;
}

export interface UserFilters {
  search: string;
  gender: string;
  isActive: boolean | null;
}
