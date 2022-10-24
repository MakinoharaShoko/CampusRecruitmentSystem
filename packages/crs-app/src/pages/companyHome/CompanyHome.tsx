import styles from './companyHome.module.scss';
import { useValue } from '@/hooks/useValue';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Descriptions, Drawer, Form, Input, PageHeader } from 'antd';
const { TextArea } = Input;

export interface ICompanyInfo {
  id: number;
  company_name: string;
  info: string;
}

export interface IPositionInfo {
  id: number;
  position_name: string;
  company_id: string;
  jd: string;
  created_at: number;
}

export default function CompanyHome() {
  const companyInfo = useValue<ICompanyInfo | null>(null);
  const allPos = useValue<IPositionInfo[]>([]);
  useEffect(() => {
    axios.get('/api/v1/company/AllInfo').then((resp) => {
      const data = resp.data;
      const info = data.data as ICompanyInfo;
      if (data.code === 401) {
        window.location.pathname = '/login';
      }
      console.log(info);
      companyInfo.set(info);
    });
    axios.get('/api/v1/position/get_all_position').then((resp) => {
      const data = resp.data;
      const info = data.data as IPositionInfo[];
      console.log(info);
      if (data.code === 401) {
        window.location.pathname = '/login';
      }
      allPos.set(info);
    });
  }, []);

  const filtedPositionInfo = allPos.value?.filter((pos) => {
    return pos.company_id.toString() === (companyInfo.value?.id ?? 0).toString();
  });

  const JDs = filtedPositionInfo.map((pos) => {
    return (
      <div
        key={pos.id}
        style={{
          margin: '1em 1em 1em 1em',
          padding: '0.5em 0.5em 0.5em 0.5em',
          boxShadow: '3px 3px 10px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ fontSize: 'large', fontWeight: 'bold' }}>职位信息</div>
        <div style={{ fontWeight: 'bold' }}>{pos.position_name}</div>
        <div>{pos.jd}</div>
      </div>
    );
  });

  function exit() {
    axios.delete(`/api/v1/company/logout`).then(() => {
      window.location.pathname = 'login';
    });
  }

  /**
   * 发布职位
   */
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishCompanyAddPos = (values: any) => {
    addNewPos(values);
  };

  function addNewPos(values: any) {
    const formValue = { ...values, company_id: companyInfo.value?.id ?? 0 };
    console.log(formValue);
    axios.post('/api/v1/position/new_position', formValue).then((resp) => {
      const returnData = resp.data;
      console.log(returnData);
      window.location.reload();
    });
  }

  const addNewPosition = (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinishCompanyAddPos}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="职位名称"
          name="position_name"
          rules={[{ required: true, message: '请输入职位名称', min: 1, max: 30 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="职位详情" name="jd" rules={[{ required: true, message: '请输入职位介绍', min: 1 }]}>
          <TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" htmlType="submit">
            发布新职位
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <PageHeader title="我的信息" subTitle="企业用户" extra={<Button onClick={exit}>退出登录</Button>}>
        <div style={{ fontSize: 'xx-large' }}>{companyInfo.value?.company_name ?? ''}</div>
        <div>
          <Button onClick={showDrawer}>添加新职位</Button>
          <Button
            onClick={() => {
              window.location.pathname = 'companyAllProcess';
            }}
          >
            管理流程
          </Button>
        </div>
      </PageHeader>
      <Drawer title="发布新职位" placement="bottom" open={open} onClose={onClose}>
        {addNewPosition}
      </Drawer>
      <div>{JDs}</div>
    </div>
  );
}
