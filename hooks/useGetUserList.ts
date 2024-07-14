import { useUserContext } from "@/context/useUserContext";
import { UserType } from "@/types";
import { mapUserList } from "@/utils/common";
import { App } from "antd";
import React from "react";

export const useGetUserList = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const setUserList = useUserContext((state) => state.setUserList);
  const userList = useUserContext((state) => state.userList);

  const { message } = App.useApp();

  const getUserList = async () => {
    setLoading(true);

    try {
      const rawData = await fetch(`/api/users`);

      if (rawData.status === 200) {
        const data = (await rawData.json()) as UserType[];

        setUserList(data);
        return {
          data,
          total: data.length,
          success: true,
        };
      }

      return {
        data: [],
        total: 0,
        success: false,
      };
    } catch (error) {
      message.error("Get Ticket List Fail!");

      return {
        data: [],
        total: 0,
        success: false,
      };
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!userList.length) getUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userList]);

  return {
    userMap: mapUserList(userList),
    loading,
  };
};
