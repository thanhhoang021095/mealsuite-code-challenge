"use client";

import { TicketType } from "@/types";
import { App } from "antd";
import React from "react";
import { useParams } from "next/navigation";

export const useGetTicketInfo = () => {
  const { id: ticketId } = useParams<{ id: string }>();

  const [ticketInfo, setTicketInfo] = React.useState<TicketType | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { message } = App.useApp();

  const getTicketInfo = async (id: string) => {
    setLoading(true);
    try {
      const rawData = await fetch(`/api/tickets/${id}`);
      if (rawData.status === 200) {
        const data = await rawData.json();
        setTicketInfo(data);
      }
    } catch (error) {
      message.error("Get Ticket Info Fail!");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    ticketId && getTicketInfo(ticketId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId]);

  return {
    ticket: ticketInfo,
    setTicketInfo,
    loading,
  };
};
