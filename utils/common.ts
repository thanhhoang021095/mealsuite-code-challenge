import { UserType } from "@/types";

export const getDisplayCompleteStatus = (isCompleted: boolean) =>
  isCompleted ? "done" : "progressing";

export const mapUserList = (userList: UserType[]) => {
  return userList.reduce((acc, userItem) => {
    acc[userItem.id] = userItem;
    return acc;
  }, {} as Record<string, UserType>);
};
