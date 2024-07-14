import {
  ModalForm,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { App } from "antd";
import React from "react";

type FieldType = {
  description?: string;
  assigneeId?: number;
};

type CreateTicketModalProps = {
  open: boolean;
  onClose: () => void;
  reloadTicketList?: () => void;
};

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  open,
  onClose,
  reloadTicketList,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const { message } = App.useApp();

  const handleSubmit = async (formData: FieldType) => {
    setLoading(true);

    try {
      const rawData = await fetch(`/api/ticket/create`, {
        method: "POST",
        body: JSON.stringify({
          description: formData.description,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      if (rawData.status === 200) {
        message.success("Create New Ticket Success!");
        onClose();
        reloadTicketList?.();
      }
    } catch (error) {
      message.error("Create New Ticket Fail!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalForm<FieldType>
      title="Create New Ticket"
      open={open}
      onFinish={handleSubmit}
      modalProps={{
        destroyOnClose: true,
        cancelText: "Cancel",
        okText: "Create",
        onCancel: onClose,
      }}
      loading={loading}
      width={500}
    >
      <ProFormTextArea
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: "Please input your ticket description",
          },
          {
            max: 255,
            message: "Your ticket description is over limit 255 characters",
          },
        ]}
      />
      <ProFormSelect
        name="assigneeId"
        label="Assign User"
        rules={[
          {
            required: true,
            message: "Please input your ticket description",
          },
          {
            max: 255,
            message: "Your ticket description is over limit 255 characters",
          },
        ]}
      />
    </ModalForm>
  );
};

export default CreateTicketModal;
