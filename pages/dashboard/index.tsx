import React from "react";
import { useTable } from "@refinedev/antd";
import { Card, Col, Row, Space, Statistic, Table, Timeline, Calendar, Checkbox, Form, Progress } from "antd";
import { authProvider } from "src/authProvider";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ArrowDownOutlined, ArrowUpOutlined, DashboardOutlined } from "@ant-design/icons";
import type { Dayjs } from 'dayjs';
import TimelineItem from "antd/lib/timeline/TimelineItem";
import { useState } from "react";

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
            title="Completed Projects"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Statistic
            title="Pending Projects"
            value={11.28}
            precision={2}
            valueStyle={{ color: 'red' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Statistic
            title="Sales"
            value={50}
            precision={2}
            valueStyle={{ color: 'red' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Col>
        <br/><br/><br/><br/><br/>

        {/*Progress Bar*/}
        <h3>Days until Bell Event</h3> 
        <Progress strokeLinecap="butt" percent={75} />

      {/*End of Stats*/}
      </Row>
      </Card>
      <br />
      {/*End of Stats*/}

       {/*Calendar Card*/}
      <Card title="Calendar">
      <Calendar onPanelChange={onPanelChange} />
      </Card>
      <br />


       {/*Timeline Card*/}
       <Card title="Timeline">
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8} lg={8}>
        <h1>Past</h1>
        <Timeline >
          <TimelineItem>Mercedez Meeting - Feb 15 2024</TimelineItem>
          <TimelineItem>Augmentique Meeting - Feb 14 2024</TimelineItem>
          <TimelineItem>Bell Meeting - Feb 27 2024</TimelineItem>
            </Timeline>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={8}>
        <h1>Upcoming</h1>
        <Timeline>
          <TimelineItem>Mercedez Meeting - Feb 15 2024</TimelineItem>
          <TimelineItem>Augmentique Meeting - Feb 14 2024</TimelineItem>
          <TimelineItem>Bell Meeting - Feb 27 2024</TimelineItem>
            </Timeline>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={8}>  
        <h1>Next Month</h1>
        <Timeline >
          <TimelineItem>Mercedez Meeting - Feb 15 2024</TimelineItem>
          <TimelineItem>Augmentique Meeting - Feb 14 2024</TimelineItem>
          <TimelineItem>Bell Meeting - Feb 27 2024</TimelineItem>
            </Timeline>
        </Col>
      </Row>
      </Card>
      <br/>

      {/*To Do List*/}
      
      <Card title="To Do List">
        <Row gutter={16}>
      <Col xs={24} sm={12} md={8} lg={8}>
      <Form.Item name="fieldA" valuePropName="checked" >
      <Checkbox name=""/> Bell Event Flyer
      </Form.Item>
      <Form.Item name="fieldA" valuePropName="checked" >
      <Checkbox name=""/> Budget Planning
      </Form.Item>
      <Form.Item name="fieldA" valuePropName="checked" >
      <Checkbox name=""/> Budget Planning
      </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
      <Form.Item name="fieldA" valuePropName="checked" >
      <Checkbox name=""/> Augmentique Test Flight
      </Form.Item>
      <Form.Item name="fieldA" valuePropName="checked" >
      <Checkbox name=""/> Budget Planning
      </Form.Item>
     </Col>

     <Col xs={24} sm={12} md={8} lg={8}>
     <Form.Item name="fieldA" valuePropName="checked" >
      <Checkbox name=""/> Budget Planning
      </Form.Item>
      <Form.Item name="fieldA" valuePropName="checked" >
      <Checkbox name=""/> Budget Planning
      </Form.Item>
     </Col>

     </Row>
        </Card>
    
     
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
