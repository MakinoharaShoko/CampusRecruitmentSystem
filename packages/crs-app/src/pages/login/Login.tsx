import { Button, Form, Input, Menu, MenuProps } from 'antd';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseFormData } from '@/utils/parseFormData';

export default function Login() {
  useEffect(() => {
    axios.get('/api/v1/user/me').then((resp) => {
      const data = resp.data;
      if (data.code === 0) {
        window.location.pathname = '/me';
      }
    });
  }, []);

  const items: MenuProps['items'] = [
    {
      label: '个人登录',
      key: 'person',
      icon: <UserOutlined />,
    },
    {
      label: '企业登录',
      key: 'company',
      icon: <TeamOutlined />,
    },
  ];

  const [current, setCurrent] = useState('person');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const onFinish = (values: any) => {
    userLogin(values);
  };

  function userLogin(values: any) {
    const formData = parseFormData(values);
    axios.post('/api/v1/user/login', formData).then((resp) => {
      console.log(resp.data);
      if (resp.data.code === 0) {
        window.location.pathname = 'me';
      }
    });
  }

  const onFinishCompany = (values: any) => {
    companyLogin(values);
  };

  function companyLogin(values: any) {
    const formData = parseFormData(values);
    axios.post('/api/v1/company/login', formData).then((resp) => {
      console.log(resp.data);
      if (resp.data.code === 0) {
        window.location.pathname = 'company';
      }
    });
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const userLoginForm = (
    <div style={{ padding: '2em 1em 2em 1em' }}>
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
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!', min: 8, max: 40 }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  const companyLoginForm = (
    <div style={{ padding: '2em 1em 2em 1em' }}>
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
        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <div>
        {current === 'person' && userLoginForm}
        {current === 'company' && companyLoginForm}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => {
            window.location.pathname = '/userRegister';
          }}
        >
          注册新账号
        </Button>
      </div>
    </div>
  );
}
