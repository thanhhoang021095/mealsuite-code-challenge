import { TicketType } from "@/types";
import { App } from "antd";
import React from "react";

export const useCompleteTicket = () => {
  const { message } = App.useApp();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleComplete = async (ticketId: number, isCompleted: boolean) => {
    setLoading(true);

    try {
      const rawData = await fetch(`/api/tickets/${ticketId}/complete`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          completed: isCompleted,
        }),
      });

      if (rawData.status === 200) {
        const data = (await rawData.json()) as TicketType;
        message.success(`Ticket is updated!`);

        return data;
      }
    } catch (error) {
      message.error("Update Ticket Status Fail!");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleComplete,
  };
};
