"use client";

import { useGetTicketList } from "@/hooks/useGetTicketList";
import CompleteStatusTag from "@/src/components/CompleteStatusTag";
import PageContainer from "@/src/components/PageContainer";
import { TicketType } from "@/types";
import { Button, Flex } from "antd";
import Link from "next/link";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import CreateTicketModal from "@/src/components/Modals/CreateTicketModal";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { useSearchParams } from "next/navigation";
import { useGetUserList } from "@/hooks/useGetUserList";

type TicketListProps = {};

const TicketList: React.FC<TicketListProps> = () => {
  const [openCreateModal, setOpenCreateModal] = React.useState<boolean>(false);
  const tableRef = React.useRef<ActionType>();
  const searchParams = useSearchParams();
  const completedValue = searchParams.get("completed");

  const { getTicketList } = useGetTicketList();
  const { userMap } = useGetUserList();

  const columns: ProColumns<TicketType>[] = React.useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        hideInSearch: true,
      },
      {
        title: "Description",
        dataIndex: "description",
        hideInSearch: true,
        key: "description",
      },
      {
        title: "Assignee ID",
        dataIndex: "assigneeId",
        key: "assigneeId",
        hideInSearch: true,
        renderText: (_, { assigneeId }) => userMap[assigneeId]?.name,
      },
      {
        title: "Completed status",
        key: "completed",
        dataIndex: "completed",
        valueType: "select",
        fieldProps: {
          defaultValue: completedValue,
        },
        valueEnum: {
          all: {
            text: "All",
          },
          done: {
            text: "Done",
            status: "Success",
          },
          progressing: {
            text: "Progressing",
            status: "Processing",
          },
        },
        render: (_, { completed }) => (
          <CompleteStatusTag completed={completed} />
        ),
      },
      {
        title: "Action",
        hideInSearch: true,
        key: "option",
        valueType: "option",
        render: (_, { id }) => <Link href={`/tickets/${id}`}>Detail</Link>,
      },
    ],
    [completedValue, userMap]
  );

  const handleCreateTicket = () => setOpenCreateModal(true);

  const handleCloseModal = () => setOpenCreateModal(false);

  return (
    <PageContainer>
      <Flex gap={24} vertical>
        <ProTable<TicketType>
          options={{
            fullScreen: true,
          }}
          search={{
            searchText: "Apply",
            layout: "vertical",
            defaultCollapsed: false,
          }}
          form={{
            syncToUrl: true,
          }}
          actionRef={tableRef}
          columns={columns}
          request={getTicketList}
          rowKey={(r) => r.id}
          toolbar={{
            actions: [
              <Button
                key="button"
                icon={<PlusOutlined />}
                onClick={handleCreateTicket}
                type="primary"
              >
                Create
              </Button>,
            ],
          }}
        />
      </Flex>

      <CreateTicketModal
        open={openCreateModal}
        onClose={handleCloseModal}
        reloadTicketList={tableRef.current?.reload}
      />
    </PageContainer>
  );
};

export default TicketList;
