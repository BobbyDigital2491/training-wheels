import React from "react";
import { List, ShowButton, EditButton, useTable, DeleteButton } from "@refinedev/antd";
import { Avatar, Button, Card, Col, Row, Space, Statistic, Table } from "antd";
import { BaseRecord } from "@refinedev/core";
import { authProvider } from "src/authProvider";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserOutlined } from "@ant-design/icons";

export default function ProjectList() {
  const { tableProps } = useTable();

  return (
    <>
  {/*Table*/}
  <Card title="Team Management">
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="avatar_url"
          title="User"
          render={(avatarUrl) => (
            <Avatar shape="circle" src={avatarUrl} size={50} icon={<UserOutlined />} />
          )} />
        <Table.Column dataIndex="username" title="Username" />
        <Table.Column dataIndex="role" title="Role" />
        <Table.Column dataIndex="full_name" title="Full Name" />
        <Table.Column dataIndex="updated_at" title="Joined" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )} />
      </Table>
    </Card></>
      
  );
}

/**
 * Same check can also be done via `<Authenticated />` component.
 * But we're using a server-side check for a better UX.
 */
export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!authenticated) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/profiles")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};
