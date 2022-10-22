import { useValue } from '@/hooks/useValue';
import { useEffect } from 'react';
import axios from 'axios';
import { Button, DatePicker, Descriptions, Form, Input, PageHeader } from 'antd';
import styles from './me.module.scss';
import { parseFormData } from '@/utils/parseFormData';
import moment from 'moment';

/**
 * 普通用户信息
 */
interface IUserInfo {
  id: number;
  user_name: string;
  nickname: string;
  status: string;
  avatar: string;
  created_at: number;
}

interface IUserOpenInfo {
  institution: string;
  background: string;
  graduation_at: number;
}

export default function Me() {
  const myInfo = useValue<IUserInfo | null>(null);
  const myOpenInfo = useValue<IUserOpenInfo | null>(null);
  const isEditting = useValue(false);
  useEffect(() => {
    axios.get('/api/v1/user/me').then((resp) => {
      const data = resp.data;
      const info = data.data as IUserInfo;
      console.log(info);
      if (data.code === 401) {
        window.location.pathname = '/login';
      }
      if (data.code === 0) {
        myInfo.set(info);
        axios.get(`/api/v1/interviewee/me?interviewee_id=${info.id}`).then((resp2) => {
          console.log(resp2.data.data);
          myOpenInfo.set(resp2.data.data);
        });
      }
    });
  }, []);

  function exit() {
    axios.delete(`/api/v1/user/logout`).then(() => {
      window.location.pathname = 'login';
    });
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
    const postValue = { ...values, id: myInfo.value?.id ?? 0, graduation_at: values.graduation_at.year() };
    console.log(postValue);
    editOpenInfo(postValue);
  };

  function editOpenInfo(values: any) {
    axios.post('/api/v1/interviewee/setme', values).then((resp) => {
      console.log(resp.data);
      window.location.reload();
    });
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const editInfoForm = (
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
        <Form.Item label="机构" name="institution" rules={[{ required: true, message: '请输入机构' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="背景" name="background" rules={[{ required: true, message: '请输入背景' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="毕业年份" name="graduation_at" required={true}>
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" htmlType="submit">
            确认修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div>
      <PageHeader
        extra={[
          <Button
            onClick={() => {
              isEditting.set(!isEditting.value);
            }}
            key="edit"
            type="primary"
          >
            {isEditting.value ? '退出编辑' : '编辑'}
          </Button>,
          <Button key="exit" onClick={exit}>
            退出登录
          </Button>,
        ]}
        className={styles.site_page_header}
        title="我的信息"
        subTitle="学生用户"
      >
        {isEditting.value && editInfoForm}
        {!isEditting.value && (
          <Descriptions bordered>
            <Descriptions.Item label="用户名">{myInfo.value?.user_name ?? ''}</Descriptions.Item>
            <Descriptions.Item label="昵称">{myInfo.value?.nickname ?? ''}</Descriptions.Item>
            <Descriptions.Item label="状态">
              {myInfo.value?.status === 'active' ? '在看机会' : '暂不求职'}
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {new Date(myInfo.value?.created_at as number).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="机构">{myOpenInfo.value?.institution ?? ''}</Descriptions.Item>
            <Descriptions.Item label="背景">{myOpenInfo.value?.background ?? ''}</Descriptions.Item>
            <Descriptions.Item label="毕业时间">{myOpenInfo.value?.graduation_at ?? 0}</Descriptions.Item>
          </Descriptions>
        )}
      </PageHeader>
    </div>
  );
}
