import { App } from "antd";

export const useUnassignTicket = () => {
  const { message } = App.useApp();

  const handleUnassignTicket = async (ticketId: number) => {
    try {
      const rawData = await fetch(`/api/tickets/${ticketId}/unassign`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      });

      if (rawData.status === 200) {
        message.success("Unassign Ticket Success!");

        const data = await rawData.json();
        return data;
      }
    } catch (error) {
      message.error("Unassign Ticket Fail!");
    }
  };

  return {
    handleUnassignTicket,
  };
};
