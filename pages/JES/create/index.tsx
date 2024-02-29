import React from "react";
import { DatePicker, Form, Input, InputNumber, Mentions, Select, Cascader, TreeSelect, Button, Descriptions, Card, Typography } from "antd";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import Upload1 from "@components/Upload";
import { normalizeFile } from "src/utility";

const JESCreate: React.FC = () => {
  const { RangePicker } = DatePicker;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  const { Title, Paragraph, Text, Link } = Typography;
  
  return (
    <>
    <Typography>
    <Title level={2}>Add JES</Title>
    </Typography>
    <Card>
      <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
          <Form.Item label="Number" 
                     name="no"  
                     rules={[{ required: true, message: 'Please input number!' }]}
                     normalize={normalizeFile}>
              <Input/>
          </Form.Item>

          <Form.Item
              label="Major Step (What)"
              name="major_step"
              rules={[{ required: true, message: 'Please input!' }]}
              normalize={normalizeFile}
          >
              <Input.TextArea/>
          </Form.Item>

          <Form.Item
              label="Key Point (How)"
              name="key_point"
              rules={[{ required: true, message: 'Please input!' }]}
              normalize={normalizeFile}
          >
              <Input.TextArea />
          </Form.Item>

          <Form.Item
              label="Reason (Why)"
              name="reason"
              rules={[{ required: true, message: 'Please input!' }]}
              normalize={normalizeFile}
          >
              <Input.TextArea />
          </Form.Item>

          
          <Form.Item label="Upload Image"
                     name="image" 
                     normalize={normalizeFile}
                     rules={[{ required: true, message: 'Please input!' }]}>
          <Descriptions.Item>
            <Upload1/>
            </Descriptions.Item>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }} normalize={normalizeFile}>
              <Button type="primary" htmlType="submit">
                  Submit
              </Button>
          </Form.Item>
      </Form>
      </Card>
      </>
  );
};

export default JESCreate;

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
        destination: `${redirectTo}?to=${encodeURIComponent("/JES")}`,
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
