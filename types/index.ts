export type TicketType = {
  id: number;
  description: string;
  assigneeId: number;
  completed: boolean;
};

export type UserType = {
  id: number;
  name: string;
};
