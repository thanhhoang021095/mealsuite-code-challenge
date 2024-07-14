import { getDisplayCompleteStatus } from "@/utils/common";
import { Tag } from "antd";
import React from "react";

type CompleteStatusTagProps = {
  completed: boolean;
};

const CompleteStatusTag: React.FC<CompleteStatusTagProps> = ({ completed }) => {
  return (
    <Tag color={completed ? "green" : "blue"}>
      {getDisplayCompleteStatus(completed).toUpperCase()}
    </Tag>
  );
};

export default CompleteStatusTag;
