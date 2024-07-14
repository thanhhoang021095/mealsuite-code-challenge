import { useUserContext } from "@/context/useUserContext";
import { useGetUserList } from "@/hooks/useGetUserList";
import { TicketType } from "@/types";
import { ModalForm, ProFormSelect } from "@ant-design/pro-components";
import { App } from "antd";
import React from "react";

type FieldType = {
  assigneeId?: number;
};

type AssignTicketModalProps = {
  open: boolean;
  onClose: () => void;
  ticketData: TicketType;
  onUpdateTicketInfo: React.Dispatch<React.SetStateAction<TicketType | null>>;
};

const AssignTicketModal: React.FC<AssignTicketModalProps> = ({
  open,
  onClose,
  ticketData,
  onUpdateTicketInfo,
}) => {
  useGetUserList();

  const [loading, setLoading] = React.useState<boolean>(false);
  const userList = useUserContext((state) => state.userList);

  const { message } = App.useApp();

  const handleSubmit = async (formData: FieldType) => {
    setLoading(true);

    try {
      const rawData = await fetch(
        `/api/tickets/${ticketData.id}/assign/${formData.assigneeId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (rawData.status === 200) {
        message.success("Assign Ticket Success!");

        onClose();

        const data = (await rawData.json()) as TicketType;
        onUpdateTicketInfo(data);
      }
    } catch (error) {
      message.error("Update Ticket Fail!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalForm<FieldType>
      title="Assign User For Ticket"
      open={open}
      onFinish={handleSubmit}
      modalProps={{
        destroyOnClose: true,
        cancelText: "Cancel",
        okText: "Assign",
        onCancel: onClose,
        styles: {
          footer: {
            paddingTop: 20,
          },
        },
      }}
      loading={loading}
      width={500}
    >
      <ProFormSelect
        name="assigneeId"
        label="Assignee User"
        options={userList.map(({ id, name }) => ({
          value: id,
          label: name,
        }))}
      />
    </ModalForm>
  );
};

export default AssignTicketModal;
