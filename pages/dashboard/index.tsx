import React from "react";
import { List, ShowButton, EditButton, useTable, DeleteButton } from "@refinedev/antd";
import { Card, Col, Row, Space, Statistic, Table } from "antd";
import { BaseRecord } from "@refinedev/core";
import { authProvider } from "src/authProvider";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";


export default function ProjectList() {
  const { tableProps } = useTable();

  return (
    <><Card title="Dashboard"><Row gutter={16}>
      <Col span={12}>
        <Statistic title="Active Users" value={3} />
      </Col>
      <Col span={12}>
        <Statistic title="Active Projects" value={112893} precision={2} />
      </Col>
      <Col span={12}>
        <Statistic title="Active Projects" value={112893} precision={2} />
      </Col>
      <Col span={12}>
        <Statistic title="Partnerships" value={112} />
      </Col>
    </Row>
    </Card>
    <br/>

    {/*Project Table */}
    <Row >
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
    <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
    </Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={4}>
    <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: 'red' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
    </Col>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      Col
    </Col>
  </Row>
    </>
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
          destination: `${redirectTo}?to=${encodeURIComponent("/dashboard")}`,
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
  