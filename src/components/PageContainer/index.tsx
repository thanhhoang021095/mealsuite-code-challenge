"use client";

import { Card, Flex, Layout } from "antd";
import React from "react";

const { Content } = Layout;

const layoutStyle: React.CSSProperties = {
  borderRadius: 8,
  overflow: "hidden",
  margin: "auto",
  width: "100%",
  maxWidth: "calc(100% - 64px)",
  height: "100%",
  maxHeight: "calc(100% - 64px)",
  marginTop: "32px",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
};

type PageContainerProps = {
  extra?: React.ReactNode;
} & React.PropsWithChildren;

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  extra = null,
}) => {
  return (
    <Layout style={layoutStyle}>
      <Content style={contentStyle}>
        <Card
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Flex>{extra}</Flex>
          {children}
        </Card>
      </Content>
    </Layout>
  );
};

export default PageContainer;
