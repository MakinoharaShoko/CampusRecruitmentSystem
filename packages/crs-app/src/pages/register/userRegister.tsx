import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu, MenuProps, message } from 'antd';
import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import styles from './register.module.scss';
import axios from 'axios';
import { parseFormData } from '@/utils/parseFormData';

export default function UserRegister() {
  const items: MenuProps['items'] = [
    {
      label: '个人注册',
      key: 'person',
      icon: <UserOutlined />,
    },
    {
      label: '企业注册',
      key: 'company',
      icon: <TeamOutlined />,
    },
  ];

  const [current, setCurrent] = useState('person');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    registerUser(values);
  };

  function registerUser(values: any) {
    const formData = parseFormData(values);
    axios.post('/api/v1/user/register', formData).then((resp) => {});
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishCompany = (values: any) => {
    console.log('Success:', values);
    registerCompany(values);
  };

  function registerCompany(values: any) {
    const formData = parseFormData(values);
    axios.post('/api/v1/company/register', formData).then((resp) => {
      const returnData = resp.data;
      console.log(returnData);
    });
  }

  const personRegister = (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="user_name"
          rules={[{ required: true, message: '请输入用户名', min: 5, max: 30 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="昵称" name="nickname" rules={[{ required: true, message: '请输入昵称', min: 2, max: 30 }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!', min: 8, max: 40 }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="密码确认"
          name="password_confirm"
          rules={[{ required: true, message: 'Please input your password!', min: 8, max: 40 }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
  const companyRegister = (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinishCompany}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="企业名"
          name="company_name"
          rules={[{ required: true, message: '请输入企业名', min: 1, max: 30 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!', min: 8, max: 40 }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="密码确认"
          name="password_confirm"
          rules={[{ required: true, message: 'Please input your password!', min: 8, max: 40 }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <div className={styles.formArea}>
        {current === 'person' && personRegister}
        {current === 'company' && companyRegister}
      </div>
    </div>
  );
}
