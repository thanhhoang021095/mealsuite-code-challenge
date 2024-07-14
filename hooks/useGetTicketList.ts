import { TicketType } from "@/types";
import { ParamsType } from "@ant-design/pro-components";
import { App } from "antd";
import React from "react";

export const useGetTicketList = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const { message } = App.useApp();

  const getTicketList = async (params: ParamsType) => {
    const { completed } = params;

    let searchUrl = "";
    if (completed) searchUrl += `?completed=${completed}`;

    setLoading(true);

    try {
      const rawData = await fetch(`/api/tickets` + searchUrl);

      if (rawData.status === 200) {
        const data = (await rawData.json()) as TicketType[];

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

  return {
    getTicketList,
    loading,
  };
};
