"use client";

import { useCompleteTicket } from "@/hooks/useCompleteTicket";
import { useGetTicketInfo } from "@/hooks/useGetTicketInfo";
import { useUnassignTicket } from "@/hooks/useUnassignTicket";
import { useGetUserInfo } from "@/hooks/userGetUserInfo";
import CompleteStatusTag from "@/src/components/CompleteStatusTag";
import AssignTicketModal from "@/src/components/Modals/AssignTicketModal";
import PageContainer from "@/src/components/PageContainer";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Descriptions, DescriptionsProps, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

type TicketDetailProps = {};

const TicketDetail: React.FC<TicketDetailProps> = () => {
  const router = useRouter();

  const { ticket, loading: loadingTicket, setTicketInfo } = useGetTicketInfo();
  const { handleComplete, loading: loadingComplete } = useCompleteTicket();
  const { user, loading: loadingUser } = useGetUserInfo(ticket?.assigneeId);
  const { handleUnassignTicket } = useUnassignTicket();

  const [openUpdateModal, setOpenUpdateModal] = React.useState<boolean>(false);

  const isAssigned = ticket && ticket?.assigneeId >= 0;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "ID",
      children: ticket?.id,
    },
    {
      key: "2",
      label: "Description",
      children: ticket?.description,
    },
    {
      key: "3",
      label: "Assignee ID",
      children: user?.id === ticket?.assigneeId ? user?.name : "-",
    },
    {
      key: "4",
      label: "Completed Status",
      children: <CompleteStatusTag completed={ticket?.completed || false} />,
    },
  ];

  const handleOpenUpdateModal = async () => {
    if (isAssigned && ticket) {
      const ticketData = await handleUnassignTicket(ticket.id);
      setTicketInfo(ticketData);
    }

    setOpenUpdateModal(true);
  };

  const handleClose = () => setOpenUpdateModal(false);

  const handleCompleteTicket = async () => {
    if (!ticket) return;

    const ticketData = await handleComplete(ticket.id, !ticket.completed);
    ticketData && setTicketInfo(ticketData);
  };

  const returnListPage = () => router.back();
  const extraContent = React.useMemo(
    () => (
      <Button type="link" onClick={returnListPage} icon={<ArrowLeftOutlined />}>
        Return
      </Button>
    ),
    []
  );
  if (!ticket) return null;

  return (
    <PageContainer extra={extraContent}>
      {loadingTicket || loadingUser || loadingComplete ? (
        <Spin />
      ) : (
        <Descriptions
          extra={
            <Space>
              <Button type="primary" onClick={handleOpenUpdateModal}>
                {isAssigned ? "Unassign" : "Assign"}
              </Button>
              <Button
                type="primary"
                ghost
                style={{
                  color: ticket?.completed ? "#52c41a" : "#EB2F96",
                  borderColor: ticket?.completed ? "#52c41a" : "#EB2F96",
                }}
                onClick={handleCompleteTicket}
              >
                {ticket?.completed ? "Complete" : "Incomplete"}
              </Button>
            </Space>
          }
          title="Ticket Info"
          items={items}
          column={4}
          layout="vertical"
        />
      )}

      <AssignTicketModal
        open={openUpdateModal}
        onClose={handleClose}
        onUpdateTicketInfo={setTicketInfo}
        ticketData={ticket}
      />
    </PageContainer>
  );
};

export default TicketDetail;
