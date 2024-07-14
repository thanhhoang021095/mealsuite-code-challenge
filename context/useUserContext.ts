import { UserType } from "@/types";
import { create } from "zustand";

type UserState = {
  userList: UserType[];
};

type UserAction = {
  setUserList: (payload: UserType[]) => void;
};

export const useUserContext = create<UserState & UserAction>((set) => ({
  userList: [],

  setUserList: (payload: UserType[]) =>
    set(() => ({
      userList: payload,
    })),
}));
