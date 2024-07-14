"use client";

import { UserType } from "@/types";
import { App } from "antd";
import React from "react";

export const useGetUserInfo = (assigneeId?: number) => {
  const [userInfo, setUserInfo] = React.useState<UserType | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { message } = App.useApp();

  const getUserInfo = async (id: number) => {
    if (id < 0) return;
    
    setLoading(true);
    
    try {
      const rawData = await fetch(`/api/users/${id}`);
      if (rawData.status === 200) {
        const data = await rawData.json();
        setUserInfo(data);
      }
    } catch (error) {
      message.error("Get User Info Fail!");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    assigneeId && getUserInfo(assigneeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assigneeId]);

  return {
    user: userInfo,
    getUserInfo,
    loading,
  };
};
