import * as React from 'react';
import {
  Button, Form, Input, Space,
} from 'antd';
import { Link } from 'react-router-dom';
import { AssetItem } from '../../../../api/assetApi';
import { assetListPath } from '../../../navigation';

interface AssetFromProps {
  data?: AssetItem;
  onSubmit: (params: AssetItem) => Promise<void> | void,
  submitButtonText?: string;
  title: string,
}

export const AssetForm: React.FC<AssetFromProps> = ({
  data, onSubmit, submitButtonText, title,
}: AssetFromProps) => {
  return (
    <Form
      autoComplete="off"
      initialValues={data}
      labelCol={{ span: 8 }}
      onFinish={onSubmit}
      name="assetForm"
      wrapperCol={{ span: 16 }}
    >
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <h1>{title}</h1>
      </Form.Item>

      <Form.Item
        hidden
        label="Id"
        name="id"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input asset name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space size="middle">
          <Link to={assetListPath} component={Button}>Cancel</Link>

          <Button type="primary" htmlType="submit">
            {submitButtonText || 'Submit'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

AssetForm.defaultProps = {
  data: undefined,
  submitButtonText: undefined,
};
