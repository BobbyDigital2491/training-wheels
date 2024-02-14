import React from "react";
import { useTable } from "@refinedev/antd";
import { Card, Col, Row, Space, Statistic, Table, Timeline, Calendar } from "antd";
import { authProvider } from "src/authProvider";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import type { Dayjs } from 'dayjs';
import TimelineItem from "antd/lib/timeline/TimelineItem";


export default function ProjectList() {
  const { tableProps } = useTable();

  const onPanelChange = (value: Dayjs, mode: any) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <Card title="Dashboard">
        
        {/*Team Card*/}
        <Card title="Team">
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Statistic title="Active Users" value={3} />
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Statistic title="Active Projects" value={5} />
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Statistic title="Pending Projects" value={20} />
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Statistic title="Partnerships" value={112} />
        </Col>
      </Row>
      </Card>
      <br />
    
     {/*Stat Cards*/}
      <Card title="Stats">
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Statistic
            title="Completed"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Statistic
            title="Pending"
            value={11.28}
            precision={2}
            valueStyle={{ color: 'red' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: 'red' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Col>
      </Row>
      </Card>
      <br />

       {/*Calendar Card*/}
      <Card title="Calendar">
      <Calendar onPanelChange={onPanelChange} />
      </Card>
      <br />


       {/*Timeline Card*/}
       <Card title="Timeline">
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Statistic
            title="Completed"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Statistic
            title="Pending"
            value={11.28}
            precision={2}
            valueStyle={{ color: 'red' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Timeline>
          <TimelineItem>Mercedez Meeting - Feb 15 2024</TimelineItem>
          <TimelineItem>Augmentique Meeting - Feb 14 2024</TimelineItem>
          <TimelineItem>Bell Meeting - Feb 27 2024</TimelineItem>
            </Timeline>
        </Col>
      </Row>
      </Card>
      {/*New Card*/}
    
     
    </Card>
  );
}

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
