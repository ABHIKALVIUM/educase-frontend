
export interface UserData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  isAgency: boolean;
  profileImage: string;
}

export interface AppState {
  user: UserData;
  updateUser: (data: Partial<UserData>) => void;
  resetUser: () => void;
}
