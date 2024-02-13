import React from "react";
import { List, ShowButton, EditButton, useTable, DeleteButton } from "@refinedev/antd";
import { Avatar, Input, Space, Table } from "antd";
import { BaseRecord } from "@refinedev/core";
import { authProvider } from "src/authProvider";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function CategoryList() {
  const { tableProps } = useTable();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="tasks" title="Tasks" />
        <Table.Column dataIndex="posts" title="Posts" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

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
          destination: `${redirectTo}?to=${encodeURIComponent("/categories")}`,
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
  